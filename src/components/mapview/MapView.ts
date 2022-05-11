import { usePlacesStore } from "@/composables/usePlacesStore";
import Mapboxgl from "mapbox-gl";
import { defineComponent, onMounted, ref, watch } from "vue";
import { useMapStore } from "../../composables/useMapStore";

export default defineComponent({
  name: "MapView",
  setup() {
    const mapElement = ref<HTMLDivElement>();
    const { userLocations, isUserLocationReady } = usePlacesStore();
    const { map:mapa, setMap } = useMapStore();

    const initMap = async () => {
      if (!mapElement.value) throw new Error("Div elenent no existe");
      if (!userLocations.value) throw new Error("userLocations no existe");

      await Promise.resolve();

      const map = new Mapboxgl.Map({
        container: mapElement.value,
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: userLocations.value, // starting position [lng, lat]
        zoom: 15, // starting zoom
      });
      const myLocationPopup = new Mapboxgl.Popup()
        .setLngLat(userLocations.value)
        .setHTML(`<h4>Aqui estoy</h4> <p>Actualmente en el uval</p>`);
      const myLocationMarker = new Mapboxgl.Marker()
        .setLngLat(userLocations.value)
        .setPopup(myLocationPopup)
        .addTo(map);

      // establecer el mapa en vuex

      setMap(map);
    };

    onMounted(() => {
      if (isUserLocationReady.value) return initMap();
    });

    watch(isUserLocationReady, () => {
      if (isUserLocationReady.value) initMap();
    });

    return {
      isUserLocationReady,
      mapElement,
    };
  },
});
