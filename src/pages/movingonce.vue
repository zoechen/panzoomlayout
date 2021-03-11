
<template>
  <div>
    <div>
      <p>Org:{{ orgID }} Des:{{ desID }}</p>
    </div>
    <grid-layout
      :layout.sync="sowMap"
      :col-num="colnum"
      :row-height="rowHeight"
      :is-draggable="false" 
      :is-resizable="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in sowMap"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.id"
        :key="item.id"
        class="grid"
      >
        <drop
          @dragover="handldOver"
          @drop="handleDrop(item.id)"
          v-if="item.state == '0'"
          ><v-card class="drop">空{{ item.id}}</v-card></drop
        >
        <drag
          v-if="item.state == '1'"
          @drag="handleDrag(item.id)"
          @dragend="handleEnd"
          ><v-card class="drag">🐷{{ item.epc }}</v-card></drag
        >
        <drop v-if="item.state == '2'"
          ><v-card class="drop resv">預留{{ item.id }}</v-card></drop
        >
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  data: () => ({
    over: false,
    sowInfo: [
      { id: 1, epc: "A" },
      { id: 3, epc: "E" },
      { id: 4, epc: "B" },
      { id: 7, epc: "C" },
      { id: 10, epc: "D" },
    ],
    layout: [
      { x: 0, y: 0, h: 1, w: 1, id: 1 },
      { x: 1, y: 0, h: 1, w: 1, id: 2 },
      { x: 2, y: 0, h: 1, w: 1, id: 3 },
      { x: 3, y: 0, h: 1, w: 1, id: 4 },
      { x: 4, y: 0, h: 1, w: 1, id: 5 },
      { x: 5, y: 0, h: 1, w: 1, id: 6 },
      { x: 0, y: 1, h: 1, w: 1, id: 7 },
      { x: 1, y: 1, h: 1, w: 1, id: 8 },
      { x: 2, y: 1, h: 1, w: 1, id: 9 },
      { x: 3, y: 1, h: 1, w: 1, id: 10 },
      { x: 4, y: 1, h: 1, w: 1, id: 11 },
      { x: 5, y: 1, h: 1, w: 1, id: 12 },
    ],
    sowMap: [],
    colnum: 6,
    rownum: 2,
    rowHeight: 160,
    sowTemp: [],
    desID: 0,
    orgID: 0,
  }),
  methods: {
    handleDrag(id) {
      this.orgID = id;
    },
    handleDrop(id) {
      this.desID = id;
      this.sowTemp = this.sowMap;
      var n = _.findIndex(this.sowMap, { id: this.orgID });
      var m = _.findIndex(this.sowMap, { id: this.desID });
      this.sowMap[m] = _.clone(this.sowTemp[n]);
    },
    handleEnd() {
      var n = _.findIndex(this.sowMap, { id: this.orgID });
      this.sowMap[n].state = "2";
    },
    loadLayout() {
      var mapID = _.map(this.sowInfo, "id");
      var tempArr = [];
      var tempSows = this.sowInfo;
      _.forEach(this.layout, function (v) {
        var isLoca = _.includes(mapID, v.id);
        if (isLoca) {
          var tempSow = _.find(tempSows, { id: v.id });
          var d = {
            x: v.x,
            y: v.y,
            w: v.w,
            h: v.h,
            id: v.id,
            epc: tempSow.epc,
            state: "1",
          };
          tempArr.push(d);
        } else {
          var b = {
            x: v.x,
            y: v.y,
            w: v.w,
            h: v.h,
            id: v.id,
            epc: "",
            state: "0",
          };
          tempArr.push(b);
        }
      });
      this.sowMap = tempArr;
      console.log(this.sowMap);
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.loadLayout();
    });
  },
};
</script>

<style>
.drag {
  width: 150px;
  height: 150px;
  background: pink;
  position: relative;
  float: left;
}
.drop {
  width: 150px;
  height: 150px;
  background: #aaa;
  position: relative;
  float: left;
}
.over {
  background: #ccc !important;
}
.resv {
  background: red !important;
}
</style>
