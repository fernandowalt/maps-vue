/** @format */

import { useStore } from "vuex";
import { computed } from "vue";
import { StateInterface } from "../store/index";
import Mapboxgl from "mapbox-gl";
import { Feature } from "../interfaces/places";
import { lngLat } from "@/store/map/actions";

export const useMapStore = () => {
	const store = useStore<StateInterface>();

	return {
		map: computed(() => store.state.map.map),
		distance: computed(() => store.state.map.distance),
		duration: computed(() => store.state.map.duration),

		//mutations
		setMap: (map: Mapboxgl.Map) => store.commit("map/setMap", map),
		setPlaceMarkers: (places: Feature[]) => store.commit("map/setPlaceMarkers", places),

		//actions
		getRouteBetweenPoints: (start: lngLat, end: lngLat) =>
			store.dispatch("map/getRouteBetweenPoints", { start, end }),
	};
};
