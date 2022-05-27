class SpinnerActor {

    setup() {
        this.angle = 0.0;
        this.spinSpeed = this._cardData.rotspeed;
        this.subscribe("spinners","spinangle", this.rotate);
    }

    rotate(angle) {
        this.angle=angle * this.spinSpeed;
        this.set({rotation: Worldcore.q_euler(0, this.angle, 0)});
    }

    destroy() {
        this.removeEventListener("pointerDown", "toggle");
        this.spinning = false;
    }


}

class SpinnerPawn {
    setup(){

    }
}


export default {
    modules: [
        {
            name: "spinner",
            actorBehaviors: [SpinnerActor],
            pawnBehaviors: [SpinnerPawn],
        }
    ]


}
