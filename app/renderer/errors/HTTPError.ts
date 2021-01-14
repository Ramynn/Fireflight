import {AxiosError} from 'axios';
import {BaseError} from './index';
import {debugHelper} from '../helpers';

/**
 * The base HTTP errors implementation.
 */
export class HTTPError<Response = any> extends BaseError {
  public static key = 'HTTPError';

  /**
   * The response of current request.
   */
  response: Response | undefined;

  /**
   * The error object of the current request from http client driver (axios).
   */
  error: AxiosError | undefined;

  /**
   * @param error
   */
  constructor(error: AxiosError | undefined) {
    const name = 'BaseHTTPError';
    const response = error?.response?.data;
    const endpoint = error?.config?.url;

    const message = `Request for '${endpoint}' encountered with error.`;

    super(name, message);

    this.error = error;
    this.response = response;

    debugHelper.error('BaseHTTPError', name, error);
  }
}
