#!/usr/bin/env python3
"""
Bitrix24 Self Task Automation Script

This script automates task processing in Bitrix24:
1. Fetches task details by ID
2. Creates a git branch fix/tsk-{ID}
3. Saves branch name in task custom field UF_AUTO_539197372335
4. Creates a checklist with two items (Выполнить, Проверить)
5. Extracts task description
6. Runs Claude AI in background to process the task
7. Saves result in task field 'Результат' (wrapped in backticks)
8. Commits changes
9. Pushes to remote
10. Marks checklist item 'Выполнить' as completed

Usage: python b24-self-task.py <task_id>
"""

import os
import sys
import json
import subprocess
import time
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

try:
    from b24pysdk import Bitrix24
except ImportError:
    print("Error: b24pysdk not installed. Install with: pip install b24pysdk")
    sys.exit(1)


class Bitrix24TaskAutomation:
    def __init__(self, task_id):
        self.task_id = task_id
        self.webhook_url = os.getenv('B24_WEBHOOK')

        if not self.webhook_url or self.webhook_url == 'your_bitrix24_webhook_here':
            print("Error: B24_WEBHOOK not set in .env file")
            print("Please add your Bitrix24 webhook to the .env file")
            sys.exit(1)

        self.bx24 = Bitrix24(self.webhook_url)
        self.branch_name = f"fix/tsk-{task_id}"
        self.task_data = None
        self.claude_output = None

    def run(self):
        """Execute the complete automation workflow"""
        print(f"Starting automation for task ID: {self.task_id}")

        try:
            # Step 1: Get task details
            self.get_task()

            # Step 2: Create git branch
            self.create_git_branch()

            # Step 3: Save branch name in task field
            self.save_branch_name()

            # Step 4: Create checklist
            self.create_checklist()

            # Step 5: Extract task description
            description = self.extract_description()

            # Step 6: Run Claude AI
            self.run_claude(description)

            # Step 7: Save result in task
            self.save_result()

            # Step 8: Commit changes
            self.commit_changes()

            # Step 9: Push to remote
            self.push_changes()

            # Step 10: Mark checklist item as completed
            self.mark_checklist_complete()

            print(f"\n✅ Automation completed successfully for task {self.task_id}")

        except Exception as e:
            print(f"\n❌ Error during automation: {e}")
            sys.exit(1)

    def get_task(self):
        """Fetch task details from Bitrix24"""
        print(f"Fetching task {self.task_id} from Bitrix24...")

        # Try different methods to get task data
        methods = [
            ('tasks.task.get', {'taskId': self.task_id}),
            ('task.item.get', {'id': self.task_id}),
        ]

        for method, params in methods:
            try:
                result = self.bx24.call(method, params)
                if result and 'result' in result:
                    self.task_data = result['result']
                    print(f"Task found via {method}: {self.task_data.get('title', 'No title')}")
                    return
            except Exception as e:
                print(f"Method {method} failed: {e}")
                continue

        raise Exception(f"Task {self.task_id} not found or inaccessible")

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

    def save_branch_name(self):
        """Save branch name in task custom field UF_AUTO_539197372335"""
        print(f"Saving branch name to task field UF_AUTO_539197372335...")

        try:
            # Update task with custom field
            result = self.bx24.call('tasks.task.update', {
                'taskId': self.task_id,
                'fields': {
                    'UF_AUTO_539197372335': self.branch_name
                }
            })

            if result and 'result' in result:
                print("Branch name saved successfully")
            else:
                print(f"Warning: Could not save branch name. Response: {result}")

        except Exception as e:
            print(f"Warning: Failed to save branch name: {e}")

    def create_checklist(self):
        """Create checklist with two items: Выполнить and Проверить"""
        print("Creating checklist items...")

        checklist_items = ['Выполнить', 'Проверить']

        for item_title in checklist_items:
            try:
                result = self.bx24.call('task.checklistitem.add', {
                    'taskId': self.task_id,
                    'fields': {
                        'TITLE': item_title,
                        'IS_COMPLETE': 'N'
                    }
                })

                if result and 'result' in result:
                    print(f"Checklist item '{item_title}' created")
                else:
                    print(f"Warning: Could not create checklist item '{item_title}'")

            except Exception as e:
                print(f"Warning: Failed to create checklist item '{item_title}': {e}")

    def extract_description(self):
        """Extract task description from task data"""
        print("Extracting task description...")

        # Try different possible description fields
        description_fields = ['description', 'DESCRIPTION', 'detailText', 'DETAIL_TEXT']

        for field in description_fields:
            if field in self.task_data and self.task_data[field]:
                description = self.task_data[field]
                print(f"Found description in field '{field}'")
                return description

        # If no description found, use title or default
        title = self.task_data.get('title', self.task_data.get('TITLE', 'No title'))
        print(f"No description found, using title: {title}")
        return title

    def run_claude(self, description):
        """Run Claude AI with task description"""
        print("Running Claude AI...")

        # Prepare the prompt for Claude
        prompt = f"""
        Задача из Битрикс24:

        {description}

        Проанализируй задачу и предложи решение. Если задача требует написания кода - напиши код.
        Предоставь подробный ответ с обоснованием.
        """

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

            print(f"Executing: {' '.join(cmd[:3])}...")

            # Run with timeout (e.g., 5 minutes)
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=300  # 5 minutes
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
            print("No Claude output to save")
            return

        print("Saving result to task...")

        # Format result with backticks
        formatted_result = f"```\n{self.claude_output}\n```"

        try:
            # Try different methods to save result
            methods = [
                ('tasks.task.update', {
                    'taskId': self.task_id,
                    'fields': {
                        'RESULT': formatted_result
                    }
                }),
                ('task.item.update', {
                    'id': self.task_id,
                    'fields': {
                        'RESULT': formatted_result
                    }
                }),
            ]

            for method, params in methods:
                try:
                    result = self.bx24.call(method, params)
                    if result and 'result' in result:
                        print("Result saved successfully")
                        return
                except:
                    continue

            print("Warning: Could not save result using any available method")

        except Exception as e:
            print(f"Warning: Failed to save result: {e}")

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
        commit_message = f"fix(task-{self.task_id}): automated fix from Bitrix24 task\n\nTask ID: {self.task_id}\nAutomated by b24-self-task.py"

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
        """Mark 'Выполнить' checklist item as completed"""
        print("Marking 'Выполнить' checklist item as complete...")

        try:
            # First, get checklist items
            result = self.bx24.call('task.checklistitem.getlist', {
                'taskId': self.task_id
            })

            if result and 'result' in result:
                checklist_items = result['result']

                # Find 'Выполнить' item
                for item in checklist_items:
                    if item.get('TITLE') == 'Выполнить':
                        item_id = item.get('ID')

                        # Mark as complete
                        update_result = self.bx24.call('task.checklistitem.update', {
                            'id': item_id,
                            'fields': {
                                'IS_COMPLETE': 'Y'
                            }
                        })

                        if update_result and 'result' in update_result:
                            print("Checklist item 'Выполнить' marked as complete")
                            return

                print("Warning: Checklist item 'Выполнить' not found")
            else:
                print("Warning: Could not retrieve checklist items")

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