<template>
  <li class="item">
    <div class="item__wrap">
      <div class="item__header">
        <h2 class="item__name">{{ name }}</h2>

        <div class="item__btn-group">
          <button
            @click="handleEdit"
            class="item__btn item__btn--edit"
            :aria-label="`Edit ${name} item`"
          >
            edit
          </button>
          <button
            @click="handleRemove"
            class="item__btn item__btn--remove"
            :aria-label="`Remove ${name} item`"
          >
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
      <div class="item__describe">
        <h3 class="visually-hidden">Description</h3>
        <p>{{ description }}</p>
      </div>
      <div class="item__tips">
        <h3 class="visually-hidden">Brewers tips</h3>
        <p>{{ tips }}</p>
      </div>
    </div>
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
  word-break: break-word;
}

.item__btn-group {
  flex-shrink: 0;
  margin-left: 15px;
}

.item__btn:last-child {
  margin-left: 10px;
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

@media screen and (min-width: 32em) {
  .item__wrap {
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    grid-template-areas:
      "header header"
      "img desc"
      "img tips";

    justify-content: center;
    margin-bottom: 50px;
  }

  .item__header {
    grid-area: header;
  }

  .item__img {
    grid-area: img;
    align-self: center;
  }

  .item__describe {
    grid-area: desc;
  }

  .item__tips {
    grid-area: tips;
  }
}
</style>
