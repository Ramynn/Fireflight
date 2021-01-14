import {BaseError} from './index';
import {debugHelper} from '../helpers';

/**
 * The base HTTP errors implementation.
 */
export class InvalidIPResponseError extends BaseError {
  public static key = 'InvalidIPResponseError';

  /**
   * @param data
   */
  constructor(data: unknown) {
    const message = 'Request returns invalid data';
    const name = 'InvalidIPResponseError';

    super(name, message);

    debugHelper.error('BaseHTTPErrors', name, data);
  }
}
