<template>
  <div
    ref="modal"
    class="dialog-container"
    id="my-accessible-dialog"
    aria-hidden="true"
  >
    <div tabindex="-1" data-a11y-dialog-hide></div>
    <dialog aria-labelledby="dialog-title">
      <h1 id="dialog-title" class="visually-hidden">
        Edit item name and description
      </h1>

      <div @click.self="handleClose" class="wrap">
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
            <button class="modal__btn-save" type="submit">
              save
            </button>
            <button @click="handleClose" class="modal__btn-close" type="button">
              close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  </div>
</template>

<script>
import A11yDialog from "a11y-dialog";

export default {
  name: "ModalEdit",
  data() {
    return {
      dialog: undefined,
      name: "",
      description: ""
    };
  },
  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    id: Number,
    modalName: {
      type: String,
      default: ""
    },
    modalDescription: {
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
    modalName(val, prevVal) {
      if (val !== prevVal) {
        this.name = val;
      }
    },
    modalDescription(val, prevVal) {
      if (val !== prevVal) {
        this.description = val;
      }
    },
    isShow(val) {
      if (this.dialog) {
        if (val) {
          this.dialog.show();
        } else {
          this.dialog.hide();
        }
      }
    }
  },

  methods: {
    handleFocus(e) {
      e.currentTarget.select();
    },

    handleSubmit() {
      this.changeItem(this.id, this.name, this.description);
      this.dialog.hide();
    },

    handleClose() {
      this.dialog && this.dialog.hide();
    }
  },

  mounted() {
    this.dialog = new A11yDialog(this.$refs.modal);

    this.dialog.on("hide", () => {
      this.closeModal();
    });
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

/** a11y-dialog **/
[data-a11y-dialog-native] > :first-child {
  display: none;
}

dialog[open] {
  display: block;
}

.dialog-container[aria-hidden="true"] {
  display: none;
}
</style>
