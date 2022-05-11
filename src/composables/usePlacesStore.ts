import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { StateInterface } from "@/store/index";

export const usePlacesStore = () => {
  const store = useStore<StateInterface>();

  onMounted(() => {
    if (!store.getters["places/isUserLocationReady"]) {
      store.dispatch("places/getInitialLocation");
    }
  });

  return {
    //state
    isLoading: computed(() => store.state.places.isLoading),
    userLocations: computed(() => store.state.places.userLocation),
    places: computed(() => store.state.places.places),
    isLoadingPLaces:computed(()=>store.state.places.isLoadingPlaces),

    //getters

    isUserLocationReady: computed<boolean>(
      () => store.getters["places/isUserLocationReady"]
    ),
    searchPlacesByTerm: (query: string) =>
      store.dispatch("places/searchPlacesByTerm", query),
  };
};
