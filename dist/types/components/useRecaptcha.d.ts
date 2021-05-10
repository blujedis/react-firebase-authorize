import firebase from 'firebase/app';
import React, { HTMLAttributes, DetailedHTMLProps } from 'react';
import type { IRecaptchaOptions } from '../types';
declare type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export declare function useRecaptcha(): {
    ref: React.RefObject<HTMLDivElement>;
    createVerifier: (options?: IRecaptchaOptions | undefined) => firebase.auth.RecaptchaVerifier;
    RecaptchaComponent: (props: DivProps) => JSX.Element;
};
export {};
//# sourceMappingURL=useRecaptcha.d.ts.map