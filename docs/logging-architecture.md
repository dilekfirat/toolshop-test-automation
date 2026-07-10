# Logging Architecture

**Project:** Toolshop Test Automation Framework  
**Status:** Approved  
**Version:** 1.0  
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
Page Objects   API Classes   Fixtures
      │            │            │
      │            │            ├── Initialize Logger
      │            │            └── Dispose Logger
      └────────────┴────────────┘
                   │
                   ▼
                Logger
                   │
                   ▼
               LogManager
                   │
                   ▼
            Winston Logger
                   │
                   ▼
                Winston
```

Each layer has a dedicated responsibility.

---

## 4.2 Components

### Logger

The `Logger` class is the public logging interface used throughout the framework.

Example:

```ts
Logger.info('Opening login page');
Logger.error('User creation failed');
```

No framework component should communicate directly with Winston.

---

### LogManager

The `LogManager` manages the logger lifecycle.

Responsibilities include:

- Creating a logger for each test.
- Managing logger instances.
- Configuring log destinations.
- Managing log files.
- Disposing logger resources after test execution.

The rest of the framework does not know how loggers are created or managed.

---

### Winston Logger

`winstonLogger` contains the Winston configuration only.

Examples include:

- transports
- log format
- log level
- timestamps

It contains no framework logic.

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

## 5.4 Fixtures

Fixtures are responsible for the logging lifecycle.

Responsibilities include:

- Initializing the logger before each test.
- Disposing the logger after each test.

Fixtures should not contain business logging.

---

## 5.5 Helper Classes

Utility classes should only log when they perform meaningful work.

Simple helper methods or value transformations should not produce log entries.

---

# 6. Parallel Execution Strategy

Playwright executes tests in parallel using multiple workers.

Writing all log entries into a single file would produce interleaved and difficult-to-read logs.

To keep logs isolated and easy to analyse, the framework creates:

- One log directory per test execution.
- One log file per test.

Example:

```text
logs/
    2026-07-10_14-30-05/
        T1_login_validUser.log
        T4_login_invalidUser.log
        T1_registration.log
        T1_productSearch.log
```

This approach provides:

- Isolated logs for each test.
- Better readability during parallel execution.
- Easier debugging.
- Cleaner CI/CD artifacts.

---

# 7. Future Improvements

The architecture is designed to support future enhancements without changing existing tests.

Potential extensions include:

- Configurable log levels
- Colored console output
- JSON logging
- Log rotation
- CI/CD integration
- Allure attachments
- Testiny integration
- Centralized log aggregation (e.g. ELK, Splunk or Datadog)

Because all framework code uses the `Logger` abstraction, these improvements can be implemented without modifying Page Objects, API classes or test specifications.

---

# 8. Summary

The logging architecture follows a layered design.

- **Tests** describe business behaviour.
- **Page Objects** describe user interactions.
- **API classes** describe technical communication.
- **Fixtures** manage the logger lifecycle.
- **Logger** provides a stable logging interface.
- **LogManager** manages logger instances.
- **Winston** remains an implementation detail hidden behind the framework abstraction.

This architecture keeps the framework maintainable, scalable and easy to understand for new team members while supporting future enhancements with minimal impact on the existing codebase.