// material icons
import '@mdi/font/css/materialdesignicons.css';

import Vue from 'vue';

// A-la-carte installation
// import Vuetify from 'vuetify/lib';

// Full installation
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';


Vue.use(Vuetify);

var options = ß.VUETIFY || {};

/*

options = {
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: '#FF0000',
        secondary: '#00FF00',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
  }
}

*/

// added for vuetify 2.0.7
export default new Vuetify(options);