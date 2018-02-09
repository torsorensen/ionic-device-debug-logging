import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DebugService } from '../../providers/debug/debug.service';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {

    className:string = "AboutPage";

    constructor(
        public navCtrl: NavController,
        private debugService:DebugService,
    ) { 
        this.debugService.logEntry(this.className);
    }


    /**
     * Ionic life cycle events
     */

    ionViewDidLoad() {
        this.debugService.logEntry(this.className, "ionViewDidLoad");
    }

    ionViewDidEnter() {
        this.debugService.logEntry(this.className, "ionViewDidEnter");
    }

    ionViewDidLeave() {
        this.debugService.logEntry(this.className, "ionViewDidLeave");
    }

    

}
