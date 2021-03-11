<template>
  <div>
    <p>Mesh:{{currentID}}</p>
    <Scene @pointer$="observable" v-model="scene">
      <HemisphericLight diffuse="#FFF"></HemisphericLight>
      <Camera
        type="arcRotate"
        :radius="10"
        :beta="Math.PI / 4"
        v-model="camera"
      ></Camera
      >
       <!-- <Asset src="Pig_01.gltf" v-model="piggy"></Asset> -->
      <Ground :options="{ width: 20, height: 20 }" v-model="ground">
        <Physics></Physics>
      </Ground>
    </Scene>
  </div>
</template>

<script>
import { BABYLON } from "vue-babylonjs";
export default {
  data() {
    return {
      col: 3,
      row: 3,
      boxs: [],
      scene: null,
      ground: null,
      camera: null,
      startingPoint:null,
      currentMesh:null,
      currentID:"null",
      piggy:null
    };
  },
  methods: {
    buildFence(){

    },
    buildPiggy(){
       this.piggy.position.x =0;
       this.piggy.position.y =0;
       this.piggy.position.z =0;

    },
    buildBoxs() {
      var box = BABYLON.MeshBuilder.CreateBox("box", { width: 1, height: 1 });
      for (let i = 0; i < this.col; i++) {
        this.boxs[i] = box.clone("box" + i);
        this.boxs[i].position.x = i + 2;
        this.boxs[i].position.z = i + 1;
      }
    },
    observable(obj) {
      var sixDofDragBehavior = new BABYLON.SixDofDragBehavior();
      var matBB = new BABYLON.StandardMaterial("ground", this.scene);
      matBB.emissiveColor = new BABYLON.Color3(0.2, 1, 0.2);
      var matAA = new BABYLON.StandardMaterial("ground", this.scene);
      matAA.emissiveColor = new BABYLON.Color3(0, 0, 0);
      obj.observable.add((pointerInfo) => {
        switch (pointerInfo.type) {
          case BABYLON.PointerEventTypes.POINTERDOWN:
            if (
              pointerInfo.pickInfo.hit &&
              pointerInfo.pickInfo.pickedMesh != this.ground
            ) {
              this.currentMesh = pointerInfo.pickInfo.pickedMesh;
              this.currentMesh.material = matBB;
              this.currentID =this.currentMesh.id;
              this.currentMesh.addBehavior(sixDofDragBehavior);
            }
            break;
          case BABYLON.PointerEventTypes.POINTERUP:
            this.currentMesh.material = matAA;
            break;
          
        }
      });
    },
    
  },
  mounted() {
    //this.buildFence();
    //this.buildPiggy();
   
  },
};
</script>
