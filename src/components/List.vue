<template>
  <ol class="list">
    <list-item
      v-for="item in data"
      :key="item.id"
      :id="item.id"
      :name="item.name"
      :img-src="item.image_url"
      :description="item.description"
      :tips="item.brewers_tips"
      :edit="openModal"
      :remove="removeItem"
    />
  </ol>
</template>

<script>
import ListItem from "@/components/ListItem.vue";
export default {
  name: "List",
  components: { ListItem },
  props: {
    data: {
      type: Array,
      required: true
    },
    openModal: {
      type: Function,
      required: true
    },
    removeItem: {
      type: Function,
      required: true
    }
  }
};
</script>

<style scoped></style>
