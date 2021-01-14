import defaultUnion from 'lodash/union';

export namespace arrayHelper {
  export const unique = <Type extends unknown[]>(value: Type): Type => {
    return defaultUnion(value) as Type;
  };

  export const removeEmptyItems = <Type extends unknown[]>(value: Type): Type => {
    return value.filter(() => true) as Type;
  };

  export const removeItems = <Type extends unknown[]>(value: Type, itemsToBeRemoved: unknown[]): Type => {
    return value.filter((index) => {
      return !itemsToBeRemoved.includes(index);
    }) as Type;
  };
}
