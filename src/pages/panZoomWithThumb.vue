<template>
  <div style="height: 800px">


    <SvgPanZoom
      style="width: 100%; height: 300px; border: 1px solid black"
      @svgpanzoom="registerSvgPanZoom"
      :panEnabled="panState"
      :mouseWheelZoomEnabled="false"
    >
      <svg width="100%" height="300" id="svgElement">
        <g v-for="item in layout" :key="item.id">
          <rect
            :id="item.id"
            :x="item.x"
            :y="item.y"
            rx="8"
            ry="8"
            :width="boxWidth"
            :height="boxHeight"
            :fill="item.color"
            style="stroke: white; stroke-width: 5"
            @mousedown="pick(item.id)"
            @touchstart="pick(item.id)"
          />
          <text :x="item.x + 15" :y="item.y + 25" fill="white">
            {{ item.id }}
          </text>
          <circle
            :id="'c-' + item.id"
            :cx="item.x + 115"
            :cy="item.y + 25"
            r="10"
            :fill="item.color"
          />
        </g>
      </svg>
    </SvgPanZoom>
    <v-row
      ><v-btn @click="zoomin">zoom in</v-btn><v-spacer /><v-btn @click="zoomout"
        >zoom out</v-btn
      >
    </v-row>
    <SvgPanZoomThumbnail
      style="width: 100%; height: 300px; border: 1px solid black"
      :onThumbnailShown="onThumbnailShown"
      :mainSPZ="mainSPZ"
      :bus="bus"
    >
      <svg width="100%" height="300" id="thumbnail">
        <g v-for="item in layout" :key="item.id">
          <rect
            :id="item.id"
            :x="item.x"
            :y="item.y"
            :width="boxWidth"
            :height="boxHeight"
            :fill="[
              item.color == '#aaaaaa'
                ? '#aaa'
                : item.color == selType.color
                ? item.color
                : '#000',
            ]"
            style="stroke: #eee; stroke-width: 15"
          />
        </g>
      </svg>
    </SvgPanZoomThumbnail>
        <v-row>
      <v-col cols="6">
        <v-text-field label="Find by ID" v-model="pickID"></v-text-field
        ><v-btn @click="findByID()">send</v-btn>
      </v-col>
      <v-col cols="6">
        <v-select v-model="selType" :items="sowType" label="篩選">
          <template slot="selection" slot-scope="{ item }">
            <v-icon :color="item.color">●</v-icon> {{ item.typeName }}
          </template>
          <template slot="item" slot-scope="{ item }">
            <v-icon :color="item.color">●</v-icon> {{ item.typeName }}
          </template>
        </v-select>
      </v-col>
    </v-row>
    <p>{{ pickText }}</p>
  </div>
