export interface MapState {
    prop: boolean;
}

function state(): MapState {
    return {
        prop: true,
    }
}

export default state;