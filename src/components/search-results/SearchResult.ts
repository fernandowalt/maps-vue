/** @format */

import { defineComponent, ref, watch } from "vue";
import { usePlacesStore } from "../../composables/usePlacesStore";
import { Feature } from "../../interfaces/places";
import { useMapStore } from "../../composables/useMapStore";

export default defineComponent({
	name: "SearchResult",

	setup() {
		const { places, isLoadingPLaces, userLocations } = usePlacesStore();
		const { map, setPlaceMarkers, getRouteBetweenPoints } = useMapStore();
		const activePlace = ref("");

		watch(places, newPlaces => {
			activePlace.value = "";
			setPlaceMarkers(newPlaces);
		});

		return {
			places,
			isLoadingPLaces,
			activePlace,

			onPLacesClicked: (place: Feature) => {
				activePlace.value = place.id;
				const [lng, lat] = place.center;

				map.value?.flyTo({
					center: [lng, lat],
					zoom: 14,
				});
			},

			getRouteDirections: (place: Feature) => {
				if (!userLocations.value) return;

				const [lng, lat] = place.center;
				const [startLng, startLat] = userLocations.value;

				const start: [number, number] = [startLng, startLat];
				const end: [number, number] = [lng, lat];

				getRouteBetweenPoints(start, end);
			},
		};
	},
});
