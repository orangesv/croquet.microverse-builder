"use strict";(globalThis.webpackChunk_croquet_microverse=globalThis.webpackChunk_croquet_microverse||[]).push([[92],{7092:(t,i,n)=>{n.r(i),n.d(i,{default:()=>e});const e={modules:[{name:"Spin",actorBehaviors:[class SpinActor{setup(){this.listen("startSpinning","startSpinning"),this.listen("stopSpinning","stopSpinning"),this.listen("newAngle","newAngle")}startSpinning(t){this.isSpinning=!0,this.qSpin=Worldcore.q_euler(0,t,0),this.doSpin()}doSpin(){this.isSpinning&&(this.setRotation(Worldcore.q_multiply(this._rotation,this.qSpin)),this.future(50).doSpin())}stopSpinning(){this.isSpinning=!1}newAngle(t){this.publish("scope","newAngle",t)}destroy(){delete this.isSpinning,this.unsubscribe(this.id,"startSpinning"),this.unsubscribe(this.id,"stopSpinning"),this.unsubscribe(this.id,"newAngle")}}],pawnBehaviors:[class SpinPawn{setup(){this.addEventListener("pointerDown","onPointerDown"),this.addEventListener("pointerUp","onPointerUp"),this.addEventListener("pointerMove","onPointerMove")}theta(t){var i=this.translation;return(Math.atan2(i[2]-t[2],t[0]-i[0])+2*Math.PI)%(2*Math.PI)}onPointerDown(t){this.moveBuffer=[],this.say("stopSpinning"),this._startDrag=t.xy,this._baseRotation=this._rotation}onPointerMove(t){this.moveBuffer.push(t.xyz),this.deltaAngle=(t.xy[0]-this._startDrag[0])/2/180*Math.PI;t=Worldcore.q_multiply(this._baseRotation,Worldcore.q_euler(0,this.deltaAngle,0));this.rotateTo(t)}onPointerUp(t){var i;this._startDrag=null,this._baseRotation=null,this.moveBuffer.length<3||.001<Math.abs(this.deltaAngle)&&(i=this.deltaAngle,i=Math.min(Math.max(-.1,i),.1),this.say("startSpinning",i))}destroy(){this.removeEventListener("pointerDown","onPointerDown"),this.removeEventListener("pointerUp","onPointerUp"),this.removeEventListener("pointerMove","onPointerMove")}}]}]}}}]);