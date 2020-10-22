<template>
  <transition name="fade">
    <div @click.self="handleClick" class="wrap">
      <form @submit.prevent="handleSubmit" class="modal">
        <div class="modal__field">
          <label for="name">Name:</label>
          <input
            :value="name"
            @input="handleInput"
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
            :value="description"
            @input="handleInput"
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
import { mapState } from "vuex";
import { EDIT_ITEM, SET_MODAL_DATA, TOGGLE_MODAL } from "@/store/types";

export default {
  name: "ModalEdit",
  computed: {
    ...mapState({
      id: state => state.modalData.id,
      name: state => state.modalData.name,
      description: state => state.modalData.description
    })
  },

  methods: {
    closeModal() {
      this.$store.dispatch(TOGGLE_MODAL, false);
    },

    handleFocus(e) {
      e.currentTarget.select();
    },

    handleSubmit() {
      const { id, name, description } = this;

      this.$store.dispatch(EDIT_ITEM, { id, name, description });
      this.closeModal();
    },

    handleClick() {
      this.closeModal();
    },

    handleInput(e) {
      const name = e.target.name;
      this.$store.commit(SET_MODAL_DATA, { [name]: e.target.value });
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
