import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

import { DebugService } from '../debug/debug.service';

@Injectable()
export class FirestoreStorageService {

    className:string = "FirestoreStorageService";
    
    constructor(
        private debugService:DebugService
    ) { 
        this.debugService.logEntry(this.className);
    }


    /**
     * Universal file operations to Firestore Storage
     */
    putString(fullPath:string, str:string) {

        // Create a root reference
        var storageRef = firebase.storage().ref();

        var ref = storageRef.child(fullPath);
        let uploadTask = ref.putString(str).then( (snapshot) => {
            this.debugService.logDebug(this.className, "putString", "Uploaded a raw string!");
        });
        
        //uploadTask can be used to manage (pause, resume, stop, get url) 
        //https://firebase.google.com/docs/storage/web/upload-files
        return uploadTask;
    }

    //TODO 
    //Add regular file uploads as well
}