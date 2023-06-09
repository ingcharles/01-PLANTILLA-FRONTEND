import { NgxLoggerLevel } from 'ngx-logger';
export const environments = {
  production: false,
  baseUrl:'https://localhost:7288',

  logLevel: NgxLoggerLevel.WARN,
  serverLogLevel: NgxLoggerLevel.ERROR
};
