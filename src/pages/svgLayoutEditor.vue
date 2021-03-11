<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="2">
            <v-text-field v-model="boxWidth" label="寬" required></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              v-model="boxHeight"
              label="長"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-text-field
              v-model="tempRownum"
              :rules="numRules"
              label="行數"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <v-text-field
              v-model="tempColnum"
              :rules="numRules"
              label="單行個數"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-btn @click="generated">生成</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-card>
      
      <svg width="100%" height="600" ref="draw">
        <g v-for="item in layout" :key="k"> 
            <rect
              :x="item.x"
              :y="item.y"
              :width="boxWidth"
              :height="boxHeight"
              :fill="item.color"
              style="stroke: pink; stroke-width: 5"
            />
          </g>
      </svg>
    </v-card>
    <v-card>
      <v-card-title>
        <v-btn @click="onSave">存檔</v-btn>
      </v-card-title>
      <v-card-text>
        {{ tempLayout }}
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    allnum: 12,
    colnum: 6,
    rownum: 2,
    tempColnum:0,
    tempRownum:0,
    boxHeight: 150,
    boxWidth: 50,
    layout: [],
    tempLayout: [],
    numRules: [(v) => !!v || "Name is required"],
  }),
  methods: {
    generated() {
      this.tempLayout = [];
      this.colnum = this.tempColnum;
      this.rownum = this.tempRownum;
      Object.assign(this.$refs.draw);
      for (var i = 0; i < this.rownum; i++) {
        for (var j = 0; j < this.colnum; j++) {
          this.tempLayout.push({
            x: j * this.boxWidth,
            y: i * this.boxHeight,
            id: (this.colnum * i) + j,
            color:"blue"
          });
        }
      }

      this.layoutBeforeMountEvent();
    },
    layoutBeforeMountEvent() {
      this.layout = this.tempLayout;
    },
    onSave() {
      var fs = require("file-system");
      let data = JSON.stringify(this.layout);
      try {
        fs.writeFileSync("layout.json", data);
        alert("存檔");
      } catch (e) {
        alert(e);
      }
    },
  },
  mounted() {

  },
};
</script>
<style>
.grid {
  background: #fa0;
}
</style>