import firebase from "firebase/app";
import 'firebase/storage';
import clientCredentials from "./client";

import authSession from "./authSession"

export default class Storage {
    initialize() {
        if (!firebase.apps.length) {
            firebase.initializeApp(clientCredentials);
            let storage = firebase.storage().ref();
            return storage;
        }
        else {
            let storage = firebase.storage().ref();
            return storage;
        }
    }

    uploadImage(path, file) {
        let storageRef = this.initialize();
        const session = new authSession();
        let user = session.getProfile();

        // Create the file metadata
        var metadata = {
            contentType: 'images/jpeg'
        };

        // Define UploadTask Path of Upload in Storage
        switch (path) {
            case "images/users":
                // Upload file and metadata to the object 'path send via PROPS parameter'
                var uploadTask = storageRef.child(`${path}/${user.uid}/profile.jpg`).put(file, metadata);
                break;
            case "images/gallery":
                // Upload file and metadata to the object 'path send via PROPS parameter'
                var uploadTask = storageRef.child(`${path}/${user.uid}/gallery.jpg`).put(file, metadata);
                break;
            default:
                console.log("Error: path not match with any path");
        }

        return new Promise(function (resolve, reject) {
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                function (snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                }, function (error) {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            reject({
                                "status": "error",
                                "message": "User doesn't have permission to access the object"
                            })
                            break;

                        case 'storage/canceled':
                            reject({
                                "status": "error",
                                "message": "User canceled the upload"
                            })
                            break;

                        case 'storage/unknown':
                            reject({
                                "status": "error",
                                "message": "Unknown error occurred, inspect error.serverResponse"
                            })
                            break;
                    }
                }, function () {
                    // Upload completed successfully, now we can get the download URL
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        console.log('File available at', downloadURL);
                    });
                    resolve({
                        "status": "done",
                        "message": "upload successful"
                    })
                });

        });
    }

    getImage(path, type) {
        let storageRef = this.initialize();
        const session = new authSession();
        let user = session.getProfile();

        switch (type) {
            case "profile":
                var imageRef = storageRef.child(`${path}/${user.uid}/profile.jpg`);
                break;
            case "gallery":
                var imageRef = storageRef.child(`${path}/${user.uid}/profile.jpg`);
                break;
            default:
                console.log("Error: path not match with any path");
        }

        return new Promise(function (resolve, reject) {
            imageRef.getDownloadURL().then(function (url) {
                resolve({
                    "status": "done",
                    "message": "upload successful",
                    "src": url
                })
            }).catch(function (error) {
                reject({
                    "status": "error",
                    "message": error,
                })
            });

        });
    }

}