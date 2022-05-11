<template>
  <MapView />
  <SearchBarVue/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePlacesStore } from "../composables/usePlacesStore";
import MapView from "@/components/mapview/MapView.vue";
import SearchBarVue from "@/components/searchbar/SearchBar.vue";

export default defineComponent({
  name: "HomeView",

  components: { MapView, SearchBarVue },

  setup() {
    usePlacesStore();

    return {};
  },
});
</script>
