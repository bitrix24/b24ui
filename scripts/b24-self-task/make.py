#!/usr/bin/env python3
"""
Bitrix24 Self Task Automation Script

This script automates task processing in Bitrix24:
1. Fetches task details by ID
2. Creates a git branch fix/tsk-{ID}
3. Creates a checklist with two items ([AI-agent] Execute, [You] Check)
4. Extracts task description
5. Runs Claude AI in background to process the task
6. Saves result in task field 'Result' (wrapped in backticks)
7. Commits changes
8. Pushes to remote
9. Marks checklist item '[AI-agent] Execute' as completed

python scripts/b24-self-task/make.py <task_id>
"""

import os
import sys
import json
import subprocess
import time
import textwrap
from datetime import datetime
from dotenv import load_dotenv
from urllib.parse import urlparse

# Load environment variables from .env file
load_dotenv()

try:
    from b24pysdk import BitrixWebhook, Client
except ImportError:
    print("Error: b24pysdk not installed. Install with: pip install b24pysdk")
    sys.exit(1)


class Bitrix24TaskAutomation:
    def __init__(self, task_id):
        self.task_id = int(task_id)
        self.webhook_url = os.getenv('B24_WEBHOOK')

        if not self.webhook_url or self.webhook_url == 'your_bitrix24_webhook_here':
            print("Error: B24_WEBHOOK not set in .env file")
            print("Please add your Bitrix24 webhook to the .env file")
            sys.exit(1)

        parsed_url = urlparse(self.webhook_url)
        domain = parsed_url.netloc
        path_parts = parsed_url.path.strip('/').split('/')
        webhook_token = "/".join(path_parts[path_parts.index('rest') + 1:])

        bitrix_token = BitrixWebhook(domain=domain, webhook_token=webhook_token)

        self.bx24 = Client(bitrix_token, prefer_version=3)
        self.branch_name = f"fix/tsk-{task_id}"
        self.task_data = None
        self.claude_output = None

    def run(self):
        """[AI-agent] Execute the complete automation workflow"""
        print(f"Starting automation for task ID: {self.task_id}")

        try:
            # Step 1: Get task details
            self.get_task()

            # Step 2: Create git branch
            self.create_git_branch()

            # Step 3: Create checklist
            self.create_checklist()

            # Step 4: Extract task description
            description = self.extract_description()

            # Step 5: Run Claude AI
            self.run_claude(description)

            # Step 6: Save result in task
            self.save_result()

            # Step 7: Commit changes
            self.commit_changes()

            # Step 8: Push to remote
            self.push_changes()

            # Step 9: Mark checklist item as completed
            self.mark_checklist_complete()

            print(f"\n✅ Automation completed successfully for task {self.task_id}")

        except Exception as e:
            print(f"\n❌ Error during automation: {e}")
            self.save_problem(e)
            sys.exit(1)

    def get_task(self):
        """Fetch task details from Bitrix24"""
        print(f"Fetching task {self.task_id} from Bitrix24...")

        bitrix_response = self.bx24.tasks.task.get(self.task_id).response
        self.task_data = bitrix_response.result.get('item')
        print(f"Task found: {self.task_data.get('title', 'No title')}")
        return

    def create_git_branch(self):
        """Create a new git branch for the task"""
        print(f"Creating git branch: {self.branch_name}")

        # Check if we're in a git repository
        try:
            subprocess.run(['git', 'status'], check=True, capture_output=True)
        except subprocess.CalledProcessError:
            raise Exception("Not a git repository or git not installed")

        # Check if branch already exists
        result = subprocess.run(
            ['git', 'branch', '--list', self.branch_name],
            capture_output=True,
            text=True
        )

        if result.stdout.strip():
            print(f"Branch {self.branch_name} already exists, checking out...")
            subprocess.run(['git', 'checkout', self.branch_name], check=True)
        else:
            # Create and checkout new branch
            subprocess.run(['git', 'checkout', '-b', self.branch_name], check=True)
            print(f"Created and switched to branch {self.branch_name}")

    def create_checklist(self):
        """Create checklist with two items: [AI-agent] Execute and [You] Check"""
        print("Creating checklist items...")

        checklist_items = ['[AI-agent] Execute', '[You] Check']

        # First, get checklist items
        checklistExist_items = self.bx24.task.checklistitem.getlist(self.task_id).response.result

        existing_titles = {item['TITLE'] for item in checklistExist_items}
        checklist_items = [item for item in checklist_items if item not in existing_titles]

        for item_title in checklist_items:
            try:
                bitrix_response = self.bx24.task.checklistitem.add(
                  self.task_id,
                  {
                    'TITLE': item_title,
                    'IS_COMPLETE': 'N'
                  }
                ).response
                print(f"Checklist item '{item_title}' created")

            except Exception as e:
                print(f"Warning: Failed to create checklist item '{item_title}': {e}")

    def extract_description(self):
        """Extract task description from task data"""
        print("Extracting task description...")

        # Try different possible description fields
        description_fields = ['description']

        for field in description_fields:
            if field in self.task_data and self.task_data[field]:
                description = self.task_data[field]
                print(f"Found description in field '{field}'")
                return description

        # If no description found, use title
        title = self.task_data.get('title', self.task_data.get('TITLE', 'No title'))
        print(f"No description found, using title: {title}")
        return title

    def run_claude(self, description):
        """Run Claude AI with task description"""
        print("Running Claude AI...")

        # Prepare the prompt for Claude
        prompt = textwrap.dedent(f"""\
        Your task:

        {description}

        Notes:
        - Analyze the problem and propose a solution. If the problem requires coding, write it.
        - Provide a detailed answer with justification.
        - Write your report in the language of the task.
        - Write comments in the code in English.

        **To write a report, use FORMATTING RULES (CRITICAL):**
        - ABSOLUTELY NO MARKDOWN HEADINGS: Never use #, ##, ###, ####, #####, or ######
        - NO underline-style headings with === or ---
        - Use [b]bold text[/b] for emphasis and section labels instead
        - Examples:
        * Instead of "## Usage", write "[b]Usage:[/b]" or just "Here's how to use it:"
        * Instead of "# Complete Guide", write "[b]Complete Guide[/b]" or start directly with content
        - Start all responses with content, never with a heading
        - Use [code] // some code [/code] to show pieces of code
        """).strip()

        try:
            # Run Claude in background
            cmd = [
                'claude',
                '-p', prompt,
                '--output-format', 'text',
                '--allowedTools',
                '--no-user-prompt',
                '--dangerously-skip-permissions'
            ]

            print(f"Executing...")

            # Run with timeout (e.g., 12 hours)
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=43200  # 12 hours
            )

            if result.returncode == 0:
                self.claude_output = result.stdout
                print("Claude execution completed successfully")
                print(f"Output length: {len(self.claude_output)} characters")
            else:
                error_msg = result.stderr or "Unknown error"
                raise Exception(f"Claude failed: {error_msg}")

        except subprocess.TimeoutExpired:
            raise Exception("Claude execution timed out after 5 minutes")
        except FileNotFoundError:
            raise Exception("Claude CLI not found. Make sure Claude Code is installed and in PATH")
        except Exception as e:
            raise Exception(f"Failed to run Claude: {e}")

    def save_result(self):
        """Save Claude output to task result field"""
        if not self.claude_output:
          self.claude_output = "No output to save"

        print("Saving result to task...")

        # Format result with backticks
        formatted_result = f"🤖 [b]Mission accomplished![/b]\n\nThe process is over, and you can find all the results in this report.\n\n{self.claude_output}\n"

        try:
          bitrix_response = self.bx24.tasks.task.chat.message.send({
            "taskId": self.task_id,
            "text": formatted_result
          }).response
          print("Result saved successfully")
          return

          print("Warning: Could not save result using any available method")

        except Exception as e:
          print(f"❌ Warning: Failed to save result: {e}")

    def save_problem(self, description):
        """Save description to task chat"""
        print("Saving problem to task...")

        formatted_result = f"🤨 [b]We hit a problem in our process.[/b]\n\nOnly you have the key to solve it.\n\n[code]\n{description}\n[/code]"

        try:
          bitrix_response = self.bx24.tasks.task.chat.message.send({
            "taskId": self.task_id,
            "text": formatted_result
          }).response
          print("Problem saved successfully")
          return

        except Exception as e:
          print(f"❌ Warning: Failed to save problem: {e}")

    def commit_changes(self):
        """Commit any changes in the repository"""
        print("Committing changes...")

        # Check if there are any changes to commit
        status_result = subprocess.run(
            ['git', 'status', '--porcelain'],
            capture_output=True,
            text=True
        )

        if not status_result.stdout.strip():
            print("No changes to commit")
            return

        # Add all changes
        subprocess.run(['git', 'add', '-A'], check=True)

        # Create commit message
        commit_message = f"fix(task-{self.task_id}): automated fix from Bitrix24 task\n\nTask ID: {self.task_id}\nAutomated by b24-self-task"

        # Commit
        subprocess.run(['git', 'commit', '-m', commit_message], check=True)
        print(f"Committed changes with message: {commit_message[:50]}...")

    def push_changes(self):
        """Push changes to remote repository"""
        print("Pushing to remote...")

        try:
            # Try to push to remote (assumes remote is 'origin')
            result = subprocess.run(
                ['git', 'push', '-u', 'origin', self.branch_name],
                capture_output=True,
                text=True
            )

            if result.returncode == 0:
                print(f"Pushed branch {self.branch_name} to remote")
            else:
                print(f"Warning: Failed to push changes: {result.stderr}")

        except Exception as e:
            print(f"Warning: Failed to push changes: {e}")

    def mark_checklist_complete(self):
        """Mark '[AI-agent] Execute' checklist item as completed"""
        print("Marking '[AI-agent] Execute' checklist item as complete...")

        try:
            # First, get checklist items
            bitrix_response = self.bx24.task.checklistitem.getlist(self.task_id).response

            checklist_items = bitrix_response.result

            # Find '[AI-agent] Execute' item
            for item in checklist_items:
                if item.get('TITLE') == '[AI-agent] Execute':
                    item_id = int(item.get('ID'))

                    # Mark as complete
                    bitrix_response = self.bx24.task.checklistitem.update(
                      self.task_id,
                      item_id,
                      {
                        "IS_COMPLETE": 'Y'
                      }
                    ).response

                    print("Checklist item '[AI-agent] Execute' marked as complete")
                    return

            print("Warning: Checklist item '[AI-agent] Execute' not found")

        except Exception as e:
            print(f"Warning: Failed to mark checklist item as complete: {e}")

def main():
    """Main entry point"""
    if len(sys.argv) != 2:
        print("Usage: python b24-self-task.py <task_id>")
        print("Example: python b24-self-task.py 12345")
        sys.exit(1)

    task_id = sys.argv[1]

    # Validate task ID is numeric
    if not task_id.isdigit():
        print("Error: Task ID must be a number")
        sys.exit(1)

    # Run automation
    automation = Bitrix24TaskAutomation(task_id)
    automation.run()


if __name__ == '__main__':
    main()
