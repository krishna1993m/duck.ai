# Contributing to Duck.ai VS Code Extension

We welcome contributions! Here's how you can help:

## Local Development

1. **Clone and Install**
   ```bash
   git clone https://github.com/yourusername/duck-ai-vscode.git
   cd duck-ai-vscode
   npm install
   ```

2. **Build & Watch**
   ```bash
   npm run watch
   ```

3. **Test Locally**
   - Press `F5` in VS Code to open the extension in a new window
   - Test the features manually
   - Check the output channel for logs

4. **Run Tests**
   ```bash
   npm test
   ```

5. **Lint Code**
   ```bash
   npm run lint
   ```

## Making Changes

1. Create a branch for your feature: `git checkout -b feature/amazing-feature`
2. Make your changes
3. Run linting: `npm run lint`
4. Commit with clear messages: `git commit -m 'Add amazing feature'`
5. Push to your fork: `git push origin feature/amazing-feature`
6. Open a Pull Request

## Code Style

- Use TypeScript for all code
- Follow the existing code structure
- Add comments for complex logic
- Use meaningful variable names

## Reporting Issues

- Check existing issues first
- Provide steps to reproduce
- Include VS Code version and extension version
- Share relevant logs from the output channel

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
