import {ADD_CAR, REMOVE_CAR} from "../actions/car.action.js";
import {createUUID} from "../../core.js";

const init = {
    cars: [
        {
            id: createUUID(),
            name: 'Hyundai'
        },
        {
            id: createUUID(),
            name: 'Chevrolet'
        }
    ]
}

export default function carReducer(state = init, action, args) {
    switch (action) {
        case ADD_CAR:
            const [newCar] = args;
            return {
                ...state,
                cars: [...state.cars, newCar]
            };
        case REMOVE_CAR:
            return {
                ...state,
                cars: state.cars.filter(car => car.id !== args[0])
            };
        default:
            return state;
    }
}