// Copyright 2021 by Croquet Corporation, Inc. All Rights Reserved.
// https://croquet.io
// info@croquet.io

export function init(Constants) {
    Constants.AvatarNames = [
        "newwhite", "madhatter", "marchhare", "queenofhearts", "cheshirecat", "alice"
    ];

    Constants.SystemBehaviorDirectory = "behaviors/croquet";
    Constants.SystemBehaviorModules = [
        "menu.js", "elected.js", "propertySheet.js", "avatar.js"
    ];

    Constants.UserBehaviorDirectory = "behaviors/tutorial";
    Constants.UserBehaviorModules = [
        "lights.js", "simpleSpin.js", "spinbutton.js", "accelerometer.js", "spinner.js"
    ];

    // const frameColor = 0x888888;

    Constants.DefaultCards = [
        {
            card: {
                name:"world model",
                layers: ["walk"],
                type: "3d",
                singleSided: true,
                shadow: true,
                placeholder: true,
                placeholderSize: [400, 1, 400],
                placeholderColor: 0x808080,
                placeholderOffset: [0, -0.663, 0],
            }
        },
        {
            card: {
                name: "light",
                layers: ["light"],
                type: "lighting",
                behaviorModules: ["Light"],
                dataLocation: "./assets/sky/paris2.jpg",
                dataType: "jpg",
            }
        },
        {
            card: {
                name: "FT Logo",
                translation: [0, 3,-10],
                scale: [4, 4, 4],
                type: "2d",
                behaviorModules: [],
                textureType: "image",
                textureLocation: "./assets/images/ft.png",
                // frameColor: 0xcccccc,
                color: 0xffffff,
                cornerRadius: 0.05,
                depth: 0.05,
                shadow: true,
            }
        },    
        {
            card: {
                name: "Orange Logo",
                translation: [5, 3,-10],
                scale: [4, 4, 4],
                type: "2d",
                textureType: "image",
                textureLocation: "./assets/images/Orange_logo.png",
                behaviorModules: ["accelerometer_iphone","spinbutton"],
                // frameColor: 0xcccccc,
                color: 0xffffff,
                cornerRadius: 0.05,
                depth: 0.05,
                shadow: true,
            }
        },
        {
            card: {
                name: "1988 Logo",
                behaviorModules: [],
                translation: [-5, 3,-10],
                scale: [4, 4, 4],
                type: "2d",
                textureType: "image",
                textureLocation: "./assets/images/1988logo.png",
                // frameColor: 0xcccccc,
                color: 0xffffff,
                cornerRadius: 0.05,
                depth: 0.05,
                shadow: true,
            }
        },
        {
            card: {
                name: "bibop",
                translation: [-5, 10,-10],
                scale: [4, 4, 4],
                type: "2d",
                textureType: "image",
                textureLocation: "./assets/images/bibop.png",
                behaviorModules: ["spinner"],
                // frameColor: 0xcccccc,
                color: 0xffffff,
                cornerRadius: 0.05,
                depth: 0.05,
                shadow: true,
                rotspeed: 0.1,
            }
        },        
        {
            card: {
                name:"Nokia",
                type: "3d",
                dataLocation: "./assets/3D/Nokia_3310.glb.zip",
                behaviorModules: ["spinner"],
                layers: ["pointer"],
                translation:[0, 10, -10],
                dataScale:[2,2,2],
                //rotation:[0, Math.pi/4, 0],
                shadow: true,
                rotspeed: 3,
            }
        },         
        {
            card: {
                name:"iPhone",
                type: "3d",
                dataLocation: "./assets/3D/iPhone_12_pro_max.glb.zip",
                behaviorModules: ["spinner"],
                layers: ["pointer"],
                translation:[5, 10, -10],
                dataScale:[2,2,2],
                //rotation:[0, Math.pi/4, 0],
                shadow: true,
                rotspeed: 53.7,
            }
        },      
    ];
}