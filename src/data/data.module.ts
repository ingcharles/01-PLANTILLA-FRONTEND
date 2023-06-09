import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { environments } from "src/environments/environments";



@NgModule({
  declarations: [
      ],
  imports: [
    HttpClientModule,
    LoggerModule.forRoot({
      // serverLoggingUrl: 'general/Logs',
      // level: NgxLoggerLevel.DEBUG,
      // serverLogLevel: NgxLoggerLevel.ERROR
      serverLoggingUrl: `${environments.baseUrl}/General/Logs`,
      level:environments.logLevel,
      serverLogLevel: environments.serverLogLevel,
      disableConsoleLogging: false
    }),
  ],
  providers: [],
  bootstrap: []
})
export class DataModule { }