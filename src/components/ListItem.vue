<template>
  <li class="item">
    <div class="item__wrap">
      <div class="item__header">
        <h2 class="item__name">{{ name }}</h2>

        <div class="item__btn-group">
          <button @click="handleOpen" class="item__btn item__btn--edit">
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
    </div>
  </li>
</template>

<script>
import { REMOVE_ITEM, SET_MODAL_DATA, TOGGLE_MODAL } from "@/store/types";

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
    }
  },
  methods: {
    handleOpen() {
      const { id, name, description } = this;

      this.$store.dispatch(TOGGLE_MODAL, true);
      this.$store.dispatch(SET_MODAL_DATA, { id, name, description });
    },

    handleRemove() {
      this.$store.dispatch(REMOVE_ITEM, this.id);
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
