import {createStore} from "../core.js";
import reducer from "./reducers/car.reducer.js";

const {attach, connect, dispatch} = createStore(reducer);

export {
    attach,
    connect,
    dispatch
}