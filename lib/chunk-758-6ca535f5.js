"use strict";(globalThis.webpackChunk_croquet_microverse=globalThis.webpackChunk_croquet_microverse||[]).push([[758],{7758:(i,e,t)=>{t.r(e),t.d(e,{default:()=>o});const o={modules:[{name:"Rapier",actorBehaviors:[class RapierActor{destroy(){this.removeCollider(),this.removeRigidBody()}getRigidBody(){if(!this.$rigidBody){if(void 0===this.rigidBodyHandle)return;const i=this.service("RapierPhysicsManager");this.$rigidBody=i.world.getRigidBody(this.rigidBodyHandle)}return this.$rigidBody}createRigidBody(i){this.removeRigidBody(),i.translation=new Worldcore.RAPIER.Vector3(...this.translation),i.rotation=new Worldcore.RAPIER.Quaternion(...this.rotation);const e=this.service("RapierPhysicsManager");this.$rigidBody=e.world.createRigidBody(i),this.rigidBodyHandle=this.$rigidBody.handle,e.rigidBodies[this.rigidBodyHandle]=this._target,this.getRigidBody().bodyType()===Worldcore.RAPIER.RigidBodyType.KinematicPositionBased&&(this.listen("setTranslation","Rapier$RapierActor.setKinematicTranslation"),this.listen("setRotation","Rapier$RapierActor.setKinematicRotation"),this.listen("moveTo","Rapier$RapierActor.setKinematicTranslation"),this.listen("rotateTo","Rapier$RapierActor.setKinematicRotation"))}setKinematicTranslation(i){this.getRigidBody().setNextKinematicTranslation(new Worldcore.RAPIER.Vector3(...i))}setKinematicRotation(i){this.getRigidBody().setNextKinematicRotation(new Worldcore.RAPIER.Quaternion(...i))}removeRigidBody(){var i=this.getRigidBody();if(i){const e=this.service("RapierPhysicsManager");e.world.removeRigidBody(i),delete e.rigidBodies[this.rigidBodyHandle],delete this.rigidBodyHandle,delete this.$rigidBody}}createCollider(i){this.removeCollider();const e=this.service("RapierPhysicsManager");i=e.world.createCollider(i,this.rigidBodyHandle);return this.colliderHandle=i.handle,this.colliderHandle}removeCollider(){if(void 0!==this.colliderHandle){let i=this.service("RapierPhysicsManager").world;i.removeCollider(i.getCollider(this.colliderHandle)),delete this.colliderHandle}}}]}]}}}]);