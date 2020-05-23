const ViewModel = require('./main-view-model');

let ImageAsset = require('@nativescript/core/image-asset');
ImageAsset = new ImageAsset.ImageAsset();
let ImageSource = require('@nativescript/core/image-source');
ImageSource = new ImageSource.ImageSource();

const CameraPlus = require('@nstudio/nativescript-camera-plus').CameraPlus;


let page;
let cam = undefined;
exports.pageLoaded = function (args) {
    page = args.object;
    page.bindingContext = ViewModel;
    ViewModel.set('repeater', []);
    ViewModel.set('isImage', true);
    ViewModel.set('loaded', false);
}
exports.camLoaded = function (args) {
    console.log(`cam loaded event`);
    try {
        cam = args.object;
        // const flashMode = args.object.getFlashMode();
        // console.log(`flashMode in loaded event = ${flashMode}`);
    } catch (e) {
        console.log(e);
    }
}

function onEvent(args) {
    console.log('onEvent()');
    console.dir(args);
    console.dir(args.data);
    ViewModel.set('testImage', '');
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
    cam.on(CameraPlus.photoCapturedEvent, (event) => {
        onEvent(event);
    });
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