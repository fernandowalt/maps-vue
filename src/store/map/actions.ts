/** @format */

import { ActionTree } from "vuex";
import { MapState } from "./state";
import { StateInterface } from "../index";
import directionsApi from "../../apis/directionsApi";
import { DirectionsResponse } from "../../interfaces/directions";

export type lngLat = [number, number];

const actions: ActionTree<MapState, StateInterface> = {
	async getRouteBetweenPoints({ commit }, { start, end }: { start: lngLat; end: lngLat }) {
		const resp = await directionsApi.get<DirectionsResponse>(
			`/${start.join(",")};${end.join(",")}`
		);

		console.log(resp.data.routes[0].geometry.coordinates);

		commit("setRoutePolyline", resp.data.routes[0].geometry.coordinates);
	},
};

export default actions;
