export abstract class EventPublisher {
  abstract emit<T>(pattern: string, data: T): Promise<void>;
}
