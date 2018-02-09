import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DebugService } from '../../providers/debug/debug.service';
import { FirestoreStorageService } from '../../providers/database/fs-storage.service';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    className:string = "HomePage";

    btnText:any = {
        debugConsole:"Console log",
        debugPrint:"Print log",
        debugUpload:"Upload log",
    };
    printedDebugLog:String;
    canUploadDebugFile:boolean;

    constructor(
        public navCtrl: NavController,
        private debugService:DebugService,
        private fsStorageService:FirestoreStorageService,
    ) { 
        this.debugService.logEntry(this.className);
    }



    /**
     * Ionic life cycle events
     */

   ionViewDidLoad() {

        //Runs when the page has loaded. This event only happens once per page being created. 
        //If a page leaves but is cached, then this event will not fire again on a subsequent viewing.
        // The ionViewDidLoad event is good place to put your setup code for the page.
        
        this.debugService.logEntry(this.className, "ionViewDidLoad");

        this.canUploadDebugFile = true;
        this.btnText.debugUpload = "Upload log";
    }
    
    ionViewDidEnter() {
        this.debugService.logEntry(this.className, "ionViewDidEnter");
    }

    ionViewDidLeave() {
        this.debugService.logEntry(this.className, "ionViewDidLeave");
    }
    


    /**
     * View bound
     */
    doDebugConsole() {
        console.log(this.debugService.getDebugLogAsString());
    }
    doDebugPrint() {
        this.printedDebugLog = this.debugService.getDebugLogAsString();
    }
    doDebugUpload() {
        let userId:string = "user_id_here";//this.userService.getUserId();
        let timestampUTC = new Date().toUTCString();
        let fullPath:string = userId + "/debugLog-" + timestampUTC + ".txt";

        this.fsStorageService.putString(fullPath, this.debugService.getDebugLogAsString() );
    }
    

}
