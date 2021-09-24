import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productList: {
      isList: false,
      sorting: "",
      filters: {
        size: undefined,
        priceFrom: undefined,
        priceTo: undefined,
      },
    },
  },
  mutations: {
    toggleView(state) {
      state.productList.isList = !state.productList.isList;
    },
    setSorting(state, payload) {
      state.productList.sorting = payload;
    },
    setFilters(state, payload) {
      state.productList.filters[payload.name] = payload.value;
    },
  },
  actions: {
    toggleView(context) {
      context.commit("toggleView");
    },
    setSorting(context, payload) {
      context.commit("setSorting", payload);
    },
    setFilters(context, payload) {
      context.commit("setFilters", payload);
    },
  },
});
