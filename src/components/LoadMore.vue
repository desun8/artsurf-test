<template>
  <button :class="{ 'is-hidden': !hasMore }" @click="handleClick" type="button">
    {{ isLoading ? "Loading" : "Show next" }}
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
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    getLastItem() {
      const items = Array.from(document.querySelectorAll(".list .item"));
      const lastIndex = items.length - 1;
      return items[lastIndex];
    },

    async handleClick() {
      // для скрин ридера
      // после "клика" возвращается фокус на последний элемент,
      // до вставки нового
      const lastItem = this.getLastItem();

      await this.fetchData();

      lastItem.tabIndex = 0;
      lastItem.focus();
      setTimeout(() => {
        lastItem.tabIndex = -1;
      }, 100);
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
