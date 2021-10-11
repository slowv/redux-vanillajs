import html from "../../core.js";

export function CarItem({car}) {
    return html
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
}