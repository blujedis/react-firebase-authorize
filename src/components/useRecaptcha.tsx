import firebase from 'firebase/app';
import React, { useRef, forwardRef, HTMLAttributes, DetailedHTMLProps } from 'react';
import type { IRecaptchaOptions } from '../types';

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const RecaptchaComponentRef = forwardRef<HTMLDivElement, DivProps>((props, ref) => {

  props = {
    id: 'recaptcha-container',
    ...props
  };

  return (
    <div {...props} ref={ref}></div>
  );

});

export function useRecaptcha() {

  const ref = useRef<HTMLDivElement>(null);

  function createVerifier(options?: IRecaptchaOptions) {

    const captcha = new firebase
      .auth
      .RecaptchaVerifier(ref.current, { size: 'invisible', ...options });

    if (typeof window !== 'undefined') {
      (window as any).recaptchaVerifier = captcha;
      captcha.render().then(id => ((window as any).recaptchaWidgetId = id));
    }

    return captcha;

  };

  const RecaptchaComponent = (props: DivProps) => {
    return <RecaptchaComponentRef {...props} ref={ref} />
  };

  return {
    ref,
    createVerifier,
    RecaptchaComponent
  };

};