export class BaseError extends Error {
  public readonly context: Object | undefined;

  constructor(
    message: string,
    options: { cause?: Error; context?: Object } = {},
  ) {
    const { cause, context } = options;
    super(message, { cause });
    this.name = this.constructor.name;
    this.context = context;
  }
}

export class ArgumentOutOfBounds extends BaseError {
  constructor(options: { cause?: Error; context?: Object } = {}) {
    super('Argument out of bounds', options);
  }
}
