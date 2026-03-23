# Test Task Microservices

A NestJS monorepo containing two microservices that communicate via RabbitMQ. When a user is created, a delayed notification is scheduled and later dispatched to a webhook.

## Architecture

```
┌─────────────────┐    RabbitMQ     ┌───────────────────────┐     BullMQ/Redis     ┌─────────────┐
│  user-service   │──────────────►  │  notification-service │ ──────────────────►   │  Worker      │
│  (HTTP :3001)   │  user.created   │  (HTTP :3002)         │  24h delayed job      │  (in-proc)   │
└────────┬────────┘                 └───────────┬───────────┘                       └──────┬──────┘
         │                                      │                                          │
    PostgreSQL                             PostgreSQL                                 HTTP webhook
     (user-db)                          (notification-db)                            (WEBHOOK_URL)
```

**User service** exposes an HTTP API to create users. On creation it emits a `user.created` event to RabbitMQ.

**Notification service** consumes the event, persists a notification record, and enqueues a BullMQ job delayed by 24 hours. When the delay expires the in-process worker calls the configured webhook URL.

## Tech Stack

- **Runtime:** Node.js, NestJS
- **Language:** TypeScript
- **Package Manager:** pnpm
- **Databases:** PostgreSQL 16 (one per service, via Sequelize)
- **Message Broker:** RabbitMQ 3
- **Job Queue:** BullMQ (backed by Redis 7)
- **Containerisation:** Docker, Docker Compose

## Project Structure

```
apps/
├── user-service/          # User creation HTTP API + RMQ producer
│   └── src/modules/
│       ├── user/          # Controller, service (POST /users/create)
│       └── common/db/     # Sequelize setup, User entity
├── notification-service/  # RMQ consumer + BullMQ scheduler & worker
│   └── src/modules/
│       ├── notification/        # RMQ event handler, Bull job enqueue
│       ├── notification-worker/ # BullMQ processor (webhook caller)
│       └── common/db/          # Sequelize setup, Notification entity
libs/
└── shared/                # Shared constants, DTOs, modules
    └── src/
        ├── rmq/           # Dynamic RabbitMQ client module
        ├── api-client/    # Axios HTTP client module
        ├── constants/     # Queue names, delays, messages
        ├── dto/           # NotificationJobDto, UserCreatedEventDto
        └── types/         # NotificationStatus enum
```

## Installation

```bash
pnpm install
```

### With Docker Compose (development)

```bash
docker compose -f docker-compose.dev.yml up
```

### Without Docker

Make sure PostgreSQL, RabbitMQ, and Redis are available, then:

```bash
# start individual services in watch mode
pnpm run start:dev:user-service
pnpm run start:dev:notification-service

# or start compiled output
pnpm run start:user-service
pnpm run start:notification-service
```

## Build

```bash
pnpm run build                     # both services
pnpm run build:user-service        # user-service only
pnpm run build:notification-service # notification-service only
```

## Lint & Format

```bash
pnpm run lint           # ESLint with auto-fix
pnpm run format         # Prettier
```
