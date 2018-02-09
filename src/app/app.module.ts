import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { LoggingService } from 'ionic-logging-service';
import { ConfigurationService } from 'ionic-configuration-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { FirestoreStorageService } from '../providers/database/fs-storage.service';
import { DebugService } from '../providers/debug/debug.service';

import { MyApp } from './app.component';

export function loadConfiguration(configurationService: ConfigurationService): () => Promise<void> {
    return () => configurationService.load('assets/settings.json');
}

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,

        HttpClient,
        LoggingService,
        ConfigurationService,
        { provide: APP_INITIALIZER, useFactory: loadConfiguration, deps: [ConfigurationService], multi: true},
    
        FirestoreStorageService,
        DebugService,
        
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
