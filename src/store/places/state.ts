import { Feature } from "../../interfaces/places";
export interface PlaceState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}

function state(): PlaceState {
  return {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: [],
  };
}

export default state;
