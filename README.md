# Test Task Microservices

This repository contains two NestJS microservices in a monorepo:

- `user-service`
- `notification-service`

## Installation

```bash
pnpm install
```

## Services

- `user-service` runs on port `3001` by default.
- `notification-service` runs on port `3002` by default.

You can override them with `USER_SERVICE_PORT`, `NOTIFICATION_SERVICE_PORT`, or the shared `PORT` variable.

## Running The Services

```bash
# start both services
pnpm run start

# start both services in watch mode
pnpm run start:dev

# start both services from the compiled dist output
pnpm run build
pnpm run start:prod
```

```bash
# run services individually
pnpm run start:user-service
pnpm run start:notification-service

# watch mode for a single service
pnpm run start:dev:user-service
pnpm run start:dev:notification-service
```

## Build

```bash
pnpm run build
pnpm run build:user-service
pnpm run build:notification-service
```

## Tests

```bash
# all unit tests
pnpm run test

# all e2e tests
pnpm run test:e2e

# per-service e2e tests
pnpm run test:e2e:user-service
pnpm run test:e2e:notification-service
```
