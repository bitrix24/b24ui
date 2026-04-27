# Bitrix24 Self Task Automation Script

This script automates the processing of Bitrix24 tasks using Claude AI.

## Installation

1. Install Python dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r scripts/b24-self-task/requirements.txt
   ```

2. Install Claude Code CLI (if not already installed):
   - Follow instructions at [Claude Code documentation](https://claude.com/claude-code)

3. Configure environment variables:
   - Copy `.env.example` to `.env` in the project root
   - Add your Bitrix24 webhook:
     ```
     B24_WEBHOOK=https://yourdomain.bitrix24.com/rest/1/xxxx/
     ```

## Usage

```bash
python scripts/b24-self-task/make.py <task_id>
```

Example:
```bash
source venv/bin/activate
python scripts/b24-self-task/make.py 2026
```

## What the script does

1. **Fetches task details** from Bitrix24 by `ID`
2. **Creates a git branch** named `fix/tsk-{ID}`
4. **Creates a checklist** with two items: `[AI-agent] Execute` and `[You] Check`
5. **Extracts task description** from the task (if no description found, use title)
6. **Runs Claude AI** in background with the task description
7. **Saves result** in task chat
8. **Commits changes** in the git repository
9. **Pushes changes** to remote repository
10. **Marks checklist item** `[AI-agent] Execute` as completed

## Requirements

- Python 3.7+
- Git installed and configured
- Claude Code CLI installed and in PATH
- Bitrix24 webhook with permissions: `tasks`, `task`

## Troubleshooting

1. **"b24pysdk not installed"**:
   - Run `pip install b24pysdk`

2. **"Claude CLI not found"**:
   - Install Claude Code and ensure it's in your PATH
   - Test with `claude --version`

3. **"B24_WEBHOOK not set"**:
   - Check your `.env` file contains the correct webhook URL

4. **Git errors**:
   - Ensure you're in a git repository
   - Configure git user name and email if not set

5. **Bitrix24 API errors**:
   - Verify your webhook has necessary permissions
   - Check that task ID exists and is accessible

## Customization

You can modify the script to:
- Change the branch naming convention
- Use different checklist items
- Adjust Claude prompt
- Modify commit message format
- Add additional task fields

## Security Notes

- Keep your `.env` file secure and never commit it to git
- Ensure your Bitrix24 webhook has minimal necessary permissions
- Review Claude output before committing sensitive changes

## Credits

- [Python SDK](https://github.com/bitrix24/b24pysdk)
