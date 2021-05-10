import type { IAuthLogPayload } from '../types';
import { serializeError } from './helpers';

export type Logger = ReturnType<typeof initLogger>;

let _logger: Logger;

function initLogger(logger: (payload: IAuthLogPayload) => void) {

  function log(message: string): void;
  function log<E extends Error>(error: E): void;
  function log(data: Record<string, any>): void;
  function log(type: IAuthLogPayload['level'], message: string): void;
  function log<E extends Error>(type: IAuthLogPayload['level'], error: E): void;
  function log(type: IAuthLogPayload['level'], data: Record<string, any>): void;
  function log<E extends Error>(type: string | Error | Record<string, any> | IAuthLogPayload['level'], value?: string | E | Record<string, any>) {

    let payload: IAuthLogPayload;

    if (type instanceof Error) {
      value = serializeError(type);
      type = 'error';
      value['level'] = 'error';
    }

    else if (type === 'string' && !['fatal', 'error', 'warn', 'info', 'debug'].includes(type)) {
      value = {
        level: 'log',
        message: type
      };
      type = '';
    }

    else if (typeof type === 'object') {
      value = type;
      type = '';
    }

    type = type || 'log';
    payload = value as IAuthLogPayload;
    payload.level = payload.level || type as any;
    payload.message = payload.message || '';
    payload.timestamp = Date.now();

    logger(payload);

  }

  return log;

}

export function createLogger(logger: (payload: IAuthLogPayload) => void) {
  if (!_logger)
    _logger = initLogger(logger);
  return _logger;
}

