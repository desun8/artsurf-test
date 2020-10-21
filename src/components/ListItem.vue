<template>
  <li class="item">
    <div class="item__header">
      <h2 class="item__name">{{ name }}</h2>

      <div class="item__btn-group">
        <button @click="handleEdit" class="item__btn item__btn--edit">
          edit
        </button>
        <button @click="handleRemove" class="item__btn item__btn--remove">
          remove
        </button>
      </div>
    </div>
    <img
      v-if="imgSrc"
      :src="imgSrc"
      :alt="name"
      class="item__img"
      width="200"
      height="200"
      loading="lazy"
    />
    <p class="item__describe">{{ description }}</p>
    <p class="item__tips">{{ tips }}</p>
  </li>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    imgSrc: [String, null],
    description: {
      type: String,
      required: true
    },
    tips: {
      type: String,
      required: true
    },
    edit: {
      type: Function,
      required: true
    },
    remove: {
      type: Function,
      required: true
    }
  },
  methods: {
    handleEdit() {
      this.edit(this.id, this.name, this.description);
    },
    handleRemove() {
      this.remove(this.id);
    }
  }
};
</script>

<style scoped>
.item__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.item__name {
  margin: 0;
}

.item__btn-group {
  flex-shrink: 0;
  margin-left: 15px;
}

.item__img {
  display: block;
  margin: 0 auto;
  object-fit: contain;
}

.item__tips {
  font-size: 0.9em;
  font-style: italic;
}
</style>
