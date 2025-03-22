# API Reference

This document provides detailed information about the AI Agent Tools API.

## Classes

### AIAgent

The main class for creating and managing AI agents.

```typescript
class AIAgent {
  constructor(config: AgentConfig);
  initialize(): Promise<void>;
  process(input: AgentInput): Promise<AgentOutput>;
  on(event: AgentEvent, handler: EventHandler): void;
  off(event: AgentEvent, handler: EventHandler): void;
}
```

#### Constructor

```typescript
interface AgentConfig {
  name: string;
  capabilities: (string | Capability)[];
  model: string;
  options?: AgentOptions;
}
```

#### Methods

##### `initialize()`

Initializes the agent and its capabilities.

```typescript
async initialize(): Promise<void>
```

##### `process(input)`

Processes input using the agent's capabilities.

```typescript
interface AgentInput {
  task: string;
  input: string;
  options?: ProcessOptions;
}

interface AgentOutput {
  result: string;
  metadata?: Record<string, any>;
}

async process(input: AgentInput): Promise<AgentOutput>
```

##### `on(event, handler)`

Registers an event handler.

```typescript
type AgentEvent = 'start' | 'complete' | 'error';
type EventHandler = (data?: any) => void;

on(event: AgentEvent, handler: EventHandler): void
```

##### `off(event, handler)`

Removes an event handler.

```typescript
off(event: AgentEvent, handler: EventHandler): void
```

## Interfaces

### Capability

Interface for implementing custom capabilities.

```typescript
interface Capability {
  name: string;
  process(input: string): Promise<string>;
}
```

### AgentOptions

Configuration options for the agent.

```typescript
interface AgentOptions {
  temperature?: number;
  maxTokens?: number;
  timeout?: number;
  retries?: number;
  debug?: boolean;
}
```

### ProcessOptions

Options for processing input.

```typescript
interface ProcessOptions {
  timeout?: number;
  retries?: number;
  priority?: number;
}
```

## Types

### AgentEvent

```typescript
type AgentEvent = 'start' | 'complete' | 'error';
```

### EventHandler

```typescript
type EventHandler = (data?: any) => void;
```

### AgentInput

```typescript
interface AgentInput {
  task: string;
  input: string;
  options?: ProcessOptions;
}
```

### AgentOutput

```typescript
interface AgentOutput {
  result: string;
  metadata?: Record<string, any>;
}
```

## Errors

### AgentError

Base error class for agent-related errors.

```typescript
class AgentError extends Error {
  constructor(message: string, code?: string);
  code?: string;
}
```

### InitializationError

Error thrown during agent initialization.

```typescript
class InitializationError extends AgentError {
  constructor(message: string);
}
```

### ProcessingError

Error thrown during input processing.

```typescript
class ProcessingError extends AgentError {
  constructor(message: string, input?: AgentInput);
  input?: AgentInput;
}
```

## Events

### Start Event

Emitted when the agent starts processing input.

```typescript
agent.on('start', () => {
  console.log('Agent started processing');
});
```

### Complete Event

Emitted when the agent completes processing.

```typescript
agent.on('complete', (output: AgentOutput) => {
  console.log('Agent completed:', output);
});
```

### Error Event

Emitted when an error occurs.

```typescript
agent.on('error', (error: AgentError) => {
  console.error('Agent error:', error);
});
```

## Constants

### Default Options

```typescript
const DEFAULT_OPTIONS: AgentOptions = {
  temperature: 0.7,
  maxTokens: 1000,
  timeout: 30000,
  retries: 3,
  debug: false
};
```

### Supported Models

```typescript
const SUPPORTED_MODELS = [
  'gpt-4',
  'gpt-3.5-turbo',
  'claude-2',
  'claude-instant-1'
];
```

### Capability Types

```typescript
const CAPABILITY_TYPES = {
  TEXT_GENERATION: 'text-generation',
  CODE_ANALYSIS: 'code-analysis',
  CODE_GENERATION: 'code-generation',
  DOCUMENTATION: 'documentation'
};
```

## Examples

### Basic Usage

```typescript
import { AIAgent } from 'ai-agent-tools';

const agent = new AIAgent({
  name: 'MyAgent',
  capabilities: ['text-generation'],
  model: 'gpt-4'
});

await agent.initialize();

const response = await agent.process({
  task: 'Generate text',
  input: 'Write a poem about coding'
});

console.log(response);
```

### Custom Capability

```typescript
import { AIAgent, Capability } from 'ai-agent-tools';

class CustomCapability implements Capability {
  name = 'custom-capability';
  
  async process(input: string): Promise<string> {
    return `Processed: ${input}`;
  }
}

const agent = new AIAgent({
  name: 'CustomAgent',
  capabilities: ['text-generation', new CustomCapability()],
  model: 'gpt-4'
});
```

### Event Handling

```typescript
const agent = new AIAgent({
  name: 'EventAgent',
  capabilities: ['text-generation'],
  model: 'gpt-4'
});

agent.on('start', () => {
  console.log('Started');
});

agent.on('complete', (output) => {
  console.log('Completed:', output);
});

agent.on('error', (error) => {
  console.error('Error:', error);
});
``` 