interface IConfig {
  canValidateWcagOnRender: boolean;
  warningLog: boolean;
  errorLog: boolean;
  log: boolean;
  iconsPath: string;
  iconsLazyLoad: boolean;
  documentNode: Document;
}
export declare const isWindow: boolean;
export declare const canValidateWcagOnRender: () => IConfig['canValidateWcagOnRender'];
export declare const useWarningLog: () => IConfig['warningLog'];
export declare const useErrorLog: () => IConfig['errorLog'];
export declare const useLog: () => IConfig['log'];
export declare const iconsPath: () => IConfig['iconsPath'];
export declare const iconsLazyLoad: () => IConfig['iconsLazyLoad'];
export declare const documentNode: () => IConfig['documentNode'];
export {};
