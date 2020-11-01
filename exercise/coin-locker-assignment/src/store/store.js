import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

let mongo_api = "http://localhost:5000/api";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    lockers: [],
    coins: [],
    bills: [],
  },

  mutations: {
    fetchLocker(state, { res }) {
      state.lockers = res.data;
    },
    fetchCoin(state, { res }) {
      state.coins = res.data;
    },
    fetchBill(state, { res }) {
      state.bills = res.data;
    },
    updateLocker(state, { payload }) {
      state.lockers[payload.index].status = payload.status;
      state.lockers[payload.index].startDateTime = payload.startDateTime;
    }
  },

  actions: {
    async fetchLocker({ commit }) {
      await axios.get(mongo_api + '/locker/')
        .then(res => commit("fetchLocker", { res }))
        .catch(err => alert(err));
    },
    async fetchCoin({ commit }) {
      await axios.get(mongo_api + '/coin/')
        .then(res => commit("fetchCoin", { res }))
        .catch(err => alert(err));
    },
    async fetchBill({ commit }) {
      await axios.get(mongo_api + '/bill/')
        .then(res => commit("fetchBill", { res }))
        .catch(err => alert(err));
    },
    async updateLocker({ commit }, payload) {
      await axios.put(mongo_api + '/locker/' + payload._id, payload)
      .then(() => commit("updateLocker", { payload }))
      .catch(err => alert(err));
    }
  },

  getters: {
    lockers: state => state.lockers,
    coins: state => state.coins,
    bills: state => state.bills,
  }
});