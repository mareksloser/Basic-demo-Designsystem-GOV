interface ColorConfig {
  bg: string;
  text: string;
}
export declare const govLog: (message: string, colors?: ColorConfig) => void;
export declare const govWarningLog: (message: string) => void;
export declare const govErrorLog: (message: string) => void;
export {};
