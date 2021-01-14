/* eslint-disable no-console */
export type DebugHelperTypes = 'error' | 'log' | 'info' | 'warn';

export namespace debugHelper {
  /**
   * Flush the logs.
   *
   * @ignore
   * @param {DebugHelperTypes} type
   * @param {string} scope
   * @param reports
   */
  const flush = (type: DebugHelperTypes, scope: string, ...reports: any[]): void => {
    const date = new Date();

    console[type]('>', date.toISOString(), ...reports.map((report) => (typeof report === 'object' ? JSON.stringify(report) : report)));
  };

  /**
   * Add a new log message in browsers console when debug mode is on.
   *
   * @param {string} scope Name of current namespace.
   * @param reports
   */
  export const log = (scope: string, ...reports: any[]): void => {
    flush('log', scope, ...reports);
  };

  /**
   * Add a new error message in browsers console when debug mode is on.
   *
   * @param {string} scope Name of current namespace.
   * @param reports
   */
  export const error = (scope: string, ...reports: any[]): void => {
    flush('error', scope, ...reports);
  };

  /**
   * Add a new info message in browsers console when debug mode is on.
   *
   * @param {string} scope Name of current namespace.
   * @param reports
   */
  export const info = (scope: string, ...reports: any[]): void => {
    flush('info', scope, ...reports);
  };
}
