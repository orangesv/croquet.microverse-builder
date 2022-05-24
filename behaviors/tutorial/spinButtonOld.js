

class SpinButtonOldPawn {
    setup() {
        this.addEventListener("pointerDown", "onPointerDown");
    }

    onPointerDown(){
        console.log("toggle Spin Old")
        this.say("toggleSpin_old");
    }

    destroy(){
        this.removeEventListener("pointerDown","onPointerDown");
    }

}

export default {
    modules: [
        {
            name: "spinbutton_old",
            pawnBehaviors: [SpinButtonOldPawn],
        }
    ]
}