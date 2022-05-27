document.addEventListener("click", getAccelPermission)

function getAccelPermission(){
    console.log("asking permission to access accelerometer");
    try{
        DeviceMotionEvent.requestPermission().then(response => {
            if (response == 'granted') {
                console.log("accelerometer motion permission granted");
                
                try{
                    document.removeEventListener("click",getAccelPermission);
                }catch{
                    //ignore
                }

            }
        });
        DeviceOrientationEvent.requestPermission().then(response => {
            if (response == 'granted') {
                console.log("accelerometer orientation permission granted");
                try{
                    document.removeEventListener("click",getAccel);
                }catch{
                    //ignore
                }
            }
        });
    }catch{
        console.log("DeviceMotionEvent or DeviceOrientationEvent not supported on this device");
        try{
            document.removeEventListener("click",getAccelPermission);
        }catch{}
    }
}


class iPhoneAccelerometerActor{
    setup(){
        console.log("setup accelerator actor");
        this.listen("orientation", this.orientation)
    }

    orientation(angles){
        this.set({rotation: Worldcore.q_euler(
            Worldcore.toRad(angles[1]),
            Worldcore.toRad(angles[2]), 
            Worldcore.toRad(angles[0])
            )
        });
    };

}

class iPhoneAccelerometerPawn {
    setup() {
        window.addEventListener('deviceorientation', 
            (event) => {
                this.say("orientation", [event.alpha,event.beta, event.gamma])
            }
        );

    }
    
    destroy(){
        this.removeEventListener("pointerDown","onPointerDown");
    }
}

export default {
    modules: [
        {
            name: "accelerometer_iphone",
            actorBehaviors: [iPhoneAccelerometerActor],
            pawnBehaviors: [iPhoneAccelerometerPawn],
        }
    ]
}