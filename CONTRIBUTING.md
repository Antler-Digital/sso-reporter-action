# Contributing to SEO Reporter Action

Thank you for considering contributing to SEO Reporter Action! This document provides guidelines and instructions for contributing.

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/Antler-Digital/sso-reporter-action.git
cd sso-reporter-action
```

2. Install dependencies:
```bash
npm install
```

3. Make your changes in the `src/` directory

4. Build the action:
```bash
npm run build
```

This will compile your changes into `dist/index.js` using ncc.

## Making Changes

### Code Style
- Use clear, descriptive variable names
- Add comments for complex logic
- Follow existing code patterns

### Testing Changes
1. Make changes in `src/index.js`
2. Run `npm run build` to compile
3. Test locally using the `.github/workflows/test-action.yml` workflow
4. Push your changes to a branch and test on GitHub Actions

### Commit Messages
- Use clear, descriptive commit messages
- Start with a verb in the present tense (e.g., "Add", "Fix", "Update")
- Keep the first line under 72 characters
- Add more details in the commit body if needed

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Build the action (`npm run build`)
5. Commit your changes (both `src/` and `dist/` files)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### PR Guidelines
- Describe what your PR does and why
- Include any relevant issue numbers
- Ensure the action still works after your changes
- Update documentation if needed

## Reporting Issues

When reporting issues, please include:
- A clear description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Workflow file snippet (if applicable)
- Relevant logs from the GitHub Actions run

## Questions?

Feel free to open an issue for questions or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the ISC License.
