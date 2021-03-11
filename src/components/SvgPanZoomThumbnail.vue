<template>
  <div >
    <SPZ class="thumbnail"
      :mouseWheelZoomEnabled="false"
      :zoomEnabled="false"
      :panEnabled="true"
      :controlIconsEnabled="false"
      :dblClickZoomEnabled="false"
      :preventMouseEventsDefault="true"
      v-on:svgpanzoom="thumbnailSPZcreated" 
    >
      <slot class="thumbnail" />
    </SPZ>
    <Scope :bus="bus" :mainSPZ="mainSPZ" :thumbnailSPZ="thumbnailSPZ" />
  </div>
</template>

<style>
  .thumbView {
    z-index: 110;
    background: white;
  }

  .thumbnail {
    position: absolute;
    top: 377px;
    left: -4px;
    width: 100%;
    height: 300px;
    margin: 3px;
    padding: 20px;
    overflow: hidden;
    z-index: 120;
  }

  .thumbnail svg {
    width: 100% !important;
    height: 100% !important;
  }
</style>

<script>
import Scope from './Scope.vue';
import SPZ from "vue-svg-pan-zoom";

export default {
  components: { SPZ,Scope },
  props: [ 'onThumbnailShown', 'mainSPZ', 'bus' ],
  data: () => ({ thumbnailSPZ: null }),
  // beforeCreate: function () {
  //   this.$options.components.SPZ = require('./SvgPanZoom.vue').default
  // },
  methods: {
    // zoomMain(event) {
    //   this.mainSPZ[ event.deltaY < 0 ? 'zoomIn' : 'zoomOut' ]();
    // },
    thumbnailSPZcreated(tspz) {
      this.thumbnailSPZ = tspz;
      this.bus.$emit( 'thumbnailCreated', tspz );
    },
  },
  mounted() {
    if( this.onThumbnailShown ) {
      this.onThumbnailShown();
      this.bus.$emit( 'onThumbnailShown');
    }
  }
};
</script>
