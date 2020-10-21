<template>
  <transition name="fade">
    <div @click.self="handleClick" class="wrap">
      <form @submit.prevent="handleSubmit" class="modal">
        <div class="modal__field">
          <label for="name">Name:</label>
          <input
            v-model="name"
            @focus="handleFocus"
            id="name"
            name="name"
            type="text"
            class="modal__name"
          />
        </div>

        <div class="modal__field">
          <label for="description">Description:</label>
          <textarea
            v-model="description"
            @focus="handleFocus"
            id="description"
            class="modal__description"
            name="description"
            cols="30"
            rows="10"
          ></textarea>
        </div>

        <div class="modal__field  modal__field--col-2">
          <button class="modal__btn-save" type="submit">save</button>
          <button @click="closeModal" class="modal__btn-close" type="button">
            close
          </button>
        </div>
      </form>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalEdit",
  data() {
    return {
      name: "",
      description: ""
    };
  },
  props: {
    id: Number,
    defName: {
      type: String,
      default: ""
    },
    defDescription: {
      type: String,
      default: ""
    },
    changeItem: {
      type: Function,
      required: true
    },
    closeModal: {
      type: Function,
      required: true
    }
  },

  watch: {
    defName(val, prevVal) {
      if (val !== prevVal) {
        this.name = val;
      }
    },
    defDescription(val, prevVal) {
      if (val !== prevVal) {
        this.description = val;
      }
    }
  },

  methods: {
    handleFocus(e) {
      e.currentTarget.select();
    },

    handleSubmit() {
      this.changeItem(this.id, this.name, this.description);
      this.closeModal();
    },

    handleClick() {
      this.closeModal();
    }
  }
};
</script>

<style scoped>
input,
textarea,
label,
button {
  font-family: inherit;
  font-size: inherit;
}

.wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
}

.modal {
  display: grid;
  gap: 0.5em;

  padding: 1.2em;
  background-color: #f9f9f9;
  font-size: 1em;
  border-radius: 10px;
}

.modal__field {
  --col: 1;

  display: grid;
  grid-template-columns: repeat(var(--col), 1fr);
  gap: 0.2em;
}

.modal__field--col-2 {
  --col: 2;

  column-gap: 1rem;
}

.modal__description {
  resize: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
