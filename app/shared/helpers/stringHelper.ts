import {v4 as UUID} from 'uuid';

export namespace stringHelper {
  export const random = (): string => {
    return UUID();
  };
}
