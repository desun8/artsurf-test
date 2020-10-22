import { createStore } from "vuex";
import axios from "axios";
import {
  EDIT_ITEM,
  FETCH_DATA,
  INCREASE_PAGE,
  REMOVE_ITEM,
  SET_BEER_LIST,
  SET_FETCH_ERROR,
  SET_HAS_MORE,
  SET_LOADING,
  SET_MODAL_DATA,
  TOGGLE_MODAL
} from "./types";

export default createStore({
  state: {
    beerList: undefined,
    page: 1,
    isLoading: false,
    hasMore: true,
    fetchError: false,

    shouldModalShow: false,
    modalData: {
      id: undefined,
      name: "",
      description: ""
    }
  },

  mutations: {
    [SET_BEER_LIST](state, payload) {
      state.beerList =
        state.beerList === undefined
          ? payload
          : [...state.beerList, ...payload];
    },
    [INCREASE_PAGE](state) {
      state.page += 1;
    },
    [SET_HAS_MORE](state, payload) {
      state.hasMore = payload;
    },
    [SET_LOADING](state, payload) {
      state.isLoading = payload;
    },
    [SET_FETCH_ERROR](state) {
      state.fetchError = true;
    },
    [EDIT_ITEM](state, payload) {
      const { id, name, description } = payload;
      state.beerList = state.beerList.map(el => {
        if (el.id === id) {
          return { ...el, name, description };
        }

        return el;
      });
    },
    [REMOVE_ITEM](state, payload) {
      state.beerList = state.beerList.filter(el => el.id !== payload);
    },

    [TOGGLE_MODAL](state, payload) {
      state.shouldModalShow = payload;
    },
    [SET_MODAL_DATA](state, payload) {
      state.modalData = { ...state.modalData, ...payload };
    }
  },
  actions: {
    async [FETCH_DATA]({ state, commit }) {
      try {
        if (!state.isLoading) {
          commit(SET_LOADING, true);

          const res = await axios.get(
            `https://api.punkapi.com/v2/beers?page=${state.page}&limit=25`
          );
          const data = await res.data;

          if (data.length) {
            commit(SET_BEER_LIST, data);
            commit(INCREASE_PAGE);
          } else {
            commit(SET_HAS_MORE, false);
          }
        }
      } catch (e) {
        console.error("vuex -> actions -> fetchData() -> ", e);
        commit(SET_FETCH_ERROR);
      } finally {
        commit(SET_LOADING, false);
      }
    },

    [EDIT_ITEM]({ commit }, itemData) {
      commit(EDIT_ITEM, itemData);
    },
    [REMOVE_ITEM]({ commit }, id) {
      commit(REMOVE_ITEM, id);
    },

    [TOGGLE_MODAL]({ commit }, isShow) {
      commit(TOGGLE_MODAL, isShow);
    },
    [SET_MODAL_DATA]({ commit }, itemData) {
      commit(SET_MODAL_DATA, itemData);
    }
  }
});
