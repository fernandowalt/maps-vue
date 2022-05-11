import { ActionTree } from "vuex";
import { PlaceState } from "./state";
import { StateInterface } from "../index";
import searchApi from "../../apis/searchApi";
import { Feature, PlacesResponse } from "@/interfaces/places";

const actions: ActionTree<PlaceState, StateInterface> = {
	getInitialLocation({ commit }) {
		navigator.geolocation.getCurrentPosition(
			({ coords }) =>
				commit("setLngLat", { lng: coords.longitude, lat: coords.latitude }),
			error => {
				console.error(error);
				throw new Error("no Goelocation :(");
			}
		);
	},

	async searchPlacesByTerm(
		{ commit, state },
		query: string
	): Promise<Feature[]> {
		if (query.length === 0) {
			commit("setPlaces", []);
			return [];
		}

		if (!state.userLocation) {
			throw new Error("No hay ubicacion del usuario");
		}
		commit("setIsLoadinPLaces");

		const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
			params: {
				proximity: state.userLocation?.join(","),
			},
		});
		commit("setPlaces", resp.data.features);

		return resp.data.features;
	},
};

export default actions;
