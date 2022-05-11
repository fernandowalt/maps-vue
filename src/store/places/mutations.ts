import { Feature } from "@/interfaces/places";
import { MutationTree } from "vuex";
import { PlaceState } from "./state";

const mutation: MutationTree<PlaceState> = {
  setLngLat(state: PlaceState, { lng, lat }: { lng: number; lat: number }) {
    console.log(lng, lat);

    state.userLocation = [lng, lat];
    state.isLoading = false;
  },

  setPlaces(state, places: Feature[]) {
    state.places = places;
  },
  setIsLoadinPLaces(state) {
    state.isLoadingPlaces = true;
    state.isLoadingPlaces=false
  },
};

export default mutation;
