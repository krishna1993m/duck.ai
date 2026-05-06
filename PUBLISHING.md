# Publishing Guide

## Prerequisites

1. **Create a Publisher Account**
   - Go to https://marketplace.visualstudio.com/manage
   - Sign in with a Microsoft account (create one if needed)
   - Click "Create Publisher" and choose a unique publisher name

2. **Install vsce (Visual Studio Code Extension CLI)**
   ```bash
   npm install -g vsce
   ```

3. **Prepare Your Extension**
   - Ensure all required files are present (README.md, LICENSE, etc.)
   - Update version number in package.json for new releases
   - Test the extension locally in VS Code

## Publishing Steps

### Step 1: Update package.json
Update the `publisher` field with your publisher name:
```json
"publisher": "your-publisher-name"
```

### Step 2: Create Personal Access Token
1. Go to https://dev.azure.com/ and sign in
2. Create a personal access token with "Marketplace (Publish)" scope
3. Keep this token secure

### Step 3: Create VSIX Package
```bash
vsce package
```
This creates a `.vsix` file ready for publishing.

### Step 4: Publish to Marketplace
```bash
vsce publish -p <your-personal-access-token>
```

Or publish the pre-built VSIX:
```bash
vsce publish --packagePath ./duck-ai-vscode-0.0.1.vsix -p <your-personal-access-token>
```

## Verification

After publishing:
1. Wait a few minutes for the extension to appear
2. Search for your extension on https://marketplace.visualstudio.com/
3. Verify the description, version, and metadata are correct

## Updating the Extension

To publish an update:
1. Increment version in package.json
2. Update CHANGELOG.md with changes
3. Commit changes to git
4. Run `vsce publish -p <token>`

## Troubleshooting

- **Missing files**: Ensure README.md, LICENSE, and icon.png exist
- **Icon issues**: Icon must be exactly 128x128px PNG
- **Publishing fails**: Verify your personal access token hasn't expired
- **Version exists**: Each version can only be published once; increment for new releases
