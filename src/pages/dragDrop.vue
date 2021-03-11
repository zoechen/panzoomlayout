<template>
  <div>
    <v-contain>
        <v-row>
          <v-col v-for="item in sowMap" :key="item.id" cols="12" md="2">
            <drop
              @dragover="handldOver"
              @drop="handleDrop(item.id)"
              v-if="item.state == '0'"
              ><div class="box drop">空{{ item.id }}</div></drop
            >
            <drag
              v-if="item.state == '1'"
              @drag="handleDrag(item.id)"
              @dragend="handleEnd"
              ><div class="box drag">🐷{{ item.epc }}</div></drag
            >
            <drop v-if="item.state == '2'"
              ><div class="box drop resv">預留{{ item.id }}</div></drop
            >
          </v-col>
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