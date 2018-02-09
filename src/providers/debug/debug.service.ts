import { Injectable } from '@angular/core';

import { ConfigurationService } from 'ionic-configuration-service';
import { LoggingService, LogMessage } from 'ionic-logging-service';


@Injectable()
export class DebugService {

    className:string = "DebugService";
    loggerName:string = "localStorageLogger";

    constructor(
        public configService: ConfigurationService,
        public loggingService: LoggingService
    ) { 
        this.logEntry(this.className);
    }


    /**
     * Simply log to console
     */
    log(page:string, methodName:string = "()", msg:string = ""):void {
        console.log(page + " | " + methodName + (msg ? " | " + msg : ""));
    }  
    warn(page:string, methodName:string = "()", msg:string = ""):void {
        console.warn(page + " | " + methodName + (msg ? " | " + msg : ""));
    }  


    /**
     *  Logs under specific levels: DEBUG, INFO, WARN, ERROR (all possible option: ALL, DEBUG, ERROR, FATAL, INFO, OFF, TRACE, WARN)
     */
    logDebug(page:string, methodName:string = "()", msg:string = ""):void {
        let logger = this.loggingService.getLogger(page);
        logger.debug(methodName, msg);
    }
    logInfo(page:string, methodName:string = "()", msg:string = ""):void {
        let logger = this.loggingService.getLogger(page);
        logger.info(methodName, msg);
    }
    logWarn(page:string, methodName:string = "()", msg:string = ""):void {
        let logger = this.loggingService.getLogger(page);
        logger.warn(methodName, msg);
    }
    logError(page:string, methodName:string = "()", msg:string = ""):void {
        let logger = this.loggingService.getLogger(page);
        logger.error(methodName, msg);
    }
    logEntry(page:string, methodName:string = "()", msg:string = ""):void {
        let logger = this.loggingService.getLogger(page);
        logger.entry(methodName, msg); //as log level INFO
    }
    logExit(page:string, methodName:string = "()", msg:string = ""):void {
        let logger = this.loggingService.getLogger(page);
        logger.exit(methodName, msg); //as log level INFO
    }
    getDebugLogAsString() {
        return this.generateDebugLogAsString();
    }
    
    


    
    /**
     * Private helpers
     */
   
    private generateDebugLogAsString():string {
        let userId:string = "user_id_here";//this.userService.getUserId();
        let versionId:string = "version_id_here";//this.userService.getVersionId();
        let timestampUser = new Date();
        let timestampUTC = timestampUser.toUTCString();
        let timestampMillis = timestampUser.getTime();

        let str:string = "";
        str += "--Global state--\r\n\r\n";
        str +=  "timestampUser: " + timestampUser + "\r\n" +
                "timestampUTC: " + timestampUTC + "\r\n" +
                "timestampMillis: " + timestampMillis + "\r\n" +
                "userId: " + userId + "\r\n" +
                "version: " + versionId + "\r\n";

        str += "\r\n";
        str += "--Start of debug log--";
        str += "\r\n";
        str += "\r\n";
        str += this.getLogEntriesToString();
        str += "\r\n";
        str += "--End of debug log--\r\n";

        return str;
    }
    private getLogEntriesToString():string {
        let logArr = this.getLogEntries() || [];
        let str = "";

        logArr.forEach( (msg:LogMessage) => {

            str += new Date(msg.timeStamp).toLocaleString() + " | " + msg.level + " | " + msg.logger + " | " + msg.methodName + (msg.message[0] ? " | " + msg.message[0] : "") + "\r\n";
        });
        return str;
    }
    private getLogEntries():any[] {
        let str = (<any>window).localStorage.getItem(this.loggerName);
        return JSON.parse(str);
    }
}
