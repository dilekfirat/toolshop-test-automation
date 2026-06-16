# Toolshop Test Automation

Automated testing solution for the Toolshop application built with Playwright and JavaScript.

## Purpose

This project demonstrates the implementation of a maintainable and scalable UI test automation framework based on industry best practices.

The initial focus is on the most valuable customer workflows:

* User Registration
* User Login
* Product Search
* Add to Cart
* Checkout

The objective is to provide fast feedback through a reliable smoke regression suite.

## Technology Stack

* Playwright
* JavaScript
* Page Object Model (POM)
* Data-Driven Testing (DDT)
* GitHub Actions
* HTML Reporting

## Framework Structure

```text
tests/
pages/
test-data/
utils/
config/
reports/
screenshots/
```

## Design Principles

* Separation of test logic and UI implementation
* Independent and repeatable test execution
* Environment-based configuration
* Reusable test data
* Fast and reliable execution in CI pipelines

## Planned Test Coverage

| Feature        | Status  |
| -------------- | ------- |
| Registration   | Planned |
| Login          | Planned |
| Product Search | Planned |
| Add to Cart    | Planned |
| Checkout       | Planned |

## CI/CD

Tests are executed automatically through GitHub Actions.
