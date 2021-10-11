import html, {createUUID, toaster} from "../core.js";
import {connect, dispatch} from "../store/store.js";
import {ADD_CAR, REMOVE_CAR} from "../store/actions/car.action.js";
import {CarItem} from "./car/CarItem.js";
import {Header} from "../share/Header.js";

function App({cars}) {
    return html`
        ${Header()}
        <div class="container">
            <div class="row mt-3">
                <div class="col-6 offset-3">
                    <div class="form-group mb-4">
                        <label class="form-label">Car name:</label>
                        <input type="text" class="form-control" name="car" placeholder="Enter car...">
                        <small class="fst-italic text-danger msg-error"></small>
                    </div>

                    <ul class="list-group">
                        <li class="list-group-item active">List car</li>
                        ${cars.map(car => CarItem({car}))}
                    </ul>

                    <button class="btn btn-primary mt-5" type="button" id="btn-add-car">Add car</button>
                </div>
            </div>
        </div>
    `
}

export default connect()(App);