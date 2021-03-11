<template>
  <svg
    class="thumbViewClass"
    @mousemove="updateMainViewPan"
    @touchstart="updateMainViewPan"
  >
    <rect class="scope" :x="x" :y="y" :width="width" :height="height" />
  </svg>
</template>

<style>
.scope {
  fill: #e9ebf7;
  fill-opacity: 0.7;
}

svg.thumbViewClass {
  /* border: 1px solid black;*/
  position: absolute;
  top: 400px;
  width: 100%;
  height: 300px;
  overflow: hidden;
  z-index: 120;
}
</style>

<script>
function updateScope() {
  let main = this.mainSPZ;
  let thumb = this.thumbnailSPZ;

  if (!main || !thumb) return;

  let mainPanX = main.getPan().x,
    mainPanY = main.getPan().y,
    mainWidth = main.getSizes().width,
    mainHeight = main.getSizes().height,
    mainZoom = main.getSizes().realZoom,
    thumbPanX = thumb.getPan().x,
    thumbPanY = thumb.getPan().y,
    thumbZoom = thumb.getSizes().realZoom;

  let thumByMainZoomRatio = thumbZoom / mainZoom;

  let scopeX = thumbPanX - mainPanX * thumByMainZoomRatio;
  let scopeY = thumbPanY - mainPanY * thumByMainZoomRatio;
  let scopeWidth = mainWidth * thumByMainZoomRatio;
  let scopeHeight = mainHeight * thumByMainZoomRatio;

  this.x = scopeX + 1;
  this.y = scopeY + 1;
  this.width = scopeWidth - 2;
  this.height = scopeHeight - 2;
}

function updateMainViewPan(evt) {
  if (evt.which == 0 && evt.button == 0) {
    return false;
  }

  let main = this.mainSPZ;
  let thumb = this.thumbnailSPZ;
  let evtX = 0;
  let evtY = 0;

  let dim = this.$el.getBoundingClientRect(),
    mainWidth = main.getSizes().width,
    mainHeight = main.getSizes().height,
    mainZoom = main.getSizes().realZoom,
    thumbWidth = thumb.getSizes().width,
    thumbHeight = thumb.getSizes().height,
    thumbZoom = thumb.getSizes().realZoom;

  let thumByMainZoomRatio = thumbZoom / mainZoom;

  if (evt.type == "touchstart") {
    evtX = evt.touches[0].clientX + (this.width * thumByMainZoomRatio) / 2 - 40 ;
    evtY =
      evt.touches[0].clientY + (this.height * thumByMainZoomRatio) / 2 - 40;
  } else {
    evtX = evt.clientX;
    evtY = evt.clientY;
  }
  var thumbPanX =
    evtX -
    dim.left * thumByMainZoomRatio -
    (thumbWidth / 2) * thumByMainZoomRatio +
    25;
  var thumbPanY = evtY - dim.top - (thumbHeight / 2) * thumByMainZoomRatio - 77;
  var mainPanX = (-thumbPanX * mainZoom) / thumbZoom;
  var mainPanY = (-thumbPanY * mainZoom) / thumbZoom;
  main.pan({ x: mainPanX, y: mainPanY });

  updateScope.call(this);
}

export default {
  props: ["bus", "mainSPZ", "thumbnailSPZ"],
  data: () => ({ x: 0, y: 0, width: 0, height: 0 }),
  watch: {
    mainSPZ() {
      updateScope.call(this);
    },
    thumbnailSPZ() {
      updateScope.call(this);
    },
  },
  mounted() {
    const up = updateScope.bind(this);
    ["mainZoom", "mainPan", "thumbnailCreated"].forEach((event) =>
      this.bus.$on(event, up)
    );
    up();
  },
  methods: {
    updateMainViewPan,
    updateScope,
  },
};
</script>
