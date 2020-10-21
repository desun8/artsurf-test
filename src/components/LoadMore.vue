<template>
  <button :class="{ 'is-hidden': !hasMore }" @click="handleClick">
    Show next
  </button>
</template>

<script>
export default {
  name: "LoadMore",
  props: {
    fetchData: {
      type: Function,
      required: true
    },
    hasMore: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.fetchData();
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
