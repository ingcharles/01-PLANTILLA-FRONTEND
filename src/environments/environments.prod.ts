import { NgxLoggerLevel } from 'ngx-logger';

export const environments = {
  production: false,
  baseUrl:'https://app02.cne.gob.ec',
  // apiUrl: 'https://api.myservice.com/api/', // Replace with remote API
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR
};