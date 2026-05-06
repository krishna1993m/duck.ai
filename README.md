# Duck.ai Assistant - VS Code Extension

A powerful AI-assisted code completion and generation extension for Visual Studio Code powered by Duck.ai (Claude).

## Features

- **Inline Code Completion** - Get intelligent code suggestions as you type, powered by Duck.ai's Claude model
- **Code Generation** - Generate code snippets based on your requirements with the `Duck.ai: Generate Code` command
- **Code Debugging** - Debug and analyze selected code with contextual suggestions
- **Multi-language Support** - Works across all programming languages supported by VS Code
- **Fast & Responsive** - Optimized for quick responses with debouncing to avoid API spam

## Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "Duck.ai Assistant"
4. Click Install

Alternatively, install from the [VS Code Marketplace](https://marketplace.visualstudio.com)

## Usage

### Code Completion
The extension automatically provides inline code suggestions as you type. Simply start typing and press `Tab` to accept suggestions.

### Generate Code
1. Use the command palette (Ctrl+Shift+P / Cmd+Shift+P)
2. Type "Duck.ai: Generate Code"
3. Enter your requirements
4. The generated code will be inserted at your cursor

### Debug Code
1. Select code in your editor
2. Right-click and choose "Duck.ai: Debug Selected Code"
3. Get debugging suggestions and improvements

## Requirements

- VS Code 1.80.0 or later
- Internet connection for AI requests

## Settings

No additional configuration needed! The extension works out of the box.

## Performance

- Inline completions are debounced (500ms) to prevent excessive API calls
- Respects VS Code's cancellation tokens for responsive editing
- Lightweight with minimal overhead

## Privacy

This extension uses Duck.ai's API to provide suggestions. Your code snippets are sent to Duck.ai's servers for processing.

## Troubleshooting

- **No suggestions appearing?** Check your internet connection and VS Code console (Ctrl+Shift+`) for errors
- **Rate limiting?** The extension includes built-in debouncing to prevent API rate limits
- **Performance issues?** Try disabling the extension and re-enabling it

## Support

For issues, feature requests, or feedback, please visit the [GitHub repository](https://github.com/yourusername/duck-ai-vscode).

## License

MIT License - see LICENSE file for details

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

---

**Tip:** Make the most of Duck.ai Assistant by using it alongside your regular coding workflow. Great for learning, rapid prototyping, and code refactoring!
