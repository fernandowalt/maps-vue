import { defineComponent, ref, computed } from "vue";
import SearchResult from "@/components/search-results/SearchResult.vue";
import { usePlacesStore } from "../../composables/usePlacesStore";

export default defineComponent({
  name: "SearchBar",
  components: {
    SearchResult,
  },

  setup() {
    const debouncedTimeout = ref();
    const debouncedValue = ref("hola");
    const {searchPlacesByTerm} = usePlacesStore();

    return {
      debouncedValue,

      searchTerm: computed({
        get(): string {
          return debouncedValue.value;
        },

        set(val: string) {
          if (debouncedTimeout.value) clearTimeout(debouncedTimeout.value);

          debouncedTimeout.value = setTimeout(() => {
            searchPlacesByTerm(val)
          }, 500);
        },
      }),
    };
  },
});
