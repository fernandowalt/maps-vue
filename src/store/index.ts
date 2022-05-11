import { createStore } from "vuex";

// My custom modules
import { PlaceState } from "./places/state";
import mapModule from "./map/index";
import placesModule from "./places";
import { MapState } from "./map/state";

export interface StateInterface {
	places: PlaceState;
	map: MapState;
}

export default createStore<StateInterface>({
	modules: {
		places: placesModule,
		map: mapModule,
	},
});
