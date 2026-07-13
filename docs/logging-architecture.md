# Logging Architecture

**Project:** Toolshop Test Automation Framework  
**Status:** Approved  
**Version:** 2.0  
**Last Updated:** July 2026

---

## Document Purpose

This document describes the logging architecture and the design decisions behind the implementation.

Its purpose is to help developers understand how logging is structured, why specific architectural decisions were made, and how the logging system should be used throughout the framework.

---

# 1. Purpose

The logging system provides consistent and structured logging across the entire test automation framework.

Its goals are to:

- Improve debugging and failure analysis.
- Make test execution easier to understand.
- Support parallel test execution.
- Provide logs that can later be integrated with CI/CD pipelines and reporting tools.
- Keep the logging implementation independent from any specific logging library.

---

# 2. Tool Selection

## 2.1 Logging Library

The framework uses **Winston** as its logging library.

Winston was selected because it provides:

- Multiple log levels (`info`, `warn`, `error`, `debug`)
- Console and file transports
- Flexible formatting
- Extensible architecture
- Wide adoption in the Node.js ecosystem
- Easy integration with CI/CD pipelines

To keep the framework independent from Winston, all framework components communicate only with the custom `Logger` abstraction.

This allows the underlying logging library to be replaced in the future without modifying tests, Page Objects or API classes.

---

# 3. Design Principles

The logging architecture follows these principles:

- **Single Responsibility Principle (SRP)** – each component has one clear responsibility.
- **Separation of Concerns** – test logic, page actions, API communication and logging are separated.
- **Abstraction** – the framework communicates with a custom `Logger` instead of directly using Winston.
- **Scalability** – the implementation should support future reporting and CI integrations without changing existing tests.
- **Keep It Short and Simple (KISS)** – the architecture and documentation should remain easy to understand and focused on what is relevant for developers.

---

# 4. Architecture

## 4.1 Architecture Overview

The logging architecture is designed as a layered abstraction.

Framework components communicate only with the `Logger` class.

All logging implementation details are hidden behind the logging layer.

```text
                 Tests
                   │
      ┌────────────┼────────────┐
      │            │            │
      ▼            ▼            ▼
Page Objects   API Classes   Test Hooks
      │            │            │
      └────────────┴────────────┘
                   │
                   ▼
                Logger
                   │
                   ▼
             Winston Factory
                   │
                   ▼
              Winston Logger
             ┌───────────────┐
             │               │
             ▼               ▼
        Console Output   Worker Log File
```

Each layer has a dedicated responsibility.

---

## 4.2 Components

### 4.2.1 Logger

The `Logger` class is the public logging interface used throughout the framework.

Example:

```ts
Logger.info('Opening login page');
Logger.error('User creation failed');
```

No framework component should communicate directly with Winston.

---

### 4.2.2 Winston Factory

`winstonLogger.ts` is responsible for creating and configuring the Winston logger.

Responsibilities include:

- Creating the logger instance on first use (lazy initialization)
- Configuring transports
- Configuring log formatting
- Managing log file naming
- Creating one log file per Playwright worker

Each worker writes exclusively to its own log file to prevent concurrent file access during parallel execution.

The logger instance is created only when the first log message is written. 

This avoids unnecessary log file creation during Playwright worker initialization.

---

# 5. Logging Responsibilities

## 5.1 Test Specifications

Tests log only high-level business activities.

Examples:

- Test started
- Test finished
- Verifying login
- Verifying registration
- Verifying search results

Tests should **not** log UI actions such as clicking buttons or entering text.

---

## 5.2 Page Objects

Page Objects log user interactions.

Examples:

- Opening page
- Entering email
- Selecting country
- Clicking login button

Each public page action is responsible for its own logging.

Workflow methods should not duplicate log messages already produced by the individual actions.

---

## 5.3 API Classes

API classes log technical API interactions.

Examples:

- Creating user via API
- Logging in user via API
- Retrieving products via API
- Verifying API response

API classes verify technical success (`response.ok()`).

Business validation belongs to the test itself.

---

## 5.4 Test Lifecycle Logging

The framework uses Playwright's `beforeEach` and `afterEach` hooks to log the start and end of each test.

These hooks are defined locally in each test specification to keep the implementation simple and easy to understand.

---

## 5.5 Helper Classes

Utility classes should only log when they perform meaningful work.

Simple helper methods or value transformations should not produce log entries.

---

# 6. Parallel Execution Strategy

Playwright executes tests in parallel using multiple workers.

To avoid concurrent writes to the same log file, the framework creates one dedicated log file per Playwright worker.

Example:

```text
logs/
    20260710_181523_worker_0.log
    20260710_181523_worker_1.log
```

Each log file contains all log entries produced by the tests executed by that worker.

This approach provides:

- Safe parallel execution
- No concurrent file access
- Simple implementation
- Easy debugging
- Maintainable logging architecture

The worker identifier is automatically provided by Playwright using the `TEST_WORKER_INDEX` environment variable.

---

# 7. Logger Lifecycle

The framework uses lazy initialization.

The Winston logger is not created when the framework starts.

Instead, it is created automatically when the first log message is written.

This prevents empty log files from being created during module loading.

Advantages:

- No unnecessary log files
- Faster framework startup
- Simpler architecture
- No explicit logger initialization
- No logger disposal required

# 8. Future Improvements

The architecture is designed to support future enhancements without changing existing tests.

Potential extensions include:

- Configurable log levels
- Colored console output
- Structured JSON logging
- Log rotation
- CI/CD integration
- Testiny integration
- Automatic log cleanup

Because all framework code uses the `Logger` abstraction, these improvements can be implemented without modifying Page Objects, API classes or test specifications.

---

# 9. Summary

The logging architecture follows a layered design.

- **Tests** describe business behaviour.
- **Page Objects** describe user interactions.
- **API classes** describe technical communication.
- **Test hooks** log the test lifecycle.
- **Logger** provides a stable logging interface.
- **Winston Factory** creates the logger on first use.
- **Winston** remains an implementation detail hidden behind the framework abstraction.

The framework creates one log file per Playwright worker to support reliable parallel execution while keeping the implementation simple and maintainable.