</template>
<script>
import SvgPanZoom from "vue-svg-pan-zoom";
import SvgPanZoomThumbnail from "../components/SvgPanZoomThumbnail";
import { EventBus } from "../components/EventBus";
export default {
  components: { SvgPanZoomThumbnail, SvgPanZoom },
  data: () => ({
    mainSPZ: null,
    bus: EventBus(),
    pickText: "none",
    panState: false,
    pickID: 0,
    allnum: 72,
    colnum: 18,
    rownum: 4,
    tempColnum: 0,
    tempRownum: 0,
    boxHeight: 50,
    boxWidth: 150,
    selType: { typeCode: "0", color: "#000000", typeName: "全部" },
    sowType: [
      { typeCode: "0", color: "#000000", typeName: "全部" },
      { typeCode: "1", color: "#FFADB7", typeName: "後備女豬" },
      { typeCode: "2", color: "#FFA866", typeName: "空懷母豬" },
      { typeCode: "3", color: "#A247FE", typeName: "已配種" },
      { typeCode: "4", color: "#FF4F65", typeName: "發情中" },
      { typeCode: "5", color: "#7FB2FE", typeName: "斷奶母豬" },
      { typeCode: "6", color: "#12D6AB", typeName: "誘情公豬" },
    ],
    layout: [
      { x: 0, y: 0, id: 0, color: "#FFADB7" },
      { x: 150, y: 0, id: 1, color: "#aaaaaa" },
      { x: 300, y: 0, id: 2, color: "#7FB2FE" },
      { x: 450, y: 0, id: 3, color: "#aaaaaa" },
      { x: 600, y: 0, id: 4, color: "#FFADB7" },
      { x: 750, y: 0, id: 5, color: "#aaaaaa" },
      { x: 900, y: 0, id: 6, color: "#aaaaaa" },
      { x: 1050, y: 0, id: 7, color: "#aaaaaa" },
      { x: 1200, y: 0, id: 8, color: "#aaaaaa" },
      { x: 1350, y: 0, id: 9, color: "#FFADB7" },
      { x: 1500, y: 0, id: 10, color: "#12D6AB" },
      { x: 1650, y: 0, id: 11, color: "#aaaaaa" },
      { x: 1800, y: 0, id: 12, color: "#aaaaaa" },
      { x: 1950, y: 0, id: 13, color: "#aaaaaa" },
      { x: 2100, y: 0, id: 14, color: "#7FB2FE" },
      { x: 2250, y: 0, id: 15, color: "#aaaaaa" },
      { x: 2400, y: 0, id: 16, color: "#aaaaaa" },
      { x: 2550, y: 0, id: 17, color: "#12D6AB" },
      { x: 0, y: 50, id: 18, color: "#aaaaaa" },
      { x: 150, y: 50, id: 19, color: "#aaaaaa" },
      { x: 300, y: 50, id: 20, color: "#aaaaaa" },
      { x: 450, y: 50, id: 21, color: "#aaaaaa" },
      { x: 600, y: 50, id: 22, color: "#aaaaaa" },
      { x: 750, y: 50, id: 23, color: "#aaaaaa" },
      { x: 900, y: 50, id: 24, color: "#aaaaaa" },
      { x: 1050, y: 50, id: 25, color: "#FFADB7" },
      { x: 1200, y: 50, id: 26, color: "#aaaaaa" },
      { x: 1350, y: 50, id: 27, color: "#aaaaaa" },
      { x: 1500, y: 50, id: 28, color: "#aaaaaa" },
      { x: 1650, y: 50, id: 29, color: "#aaaaaa" },
      { x: 1800, y: 50, id: 30, color: "#FF4F65" },
      { x: 1950, y: 50, id: 31, color: "#aaaaaa" },
      { x: 2100, y: 50, id: 32, color: "#aaaaaa" },
      { x: 2250, y: 50, id: 33, color: "#aaaaaa" },
      { x: 2400, y: 50, id: 34, color: "#12D6AB" },
      { x: 2550, y: 50, id: 35, color: "#aaaaaa" },
      { x: 0, y: 100, id: 36, color: "#aaaaaa" },
      { x: 150, y: 100, id: 37, color: "#aaaaaa" },
      { x: 300, y: 100, id: 38, color: "#aaaaaa" },
      { x: 450, y: 100, id: 39, color: "#aaaaaa" },
      { x: 600, y: 100, id: 40, color: "#FFA866" },
      { x: 750, y: 100, id: 41, color: "#aaaaaa" },
      { x: 900, y: 100, id: 42, color: "#aaaaaa" },
      { x: 1050, y: 100, id: 43, color: "#aaaaaa" },
      { x: 1200, y: 100, id: 44, color: "#FFA866" },
      { x: 1350, y: 100, id: 45, color: "#aaaaaa" },
      { x: 1500, y: 100, id: 46, color: "#FFA866" },
      { x: 1650, y: 100, id: 47, color: "#FFA866" },
      { x: 1800, y: 100, id: 48, color: "#aaaaaa" },
      { x: 1950, y: 100, id: 49, color: "#aaaaaa" },
      { x: 2100, y: 100, id: 50, color: "#aaaaaa" },
      { x: 2250, y: 100, id: 51, color: "#aaaaaa" },
      { x: 2400, y: 100, id: 52, color: "#aaaaaa" },
      { x: 2550, y: 100, id: 53, color: "#aaaaaa" },
      { x: 0, y: 150, id: 54, color: "#aaaaaa" },
      { x: 150, y: 150, id: 55, color: "#aaaaaa" },
      { x: 300, y: 150, id: 56, color: "#aaaaaa" },
      { x: 450, y: 150, id: 57, color: "#aaaaaa" },
      { x: 600, y: 150, id: 58, color: "#FFA866" },
      { x: 750, y: 150, id: 59, color: "#aaaaaa" },
      { x: 900, y: 150, id: 60, color: "#aaaaaa" },
      { x: 1050, y: 150, id: 61, color: "#FF4F65" },
      { x: 1200, y: 150, id: 62, color: "#FF4F65" },
      { x: 1350, y: 150, id: 63, color: "#aaaaaa" },
      { x: 1500, y: 150, id: 64, color: "#aaaaaa" },
      { x: 1650, y: 150, id: 65, color: "#aaaaaa" },
      { x: 1800, y: 150, id: 66, color: "#aaaaaa" },
      { x: 1950, y: 150, id: 67, color: "#A247FE" },
      { x: 2100, y: 150, id: 68, color: "#A247FE" },
      { x: 2250, y: 150, id: 69, color: "#A247FE" },
      { x: 2400, y: 150, id: 70, color: "#aaaaaa" },
      { x: 2550, y: 150, id: 71, color: "#aaaaaa" },
    ],
    tempLayout: [],
  }),
  methods: {
    registerSvgPanZoom(spz) {
      this.mainSPZ = spz;
      this.mainSPZ.zoom(4);
    },
    pick(id) {
      if (this.panState == false) {
        var pinObj = document.getElementById("c-" + id);
        pinObj.style.fill = "white";
      }
    },
    zoomin() {
      this.mainSPZ.zoomIn();
      this.bus.$emit("mainZoom");
    },
    zoomout() {
      this.mainSPZ.zoomOut();
      this.bus.$emit("mainZoom");
    },
    updatedPan() {
      var val = this.mainSPZ.getPan();
      this.bus.$emit("mainPan", val);
    },
    onThumbnailShown() {
      console.log("thumbnailCreated");
    },
    findByID() {
      let id = parseInt(this.pickID);
      let s = _.find(this.layout, ["id", id]);

      let mainWidth = this.mainSPZ.getSizes().width,
        mainHeight = this.mainSPZ.getSizes().height,
        mainZoom = this.mainSPZ.getSizes().realZoom;

      var svgElement = document.querySelector("#svgElement");
      let dim = svgElement.getBoundingClientRect();

      let tempX =
        s.x * mainZoom - dim.left * mainZoom - (mainWidth / 2) * mainZoom;
      let tempY =
        s.y * mainZoom -
        dim.top * mainZoom -
        (mainHeight / 2) * mainZoom +
        100 * mainZoom;
      let centerX = -tempX;
      let centerY = -tempY;

      this.pickText =
        "[id]" +
        id +
        "[Zoom]" +
        mainZoom +
        "[dim]:" +
        dim.left +
        "," +
        dim.top +
        "[x]:" +
        s.x +
        "[y]:" +
        s.y +
        "[Center xy]:" +
        centerX +
        "," +
        centerY;

      this.mainSPZ.pan({ x: centerX, y: centerY });
      this.bus.$emit("mainPan", { x: s.x, y: s.y });
    },
    initSPZ() {
      this.mainSPZ.resetZoom();
    },
  },
  mounted: () => {
    
    this.mainSPZ.onPan = (...args) => {
      this.bus.$emit("mainPan");
      if (this.onPan) this.onPan(args);
    };

    this.$emit("svgpanzoom", this.mainSPZ);
  },
};
</script>
<style>
</style>