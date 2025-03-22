# Examples

This document provides practical examples of using AI Agent Tools in various scenarios.

## Basic Examples

### Text Generation

```typescript
import { AIAgent } from 'ai-agent-tools';

const agent = new AIAgent({
  name: 'TextGenerator',
  capabilities: ['text-generation'],
  model: 'gpt-4'
});

await agent.initialize();

const response = await agent.process({
  task: 'Generate text',
  input: 'Write a short story about a robot learning to paint'
});

console.log(response.result);
```

### Code Analysis

```typescript
import { AIAgent } from 'ai-agent-tools';

const agent = new AIAgent({
  name: 'CodeAnalyzer',
  capabilities: ['code-analysis'],
  model: 'gpt-4'
});

await agent.initialize();

const code = `
function calculateSum(numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}
`;

const response = await agent.process({
  task: 'Analyze code',
  input: code,
  options: {
    timeout: 5000
  }
});

console.log(response.result);
```

### Documentation Generation

```typescript
import { AIAgent } from 'ai-agent-tools';

const agent = new AIAgent({
  name: 'DocGenerator',
  capabilities: ['documentation'],
  model: 'gpt-4'
});

await agent.initialize();

const code = `
class UserManager {
  constructor() {
    this.users = new Map();
  }

  addUser(id, name) {
    this.users.set(id, { name, createdAt: new Date() });
  }

  getUser(id) {
    return this.users.get(id);
  }
}
`;

const response = await agent.process({
  task: 'Generate documentation',
  input: code
});

console.log(response.result);
```

## Advanced Examples

### Multi-Capability Agent

```typescript
import { AIAgent } from 'ai-agent-tools';

const agent = new AIAgent({
  name: 'MultiCapabilityAgent',
  capabilities: ['text-generation', 'code-analysis', 'documentation'],
  model: 'gpt-4',
  options: {
    temperature: 0.8,
    maxTokens: 2000
  }
});

await agent.initialize();

// Handle different types of tasks
const tasks = [
  {
    task: 'Generate text',
    input: 'Write a poem about artificial intelligence'
  },
  {
    task: 'Analyze code',
    input: 'function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }'
  },
  {
    task: 'Generate documentation',
    input: 'class Database { connect() { /* ... */ } query(sql) { /* ... */ } }'
  }
];

for (const task of tasks) {
  const response = await agent.process(task);
  console.log(`Task: ${task.task}`);
  console.log(response.result);
  console.log('---');
}
```

### Custom Capability Implementation

```typescript
import { AIAgent, Capability } from 'ai-agent-tools';

class TranslationCapability implements Capability {
  name = 'translation';
  
  async process(input: string): Promise<string> {
    // Implement translation logic here
    // This is a placeholder implementation
    return `Translated: ${input}`;
  }
}

class SentimentAnalysisCapability implements Capability {
  name = 'sentiment-analysis';
  
  async process(input: string): Promise<string> {
    // Implement sentiment analysis logic here
    // This is a placeholder implementation
    return 'Positive';
  }
}

const agent = new AIAgent({
  name: 'CustomCapabilitiesAgent',
  capabilities: [
    'text-generation',
    new TranslationCapability(),
    new SentimentAnalysisCapability()
  ],
  model: 'gpt-4'
});

await agent.initialize();

const response = await agent.process({
  task: 'Translate and analyze sentiment',
  input: 'I love programming!'
});

console.log(response.result);
```

### Event-Driven Processing

```typescript
import { AIAgent } from 'ai-agent-tools';

const agent = new AIAgent({
  name: 'EventAgent',
  capabilities: ['text-generation'],
  model: 'gpt-4'
});

// Set up event handlers
agent.on('start', () => {
  console.log('Processing started');
});

agent.on('complete', (output) => {
  console.log('Processing completed:', output);
});

agent.on('error', (error) => {
  console.error('Error occurred:', error);
});

await agent.initialize();

// Process multiple tasks with event tracking
const tasks = [
  'Write a haiku about coding',
  'Generate a short story',
  'Create a poem'
];

for (const task of tasks) {
  try {
    const response = await agent.process({
      task: 'Generate text',
      input: task
    });
    console.log(`Result for "${task}":`, response.result);
  } catch (error) {
    console.error(`Failed to process "${task}":`, error);
  }
}
```

### Error Handling and Retries

```typescript
import { AIAgent } from 'ai-agent-tools';

const agent = new AIAgent({
  name: 'ResilientAgent',
  capabilities: ['text-generation'],
  model: 'gpt-4',
  options: {
    retries: 3,
    timeout: 10000
  }
});

await agent.initialize();

async function processWithRetry(task: string, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await agent.process({
        task: 'Generate text',
        input: task,
        options: {
          timeout: 5000
        }
      });
      return response;
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      console.log(`Attempt ${attempt} failed, retrying...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}

try {
  const response = await processWithRetry('Write a complex story');
  console.log(response.result);
} catch (error) {
  console.error('All attempts failed:', error);
}
```

## Real-World Examples

### Code Review Assistant

```typescript
import { AIAgent } from 'ai-agent-tools';

const agent = new AIAgent({
  name: 'CodeReviewer',
  capabilities: ['code-analysis', 'documentation'],
  model: 'gpt-4'
});

await agent.initialize();

const code = `
function processUserData(userData) {
  const result = {};
  for (const key in userData) {
    if (userData.hasOwnProperty(key)) {
      result[key] = userData[key].toUpperCase();
    }
  }
  return result;
}
`;

const response = await agent.process({
  task: 'Review code',
  input: code,
  options: {
    priority: 1
  }
});

console.log('Code Review Results:');
console.log(response.result);
```

### Documentation Generator

```typescript
import { AIAgent } from 'ai-agent-tools';

const agent = new AIAgent({
  name: 'DocGenerator',
  capabilities: ['documentation'],
  model: 'gpt-4'
});

await agent.initialize();

const apiCode = `
interface UserAPI {
  getUser(id: string): Promise<User>;
  createUser(data: UserData): Promise<User>;
  updateUser(id: string, data: Partial<UserData>): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
`;

const response = await agent.process({
  task: 'Generate API documentation',
  input: apiCode,
  options: {
    timeout: 10000
  }
});

console.log('API Documentation:');
console.log(response.result);
```

### Content Generator

```typescript
import { AIAgent } from 'ai-agent-tools';

const agent = new AIAgent({
  name: 'ContentGenerator',
  capabilities: ['text-generation'],
  model: 'gpt-4',
  options: {
    temperature: 0.9
  }
});

await agent.initialize();

const topics = [
  'Artificial Intelligence',
  'Machine Learning',
  'Web Development'
];

for (const topic of topics) {
  const response = await agent.process({
    task: 'Generate blog post',
    input: `Write a blog post about ${topic}`,
    options: {
      maxTokens: 1000
    }
  });
  
  console.log(`\nBlog Post about ${topic}:`);
  console.log(response.result);
  console.log('---');
}
``` 