export interface IPCRequestInterface<ParamsType extends any[] = []> {
  responseChannel?: string;
  params?: ParamsType;
}
