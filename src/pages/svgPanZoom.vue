<template>
  <div>
    <v-row
      ><v-text-field label="Find by ID" v-model="pickID"></v-text-field
      ><v-btn @click="findByID()">send</v-btn></v-row
    >

    <v-row
      ><v-btn @click="zoomin">zoom in</v-btn><v-spacer /><v-btn @click="zoomout"
        >zoom out</v-btn
      >
    </v-row>
    <SvgPanZoom
      style="width: 100%; height: 500px; border: 1px solid black"
      :panEnabled="false"
      :mouseWheelZoomEnabled="false"
      @svgpanzoom="registerSvgPanZoom"
    >
      <svg width="100%" height="500">
        <g v-for="item in layout" :key="item.id">
          <rect
            :id="item.id"
            :x="item.x"
            :y="item.y"
            :width="boxWidth"
            :height="boxHeight"
            :fill="item.color"
            style="stroke: pink; stroke-width: 5"
            @mousedown="pick(item.id)"
            @touchstart="pick(item.id)"
          />
          <text :x="item.x + 10" :y="item.y + 20">
            {{ item.id }}
          </text>
        </g>
      </svg>
      <svg slot="thumbnail">
        <g v-for="item in layout" :key="item.id">
          <rect
            :x="item.x"
            :y="item.y"
            :width="boxWidth"
            :height="boxHeight"
            :fill="item.color"
            style="stroke: #fff; stroke-width: 10"
          />
        </g>
      </svg>
    </SvgPanZoom>
    <p>{{ pickText }}</p>
  </div>
</template>
<script>
import SvgPanZoom from "vue-svg-pan-zoom";

