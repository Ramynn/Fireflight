import {ReactElement} from 'react';

interface BaseErrorUserMessage {
  /**
   * The main title of the error.
   */
  title: string | ReactElement;
  /**
   * The main details of the error.
   */
  message: string | ReactElement;
}

/**
 * The main error interface of the app.
 * This will help us to handle the Errors and integrate with them in layout.
 */
export class BaseError extends Error {
  /**
   * Te key of error. It should be equal to the current error class name.
   */
  public static key: string = 'BaseError';

  /**
   * To deal with errors in view layout, We create a unique key for each Error instance.
   */
  public ID: string;

  /**
   * Name or error code.
   */
  public readonly name: string;

  /**
   * Message of error.
   */
  public readonly message: string;

  /**
   * The [[Date]] from when an error has occurred.
   */
  public readonly time: Date;

  /**
   * To show error messages in view layout.
   */
  public userMessage: BaseErrorUserMessage = {
    title: 'errors.appError',
    message: 'errors.internalAppError'
  };

  /**
   * Stack trace.
   */
  stack: undefined | string;

  /**
   * @param name
   * @param message
   */
  constructor(name: string, message: string) {
    super(message);

    this.name = name;
    this.message = message;

    this.time = new Date();
    this.ID = (+this.time).toString();
  }
}
