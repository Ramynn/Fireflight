export interface CIDRMatcherInterface {
  contains: (IP: string) => boolean;
}
