import Vuex from 'vuex'

import shopping from './modules/shopping';


const debug = process.env.NODE_ENV !== 'production'


export default new Vuex.Store({
    /**
     * Assign the modules to the store.
     */
    modules: {
      shopping
    },
  
    /**
     * If strict mode should be enabled.
     */
    strict: debug
  });
  