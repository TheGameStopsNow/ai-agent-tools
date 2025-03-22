# Contributing to AI Agent Tools

Thank you for your interest in contributing to AI Agent Tools! This guide will help you get started.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read the full text in `CODE_OF_CONDUCT.md`.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Set up the development environment
4. Create a feature branch
5. Make your changes
6. Submit a pull request

## Detailed Steps

### 1. Fork the Repository

1. Go to [https://github.com/yourusername/ai-agent-tools](https://github.com/yourusername/ai-agent-tools)
2. Click the "Fork" button in the top right
3. This creates a copy of the repository in your GitHub account

### 2. Clone Your Fork

```bash
git clone https://github.com/yourusername/ai-agent-tools.git
cd ai-agent-tools
```

### 3. Set Up Development Environment

```bash
# Install dependencies
npm install
# or
yarn install

# Set up pre-commit hooks
npm run prepare
# or
yarn prepare
```

### 4. Create a Feature Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/your-bug-fix
```

### 5. Make Your Changes

1. Write your code
2. Add tests
3. Update documentation
4. Run tests and linting

```bash
# Run tests
npm test
# or
yarn test

# Run linting
npm run lint
# or
yarn lint

# Format code
npm run format
# or
yarn format
```

### 6. Submit a Pull Request

1. Push your changes:
```bash
git push origin feature/your-feature-name
```

2. Go to your fork on GitHub
3. Click "Compare & pull request"
4. Fill in the pull request template
5. Submit the pull request

## Pull Request Guidelines

### Before Submitting

1. Make sure your code follows our style guidelines
2. Add tests for new features
3. Update documentation
4. Run all tests and checks
5. Rebase your branch on the latest main branch

### Pull Request Template

```markdown
## Description
Brief description of your changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] All tests pass

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
```

## Code Review Process

1. Maintainers will review your pull request
2. They may request changes or improvements
3. Address all review comments
4. Once approved, your changes will be merged

## Coding Standards

### Python Style

We follow PEP 8 style guidelines. Use the following tools:

```bash
# Format code
npm run format
# or
yarn format

# Lint code
npm run lint
# or
yarn lint
```

### TypeScript Style

1. Use TypeScript for all new code
2. Follow existing code style
3. Use meaningful variable names
4. Add type annotations
5. Use async/await for asynchronous operations

Example:

```typescript
/**
 * Processes input using the specified capability
 * @param input - The input to process
 * @param capability - The capability to use
 * @returns Promise resolving to the processed output
 */
async function processInput(
  input: string,
  capability: string
): Promise<string> {
  try {
    // Implementation
    return processedOutput;
  } catch (error) {
    throw new ProcessingError('Failed to process input', { input });
  }
}
```

## Documentation

### Writing Documentation

1. Use JSDoc comments for all public APIs
2. Include examples in documentation
3. Keep documentation concise and clear
4. Update documentation when changing APIs

Example:

```typescript
/**
 * Configuration options for the AI Agent
 * @interface AgentConfig
 */
interface AgentConfig {
  /** Name of the agent */
  name: string;
  /** List of capabilities to enable */
  capabilities: (string | Capability)[];
  /** AI model to use */
  model: string;
  /** Optional configuration */
  options?: AgentOptions;
}
```

### Updating Documentation

1. Update relevant documentation files
2. Add examples for new features
3. Update API documentation
4. Keep documentation up to date with code changes

## Testing

### Writing Tests

1. Test file naming: `*.test.ts`
2. Use descriptive test names
3. Test both success and failure cases
4. Mock external dependencies

Example:

```typescript
import { AIAgent } from '../src/AIAgent';

describe('AIAgent', () => {
  let agent: AIAgent;

  beforeEach(() => {
    agent = new AIAgent({
      name: 'TestAgent',
      capabilities: ['text-generation'],
      model: 'gpt-4'
    });
  });

  it('should initialize successfully', async () => {
    await expect(agent.initialize()).resolves.not.toThrow();
  });

  it('should process input correctly', async () => {
    await agent.initialize();
    const response = await agent.process({
      task: 'Generate text',
      input: 'Test input'
    });
    expect(response.result).toBeDefined();
  });
});
```

### Running Tests

```bash
# Run all tests
npm test
# or
yarn test

# Run specific test file
npm test -- tests/unit/AIAgent.test.ts
# or
yarn test tests/unit/AIAgent.test.ts

# Run tests with coverage
npm run test:coverage
# or
yarn test:coverage
```

## Common Issues

### Code Style

If you get linting errors:

1. Run the formatter:
```bash
npm run format
# or
yarn format
```

2. Fix any remaining issues manually
3. Run the linter again to verify:
```bash
npm run lint
# or
yarn lint
```

### Documentation

If documentation is out of date:

1. Update relevant documentation files
2. Add examples for new features
3. Update API documentation
4. Run documentation build:
```bash
npm run docs
# or
yarn docs
```

### Testing

If tests fail:

1. Check test output for errors
2. Fix failing tests
3. Add missing tests
4. Run tests again:
```bash
npm test
# or
yarn test
```

## Getting Help

If you need help:

1. Check the documentation
2. Look at existing issues
3. Join our community chat
4. Contact maintainers

## Thank You

Thank you for contributing to AI Agent Tools! Your contributions help make this project better for everyone. 