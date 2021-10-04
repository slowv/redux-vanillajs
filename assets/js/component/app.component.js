import html, {createUUID, toaster} from "../core.js";
import {connect, dispatch} from "../store/store.js";
import {ADD_CAR, REMOVE_CAR} from "../store/actions/car.action.js";

// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);
let isEditing = false;

const connector = connect();

function App({cars}) {
    const $root = $('#root');
    function Car(name) {
        return {
            id: createUUID(),
            name
        }
    }

    const addCar = (isUpdate) => {
        let input = $('input[name="car"]');
        if (isUpdate) {
            input = $('input[name="car-update"]');
        }
        const msgError = input.next();
        const val = input.val();
        if (val && val.length > 0) {
            dispatch(ADD_CAR, new Car(val));
            msgError.text('');
            toaster('Add Car', 'Add to list successfully!');
        } else {
            msgError.text('Input car invalid!');
            msgError.text('');
        }
    };

    // Add event click for btn add car
    $root.on('click', '#btn-add-car', function() {
        addCar();
    });

    // Add event keyup for input car
    $root.on('keyup', 'input[name="car"]', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            addCar();
        }
    })

    // Add event click for btn remove car
    $root.on('click', '.btn-remove-car', function() {
        const id = $(this).attr('id');
        dispatch(REMOVE_CAR, id);
    });

    // Add event click update item car
    $root.on('click', '.list-group-item', function() {
       const boxInputUpdate = $(this).children().first();
       boxInputUpdate.removeClass('d-none');
       boxInputUpdate.next().addClass('d-none');
    });

    // Add event click for btn

    return html`
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
                        ${cars.map(car => 
                                `<li class="list-group-item">
                                    <div class="input-group d-none">
                                        <input type="text" class="form-control " name="car-update" value="${car.name}">
                                        <span class="input-group-text" id="${car.id}">
                                            <i class="fas fa-times text-danger mx-1" id="btn-close-edit"></i>
                                            <i class="fas fa-check text-success mx-1" id="btn-update"></i>
                                        </span>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        ${car.name} <span class="text-danger btn-remove-car" id="${car.id}"> <i class="fas fa-trash-alt"></i></span>
                                    </div>
                                </li>`
                        )}
                    </ul>

                    <button class="btn btn-primary mt-5" type="button" id="btn-add-car">Add car</button>
                </div>
            </div>
        </div>
    `
}

export default connector(App);