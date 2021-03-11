<template>
  <div>
    <v-contain>
      <panZoom ref="penZ">
        <svg width="100%" height="400" ref="box">
          <g v-for="item in sowMap" :key="item.id">
            <rect
              v-if="item.state == '0'"
              :x="item.x"
              :y="item.y"
              width="150"
              height="50"
              style="fill:red; stroke: pink; stroke-width: 5"
              @touchdown="drag"
              @touchup="drop"
            >
              <text>空{{ item.id }}</text>
            </rect>
            <rect
              v-if="item.state == '1'"
              :x="item.x"
              :y="item.y"
              width="150"
              height="50"
              style="fill:red; stroke: pink; stroke-width: 5"
            >
              <text>🐷{{ item.epc }}</text>
            </rect>
            <rect
              v-if="item.state == '2'"
              :x="item.x"
              :y="item.y"
              width="150"
              height="50"
              style="fill:red; stroke: pink; stroke-width: 5"
            >
              <text>預留{{ item.id }}</text>
            </rect>
          </g>
          <rect v-if="dBox.show" :x="dBox.x" :y="dBox.y" width="150" height="50" style="fill:green;" @mouseup="drop"></rect>
        </svg>
      </panZoom>

      <v-divider></v-divider>
      <svg width="100%" height="50%">
        <g v-for="k in 2" :key="k">
          <g v-for="n in 6" :key="n">
            <rect
              :x="n * 10"
              :y="k * 10"
              width="2"
              height="3"
              style="fill: blue"
            />
          </g>
        </g>
      </svg>
      <v-row>
        <v-btn @click="pausedZoom">Paused</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="resumeZoom">Resume</v-btn>
      </v-row>
    </v-contain>
  </div>
</template>
<script>
export default {
  // components: {
  //   GridLayout: VueGridLayout.GridLayout,
  //   GridItem: VueGridLayout.GridItem,
  // },
  data: () => ({
    over: false,
    dBox:{
      x:0,
      y:0,
      show:false

    },
    sowInfo: [
      { id: 1, epc: "A" },
      { id: 3, epc: "E" },
      { id: 4, epc: "B" },
      { id: 7, epc: "C" },
      { id: 10, epc: "D" },
    ],
    layout: [
      { x: 0, y: 0, id: 1 },
      { x: 150, y: 0, id: 2 },
      { x: 300, y: 0, id: 3 },
      { x: 450, y: 0, id: 4 },
      { x: 600, y: 0, id: 5 },
      { x: 750, y: 0, id: 6 },
      { x: 0, y: 50, id: 7 },
      { x: 150, y: 50, id: 8 },
      { x: 300, y: 50, id: 9 },
      { x: 450, y: 50, id: 10 },
      { x: 600, y: 50, id: 11 },
      { x: 750, y: 50, id: 12 },
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
    drag(){
      this.$refs.box.addEventListener('mousemove', this.move);
      this.dBox.show = true;
    },
    drop(){
      this.$refs.box.removeEventListener('mousemove', this.move);
      this.dBox.show = false;
    },
    move(event){
      this.dBox.x = event.offsetX;
      this.dBox.y = event.offsetY;
    },
    pausedZoom() {
      this.$refs.penZ.pause();
    },
    resumeZoom() {
      this.$refs.penZ.resume();
    },
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
.box {
  width: 50px;
  height: 150px;
}
.drag {
  background: pink;
  position: relative;
  float: left;
}
.drop {
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