export default {
  components: { SvgPanZoom },
  data: () => ({
    pin: {
      x: 0,
      y: 0,
      id: 0,
    },
    pickID: null,
    mainSPZ: null,
    pickText: "none",
    allnum: 12,
    colnum: 18,
    rownum: 4,
    tempColnum: 0,
    tempRownum: 0,
    boxHeight: 150,
    boxWidth: 50,
    layout: [
      { x: 0, y: 0, id: 0, color: "blue" },
      { x: 50, y: 0, id: 1, color: "blue" },
      { x: 100, y: 0, id: 2, color: "blue" },
      { x: 150, y: 0, id: 3, color: "blue" },
      { x: 200, y: 0, id: 4, color: "blue" },
      { x: 250, y: 0, id: 5, color: "blue" },
      { x: 300, y: 0, id: 6, color: "blue" },
      { x: 350, y: 0, id: 7, color: "blue" },
      { x: 400, y: 0, id: 8, color: "blue" },
      { x: 450, y: 0, id: 9, color: "blue" },
      { x: 500, y: 0, id: 10, color: "blue" },
      { x: 550, y: 0, id: 11, color: "blue" },
      { x: 600, y: 0, id: 12, color: "blue" },
      { x: 650, y: 0, id: 13, color: "blue" },
      { x: 700, y: 0, id: 14, color: "blue" },
      { x: 750, y: 0, id: 15, color: "blue" },
      { x: 800, y: 0, id: 16, color: "blue" },
      { x: 850, y: 0, id: 17, color: "blue" },
      { x: 900, y: 0, id: 18, color: "blue" },
      { x: 950, y: 0, id: 19, color: "blue" },
      { x: 1000, y: 0, id: 20, color: "blue" },
      { x: 0, y: 150, id: 21, color: "blue" },
      { x: 50, y: 150, id: 22, color: "blue" },
      { x: 100, y: 150, id: 23, color: "blue" },
      { x: 150, y: 150, id: 24, color: "blue" },
      { x: 200, y: 150, id: 25, color: "blue" },
      { x: 250, y: 150, id: 26, color: "blue" },
      { x: 300, y: 150, id: 27, color: "blue" },
      { x: 350, y: 150, id: 28, color: "blue" },
      { x: 400, y: 150, id: 29, color: "blue" },
      { x: 450, y: 150, id: 30, color: "blue" },
      { x: 500, y: 150, id: 31, color: "blue" },
      { x: 550, y: 150, id: 32, color: "blue" },
      { x: 600, y: 150, id: 33, color: "blue" },
      { x: 650, y: 150, id: 34, color: "blue" },
      { x: 700, y: 150, id: 35, color: "blue" },
      { x: 750, y: 150, id: 36, color: "blue" },
      { x: 800, y: 150, id: 37, color: "blue" },
      { x: 850, y: 150, id: 38, color: "blue" },
      { x: 900, y: 150, id: 39, color: "blue" },
      { x: 950, y: 150, id: 40, color: "blue" },
      { x: 1000, y: 150, id: 41, color: "blue" },
      { x: 0, y: 300, id: 42, color: "blue" },
      { x: 50, y: 300, id: 43, color: "blue" },
      { x: 100, y: 300, id: 44, color: "blue" },
      { x: 150, y: 300, id: 45, color: "blue" },
      { x: 200, y: 300, id: 46, color: "blue" },
      { x: 250, y: 300, id: 47, color: "blue" },
      { x: 300, y: 300, id: 48, color: "blue" },
      { x: 350, y: 300, id: 49, color: "blue" },
      { x: 400, y: 300, id: 50, color: "blue" },
      { x: 450, y: 300, id: 51, color: "blue" },
      { x: 500, y: 300, id: 52, color: "blue" },
      { x: 550, y: 300, id: 53, color: "blue" },
      { x: 600, y: 300, id: 54, color: "blue" },
      { x: 650, y: 300, id: 55, color: "blue" },
      { x: 700, y: 300, id: 56, color: "blue" },
      { x: 750, y: 300, id: 57, color: "blue" },
      { x: 800, y: 300, id: 58, color: "blue" },
      { x: 850, y: 300, id: 59, color: "blue" },
      { x: 900, y: 300, id: 60, color: "blue" },
      { x: 950, y: 300, id: 61, color: "blue" },
      { x: 1000, y: 300, id: 62, color: "blue" },
      { x: 0, y: 450, id: 63, color: "blue" },
      { x: 50, y: 450, id: 64, color: "blue" },
      { x: 100, y: 450, id: 65, color: "blue" },
      { x: 150, y: 450, id: 66, color: "blue" },
      { x: 200, y: 450, id: 67, color: "blue" },
      { x: 250, y: 450, id: 68, color: "blue" },
      { x: 300, y: 450, id: 69, color: "blue" },
      { x: 350, y: 450, id: 70, color: "blue" },
      { x: 400, y: 450, id: 71, color: "blue" },
      { x: 450, y: 450, id: 72, color: "blue" },
      { x: 500, y: 450, id: 73, color: "blue" },
      { x: 550, y: 450, id: 74, color: "blue" },
      { x: 600, y: 450, id: 75, color: "blue" },
      { x: 650, y: 450, id: 76, color: "blue" },
      { x: 700, y: 450, id: 77, color: "blue" },
      { x: 750, y: 450, id: 78, color: "blue" },
      { x: 800, y: 450, id: 79, color: "blue" },
      { x: 850, y: 450, id: 80, color: "blue" },
      { x: 900, y: 450, id: 81, color: "blue" },
      { x: 950, y: 450, id: 82, color: "blue" },
      { x: 1000, y: 450, id: 83, color: "blue" },
    ],
    tempLayout: [],
  }),
  methods: {
    registerSvgPanZoom(spz) {
      this.mainSPZ = spz;
    },
    pick(id) {
      var pinObj = document.getElementById(id);
      pinObj.style.fill = "green";
    },
    zoomin() {
      this.mainSPZ.zoomIn();
    },
    zoomout() {
      this.mainSPZ.zoomOut();
    },
    findByID() {
      this.initSPZ();
      let id = parseInt(this.pickID);
      let s = _.find(this.layout, ["id", id]);
      let size = this.mainSPZ.getPan();
      let dim = this.$el.getBoundingClientRect();
      var mainWidth = this.mainSPZ.getSizes().width;
      var mainHeight = this.mainSPZ.getSizes().height;
      let tempX = s.x - dim.left/4 - mainWidth / 2;
      let tempY = s.y - dim.top/4 - mainHeight / 2;
      let centerX = -tempX;
      let centerY = -tempY;
      this.pickText =
        id +
        "[pan]:" +
        JSON.stringify(size) +
        "[x]:" +
        s.x +
        "[y]:" +
        s.y +
        "[Center xy]:" +
        centerX +
        "," +
        centerY;
      this.mainSPZ.pan({ x: centerX, y: centerY });
    },
    initSPZ() {
      this.mainSPZ.zoom(4);
      this.mainSPZ.center();
    },
  },
};
</script>
<style>
</style>