const ViewModel = require('./main-view-model');

let ImageAsset = require('@nativescript/core/image-asset');
ImageAsset = new ImageAsset.ImageAsset();
let ImageSource = require('@nativescript/core/image-source');
ImageSource = new ImageSource.ImageSource();

const CameraPlus = require('@nstudio/nativescript-camera-plus').CameraPlus;


let page;
let cam = undefined;
let isInit = true;
exports.pageLoaded = function (args) {
    page = args.object;
    page.bindingContext = ViewModel;
    ViewModel.set('repeater', []);
    ViewModel.set('isImage', true);
    ViewModel.set('loaded', false);
    ViewModel.set('intents', 0);
}

exports.camLoaded = function (args) {
    console.log(`cam loaded event`);
    try {
        cam = args.object;
        if (isInit) {
            isInit = false;
            console.log('NEW LISTENER');
            cam.on(CameraPlus.photoCapturedEvent, (event) => {
                onEvent(event);
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function setContent(file) {
    console.log(file.android)
    const repeater = ViewModel.get('repeater');
    repeater.unshift({
        isImage: true,
        src: file.android
    })
    ViewModel.set('repeater', repeater);
    page.getViewById('repeater').refresh();
    ViewModel.set('loaded', true);
}

function onEvent(args) {
    console.log('onEvent()');
    console.dir(args);
    //console.dir(args.data);
    ViewModel.set('testImage', '');
    setContent(args.data);
}

exports.toggleFlashOnCam = function (args) {
    console.log('toggleFlashOnCam()');
    cam.toggleFlash();
}
exports.toggleShowingFlashIcon = function (args) {
    console.log(`showFlashIcon = ${cam.showFlashIcon}`);
    cam.showFlashIcon = cam.showFlashIcon;
}
exports.toggleTheCamera = function (args) {
    console.log('toggleTheCamera()');
    cam.toggleCamera();
}

exports.takePicFromCam = function (args) {
    console.log('takePicFromCam()');
    ViewModel.set('loaded', true);
    ViewModel.set('intents', ViewModel.get('intents') + 1);
    cam.requestCameraPermissions().then(() => {
        // if (!cam) {
        //     cam = new CameraPlus();
        // }
        cam.takePicture({
            saveToGallery: true,
            height: 120,
            width: 90
        });
    });
}
exports.tapReset = function () {
    ViewModel.set('repeater', []);
    page.getViewById('repeater').refresh();
    ViewModel.set('intents', 0);
}