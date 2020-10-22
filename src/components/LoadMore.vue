<template>
  <button :class="{ 'is-hidden': isHidden }" @click="handleClick">
    {{ isLoading ? "Loading" : "Show next" }}
  </button>
</template>

<script>
import { FETCH_DATA } from "@/store/types";

export default {
  name: "LoadMore",
  computed: {
    isHidden() {
      return !this.$store.state.hasMore;
    },
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  methods: {
    handleClick() {
      this.$store.dispatch(FETCH_DATA);
    }
  }
};
</script>

<style scoped>
button {
  display: block;
  margin: 0 auto;
  font-size: 18px;
  padding: 0.5em;
  overflow-anchor: none;
}

.is-hidden {
  opacity: 0;
  visibility: hidden;
}
</style>
