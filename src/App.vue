<template>
  <div v-if="beerList">
    <List :data="beerList" />

    <LoadMore />

    <ModalEdit v-show="shouldModalShow" />
  </div>
  <div v-if="fetchError" class="error">🤷🏻‍♂️</div>
</template>

<script>
import List from "@/components/List.vue";
import LoadMore from "@/components/LoadMore.vue";
import ModalEdit from "@/components/ModalEdit.vue";
import { FETCH_DATA } from "@/store/types";

export default {
  name: "App",
  components: { ModalEdit, LoadMore, List },
  computed: {
    beerList() {
      return this.$store.state.beerList;
    },

    shouldModalShow() {
      return this.$store.state.shouldModalShow;
    },

    fetchError() {
      return this.$store.state.fetchError;
    }
  },

  methods: {
    removePreloader() {
      document.querySelector("#preloader").style.display = "none";
    }
  },

  watch: {
    beerList(val) {
      if (val !== undefined || val?.length !== 0) {
        this.removePreloader();
      }
    }
  },

  mounted() {
    this.$store.dispatch(FETCH_DATA);
  }
};
</script>

<style lang="scss">
#app {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
</style>

<style scoped>
.error {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 5em;
}
</style>
