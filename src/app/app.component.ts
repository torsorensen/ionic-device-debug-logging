import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'firebase';
import { environment } from '../environments/environment';

import { TabsPage } from '../pages/tabs/tabs';
import { DebugService } from '../providers/debug/debug.service';

@Component({
     templateUrl: 'app.html'
})
export class MyApp {
    
    className:string = "App";
    rootPage:any = TabsPage;

    constructor(
        private platform:Platform,
        private statusBar:StatusBar,
        private splashScreen:SplashScreen,

        private debugService:DebugService
    ) {
           
        this.debugService.logEntry(this.className);

        firebase.initializeApp(environment.firebase);
    
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.platform.ready().then(() => {
            this.debugService.logEntry(this.className, "platform.ready");
            this.hideSplashScreen();
            this.initStatusBar();
        });
        
    }

    hideSplashScreen() {
        this.splashScreen.hide();    
        if (this.splashScreen) {
            setTimeout(() => {
                this.splashScreen.hide();
            }, 100);
        }
    }

    initStatusBar() {
        this.statusBar.styleDefault(); //dark text
        //this.statusBar.styleLightContent(); //white text
        this.statusBar.backgroundColorByHexString('#151617'); //only works of overlaysWebView is false
        this.statusBar.overlaysWebView(true); // let status bar overlay webview
        //this.statusBar.hide();
    }
}
