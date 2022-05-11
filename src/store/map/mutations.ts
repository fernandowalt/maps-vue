/** @format */

import { MutationTree } from "vuex";
import { MapState } from "./state";
import Mapboxgl from "mapbox-gl";
import { Feature } from "../../interfaces/places";

const mutation: MutationTree<MapState> = {
	setMap(state, map: Mapboxgl.Map) {
		state.map = map;
	},

	setPlaceMarkers(state, places: Feature[]) {
		//borraando markers
		state.marker.forEach(marker => marker.remove());
		state.marker = [];

		if (!state.map) return;
		//creando nuevos markers

		for (const place of places) {
			const [lng, lat] = place.center;

			const popup = new Mapboxgl.Popup()
				.setLngLat([lng, lat])
				.setHTML(`<h4>${place.text}</h4> <p>${place.place_name}</p>`);

			const marker = new Mapboxgl.Marker().setLngLat([lng, lat]).setPopup(popup).addTo(state.map);

			state.marker.push(marker);

			//clear polyline
			if (state.map.getLayer("RouteString")) {
				state.map.removeLayer("RouteString");
				state.map.removeSource("RouteString");
				state.distance = undefined;
				state.duration = undefined;
			}
		}
	},

	setRoutePolyline(state, coords: number[][]) {
		const start = coords[0];
		const end = coords[coords.length - 1];

		//definir los bounds

		const bounds = new Mapboxgl.LngLatBounds([start[0], start[1]], [end[0], end[1]]);

		//se agregan los puntos a seguien en la ruta

		for (const coord of coords) {
			const newCoords: [number, number] = [coord[0], coord[1]];
			bounds.extend(newCoords);
		}

		state.map?.fitBounds(bounds, { padding: 200 });
		//trasando la poluline
		const soucerData: Mapboxgl.AnySourceData = {
			type: "geojson",
			data: {
				type: "FeatureCollection",
				features: [
					{
						type: "Feature",
						properties: {},
						geometry: {
							type: "LineString",
							coordinates: coords,
						},
					},
				],
			},
		};
		if (state.map?.getLayer("RouteString")) {
			state.map?.removeLayer("RouteString");
			state.map?.removeSource("RouteString");
		}

		state.map?.addSource("RouteString", soucerData);

		state.map?.addLayer({
			id: "RouteString",
			type: "line",
			source: "RouteString",
			layout: {
				"line-cap": "round",
				"line-join": "round",
			},
			paint: {
				"line-color": "black",
				"line-width": 3,
			},
		});
	},
};

export default mutation;
