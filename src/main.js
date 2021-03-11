import Vue from 'vue';
import App from './App.vue';
import VueDragDrop from 'vue-drag-drop';
import vuetify from './plugins/vuetify';
import lodash from 'lodash';
import VueLodash from 'vue-lodash';
import VueStorage from '@seregpie/vue-storage';
import panZoom from 'vue-panzoom';
import VueKonva from 'vue-konva';

Vue.use(VueKonva);
Vue.use(panZoom);
Vue.use(VueDragDrop);
Vue.use(VueLodash, { lodash: lodash });
Vue.config.productionTip = false;
Vue.use(VueStorage, {
  prefix: 'moving-sow/',
});
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
