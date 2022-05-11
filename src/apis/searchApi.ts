import axios from "axios";

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 3,
    language: "es",
    access_token:
      "pk.eyJ1Ijoid2FsdGhlcjE5OTEiLCJhIjoiY2wydDVmOHhiMDEwejNpcDI2ZGZ6dTNqZSJ9.n0QP6aREyIAaAEcbtfwWNA",
  },
});

export default searchApi;
