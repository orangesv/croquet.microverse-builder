# Croquet Microverse Builder
## Development Guide

**Copyright (c) 2022 Croquet Corporation**

<https://croquet.io>

<info@croquet.io>

## Introduction

Croquet Microverse Builder allows you to create a multiuser virtual 3D world. You can add new 3D objects, change their properties, and write their "behaviors" dynamically, all while you and other users are in the same world.

Every object you create in the world is called a "card". A card can be in any shape and size.  Some cards are flat, some hold 3D models, some cards' visual representation  are generated programmatically by a behavior. Even the terrain model on which the avatars walk is a card with a 3D model. You can typically drag and drop a 3D model file or an image into a running world to create a card. You can also write a simple specification file to start a new world.

Cards can communicate with each other by the [Croquet's publish/subscribe mechanism](https://croquet.io/docs/croquet/) to trigger actions.

A behavior is a class extension mechanism. It is like a subclass of a card but it can be attached and detached to a card dynamically. Attached behaviors can enhance features of the "actor" (the model) of the card as well as the "pawn" (the view).

Therefore, creating a Croquet Microverse world means to arrange your 3D objects in the world, including the terrain model, and specify behaviors to some objects. Other user can join in the world you are create it together, and once you are satisfied, the result can be saved into a file, or card specifications can be extracted to the world file.

## Start a demo world
You can specify the starting point of a session by giving a URL parameter `?world=`. If the value for this parameter does not end with `.json`, the value is interpreted as the name of a file in the `worlds` directory, and corresponding `.js` file is used. If the value ends with .json, it is interpreted as a URL for a .json file saved from the Save menu. The JSON file can be a URL for  a public place like Github Gist.

One of the demo worlds in the repository is called `demoWorld1`, and you can start it by opening <http://localhost:9684/?world=demoWorld1>

![Demoworld1](./assets/DemoWorld1.png)

## World Definition File

Demoworld1 is made up of just three cards (not including the avatars). There is a floor card, which allows us to walk around, a light card that lets us see the world around us, and a flat card with the Croquet logo on it. The code defining this world can be found in the `worlds` directory. Open microverse-builder/worlds/demoWorld1.js in your text editor to see the following code. The init function is used to define the objects that make up the world.

The first values are Constants.MaxAvatars and ConstantsAvatarNames. The latter specifies the name of avatar model files stored in `assets/avatars`, and the former specifies how many different avatars we use before cycling back to the first one. You can add more files in the directory and specify their names here to use your own avatars.

```Javascript
// Copyright 2021 by Croquet Corporation, Inc. All Rights Reserved.
// https://croquet.io
// info@croquet.io

export function init(Constants) {
    Constants.MaxAvatars = 6;
    Constants.AvatarNames = [
        "generic/1", "generic/2", "generic/3", "generic/4", "generic/5", "generic/6",
        "alice", "newwhite", "fixmadhatter", "marchhare", "queenofhearts", "cheshirecat"
    ];
```

The next section defines the various behaviors we will be attaching to our cards. The first set are system behaviors. Those are used to implement the system side features (IOW, even such features are constructed with cards). The next group are the user behaviors. These are created by the creator of the world and are available in the DefaultCards section below.

```Javascript
    Constants.SystemBehaviorDirectory = "behaviors/croquet";
    Constants.SystemBehaviorModules = [
        "menu.js", "elected.js", "propertySheet.js"
    ];

    Constants.UserBehaviorDirectory = "behaviors/demoWorld";
    Constants.UserBehaviorModules = [
        "lights.js", "gridFloor.js"
    ];
```

The final section is where we define the cards. A card is defined by a number of parameters including the name, type, its initial location, scale and orientation, etc. (The full specification of spec is described in `Card Specification.md` in the docs directory.)

You can also specify a list of behaviors to the card. A behavior can define the visual representation, or how it acts when a user interacts with it, or how it can access live external data streams. Here, the first card, the "world model" is defined by the "GridFloor" module. We will take a look at that shortly. The next card defines the lighting in this world. The last card creates a much more card-like object. A floating object in the middle of the scene with the Croquet logo applied.

```Javascript
    Constants.DefaultCards = [
        {
            card: {
                name: "world model",
                behaviorModules: ["GridFloor"],
                layers: ["walk"],
                type: "object",
                translation:[0, -3, 0],
                shadow: true,
            }
        },
        {
            card: {
                name: "light",
                layers: ["light"],
                type: "lighting",
                behaviorModules: ["Light"],
                clearColor: 0xaabbff,
            }
        },
        {
            card: {
                name: "image card",
                translation: [0, -0.75, -10],
                scale: [4, 4, 4],
                type: "2d",
                textureType: "image",
                textureLocation: "./assets/images/CroquetLogo_RGB.jpg",
                frameColor: 0xcccccc,
                color: 0xffffff,
                cornerRadius: 0.05,
                depth: 0.05,
                shadow: true,
            }
        },
    ];
```

## Behaviors

Behaviors are a class extension mechanism of the Croquet Microverse. It is like subclassing to enhance a card, but you can attach and detech a behavior to the actor and the pawn dynamically.

We package a list of behaviors for the actor and another list for the pawn into an entity we call "behavior module", as typically the actor and pawn sides need to work together.

From our demoWorld, let us look at the behaviors in the GridFloor module.

```
// Grid Floor
// Croquet Microverse
// Generates a simple gridded floor card

class GridFloorPawn {
    setup() {
        this.shape.children.forEach((c) => {
            c.material.dispose();
            this.shape.remove(c);
	});
	this.shape.children = [];

        const THREE = Worldcore.THREE;
        const gridImage = './assets/images/grid.png';
        const texture = new THREE.TextureLoader().load(gridImage);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 100, 100 );

	let floor = new THREE.Mesh(
            new THREE.BoxGeometry( 100, 1, 100, 1, 1, 1 ),
            new THREE.MeshStandardMaterial({ map: texture, color: 0xcccccc }));
        floor.receiveShadow = true;
        this.shape.add(floor);
    }
}

export default {
    modules: [
        {
            name: "GridFloor",
            actorBehaviors: [],
            pawnBehaviors: [GridFloorPawn],
        }
    ]
}
```

This module simply defines the visual representation, so it does not have any actor behavior. The pawn behavior add a new Three.js `Mesh` to `this.shape`, which is the Three.js `Group` that represents the root of the visual apperanace.

Because behaviors are dynamically modified and attached and detached, their "life cycle" needs some attention. Namely, when the definition is edited and updated (via the watch server or in-world editing), the `setup()` method of the edited behavior is called. Also, when a behavior is detached from the card, the `detstory` method is called. Also note that when the browser tab running the application is hidden, the application may lose the WebSocket connection to the Croquet backend. The Croquet system is smart so that next time the tab comes back to foreground, it automatically reconnects and reconstruct the view; but it means that the `setup()` method may be called at that moment, also.

In the `GridFloorPawn` case, we simply removes all children that `this.shape` might have first, and then create the new `floor` `Mesh`.

The `Worldcore` variable contains the all exported functions and objects from the Worldcore package. Refer to the [Worldcore documentation](https://croquet.io/docs/worldcore) what are available. The most commonly used one is `Worldcore.THREE`, which in turn contains all exports from Three.js.

Let us look at another module that adds an ability to pointer drag to add a spin to a card.


```Javascript
class SpinActor {
    setup() {
        this.listen("startSpinning", "startSpinning");
        this.listen("stopSpinning", "stopSpinning");
    }

    startSpinning(spin) {
        this.isSpinning = true;
        this.qSpin = Worldcore.q_euler(0, spin, 0);
        this.doSpin();
    }

    doSpin() {
        if(this.isSpinning) {
            this.setRotation(Worldcore.q_multiply(this._rotation, this.qSpin));
            this.future(50).doSpin();
        }
    }

    stopSpinning() {
        this.isSpinning = false;
    }

    destroy() {
        delete this.isSpinning;
        this.unsubscribe(this.id, "startSpinning");
        this.unsubscribe(this.id, "stopSpinning");
    }
}

class SpinPawn {
    setup() {
        this.addEventListener("pointerDown", "onPointerDown");
        this.addEventListener("pointerUp", "onPointerUp");
        this.addEventListener("pointerMove", "onPointerMove");
    }

    theta(xyz) {
        let origin = this.translation;
        return (Math.atan2(origin[2] - xyz[2], xyz[0] - origin[0]) + Math.PI * 2) % (Math.PI * 2);
    }

    onPointerDown(p3d) {
        this.base = this.theta(p3d.xyz);
        this.baseRotation = [...this._rotation];
        this.say("stopSpinning");
        this.moveBuffer = [];
    }

    onPointerMove(p3d) {
        this.moveBuffer.push(p3d.xyz);
        if (this.moveBuffer.length > 3) {
            this.moveBuffer.shift();
        }
        let next = this.theta(p3d.xyz);
        let newAngle = ((next - this.base) + Math.PI * 2) % (Math.PI * 2);
        let qAngle = Worldcore.q_euler(0, newAngle, 0);

        this.say("setRotation", Worldcore.q_multiply(this.baseRotation, qAngle));
    }

    onPointerUp(p3d) {
        if (p3d.xyz){ // clean up and see if we can spin
            if (this.moveBuffer.length < 3) {return;}
            let prev = this.theta(this.moveBuffer[0]);
            let next = this.theta(p3d.xyz);
            this.onPointerMove(p3d);
            this.deltaAngle = (next + (Math.PI * 2)) % (Math.PI * 2) - (prev + (Math.PI * 2)) % (Math.PI * 2)
            if(Math.abs(this.deltaAngle) > 0.001) {
                let a = this.deltaAngle;
                a = Math.min(Math.max(-0.1, a), 0.1);
                this.say("startSpinning", a);
            }
        }
    }

    destroy() {
        this.removeEventListener("pointerDown", "onPointerDown");
        this.removeEventListener("pointerUp", "onPointerUp");
        this.removeEventListener("pointerMove", "onPointerMove");
    }
}

export default {
    modules: [
        {
            name: "Spin",
            actorBehaviors: [SpinActor],
            pawnBehaviors: [SpinPawn]
        }
    ]
}

/* globals Worldcore */
```

The overall structure of this is that the pointer event handlers (for `pointerDown`, `pointerUp` and `pointerMove`) are added to the pawn, and each of which invokes methods called `onPointerDown`, `onPointerMove`, and `onPointerUp`, respectively. The computed `qAngle` in `onPointerMove` is used to send the Worldcore's setRotation event.  Upon `pointerUp`, it determines if the card should keep spinning (if it had three or more move events before pointer up), and send an event called `startSpinning`.

On the actor side, the `startSpinning` and `stopSpinning`, which is sent when the next `pointerDown` occurs, are handled.

The last `export` statement exports those two behaviors as a module named "Spin".

Recall that `setup()` may be called multiple times in the life cycle of a card. To mitigate developer's burden, `addEventListener()` and `subscribe()` for a card internally keep track of the current listeners and subscriptions, and automatically remove or unsubscribes previous registration before adding new one.  That is why the `subscribe()/listen()` and `addEventListener()` calls in the `setup()` methods for both actor and pawn are simply called without any guard.

However, other kinds of initialization often needs some care. For example, creating a property on the actor side should typically look like this to initialize properties only for the first time.

```Javascript
    setup() {
        if (this.speed === undefined) this.speed = 0.1;
        if (this.angle === undefined) this.angle = 0.02;
	...
    }
```

Also if a behavior for a pawn creates Three.js objects, the `setup()` typically removes them before creating new ones, as shown in the GridFloor example.

But don't worry about this details too much initially. Even if you forget to add them at the beginning, the system can keep working, and you can incrementally (and quickly!) make your code more correct.

While you listed the name of the behaviors in the world file, such as `demoWorld1.js`, this is only necessary to load the behaviors that are used in the `DefaultCards` list.  Once you press the "Connect" button in the menu, all behavior modules that the watch server watches become available.

## The Property Sheet

You can bring up the Property Sheet for a card by holding down the control key and click on a card.

![PropertySheet](./assets/PropertySheet.png)

You can duplicate or delete the card from "actions". If you multi-select the modules and then press apply, you can attach or detach the modules (and the `setup()` and `destroy()` of them are called.)

The text area below shows the properties of the card in the format that is compatible with the card specification in the world file.  You can edit values and hit Ctrl-S (on Windows) or Cmd-S (on Mac), and the values are used to update the card. Also, you can copy the contents to your world file.

Note however that the content is not evaluated as JavaScript expression; rather, each line of the text is parsed, and the part after ":" is passed to `JSON.parse()` to create the value. (This is to avoid opening up full `eval()`  feature from the propety sheet.)

## Saving the World to a File

With the Property Sheet, you can extract the values for your world file.  You can also choose the "Save" item in the bottom-left menu to create a JSON file. If you specify the location of the JSON file to the `?world=` URL parameter, the content will be used to start the world.

## Persistence
The system internally creates the "persistent data" at 60 second interval when there are some activities. The data saved is essentially the same as the file created by "Save". It contains essential data to recreate the cards, but does not contain transient values of views, or avatars' states.

Also note that the start file, either in `.js` or `.json, is used only once to initialize the session. Any changes to the file after starting the world will not have any effects if you open the same Croquet Microvese session, which is specified by the `?q=` URL parameter.

