

class SpinButtonActor {
    setup() {
        if (this.spinning) {
            this.spinning = false; // start without spinning
        }
        this.angle = 0;
        this.spinSpeed = 0.01;
        this.addEventListener("pointerDown", "toggle");   
    }

    step() {
        if (!this.spinning) {return;}
        this.future(20).step();
        this.angle+=this.spinSpeed;
        this.publish("spinners","spinangle",this.angle);
    }

    toggle() {
        this.spinning = !this.spinning;
        console.log("toggle spinners");
        if (this.spinning) {
            this.step();
        }
    }

    destroy() {
        this.removeEventListener("pointerDown", "toggle");
        this.spinning = false;
    }


}

class SpinButtonPawn {

}

export default {
    modules: [
        {
            name: "spinbutton",
            actorBehaviors: [SpinButtonActor],
            pawnBehaviors: [SpinButtonPawn],
        }
    ]
}