import {isEqual as defaultIsEqual} from 'lodash';

export namespace objectHelper {
  export const areEqual = (value: Record<string | number, unknown> | unknown, target: Record<string | number, unknown> | unknown): boolean => {
    if (typeof value !== typeof target) {
      return false;
    }

    return defaultIsEqual(value, target);
  };
}
