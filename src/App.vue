<template>
  <div v-if="beersList">
    <list :data="beersList" :openModal="openModal" :removeItem="removeItem" />
    <load-more :fetch-data="fetchData" :hasMore="hasMore" />
    <modal-edit
      v-show="shouldModalShow"
      :id="itemID"
      :def-name="itemName"
      :def-description="itemDescription"
      :change-item="changeItem"
      :close-modal="closeModal"
    />
  </div>
  <div v-else class="error">🤷🏻‍♂️</div>
</template>

<script>
import axios from "axios";
import List from "@/components/List.vue";
import LoadMore from "@/components/LoadMore.vue";
import ModalEdit from "@/components/ModalEdit.vue";

export default {
  name: "App",
  components: { ModalEdit, LoadMore, List },
  data() {
    return {
      beersList: undefined,
      page: 1,
      hasMore: true,
      isLoading: false,
      shouldModalShow: false,
      itemID: undefined,
      itemName: "",
      itemDescription: ""
    };
  },
  methods: {
    async fetchData() {
      try {
        if (this.isLoading === false) {
          this.isLoading = true;

          const res = await axios.get(
            `https://api.punkapi.com/v2/beers?page=${this.page}&limit=25`
          );
          const data = await res.data;

          if (data.length < 1) {
            this.hasMore = false;
          }

          if (this.hasMore) {
            if (this.beersList === undefined) {
              this.removePreloader();
              this.beersList = data;
            } else {
              this.beersList = [...this.beersList, ...data];
            }

            this.page += 1;
            this.isLoading = false;
          }
        }
      } catch (e) {
        console.error("App.vue -> fetchData() -> ", e);
        this.removePreloader();
      }
    },

    changeItem(id, name, description) {
      this.beersList = this.beersList.map(el => {
        if (el.id === id) {
          return { ...el, name, description };
        }

        return el;
      });
    },

    removeItem(id) {
      this.beersList = this.beersList.filter(el => el.id !== id);
    },

    openModal(id, name, description) {
      this.shouldModalShow = true;
      this.itemID = id;
      this.itemName = name;
      this.itemDescription = description;
    },

    closeModal() {
      this.shouldModalShow = false;
    },

    removePreloader() {
      document.querySelector("#preloader").style.display = "none";
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style lang="scss">
#app {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
</style>

<style scoped>
.error {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 5em;
}
</style>
