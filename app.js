getData = localStorage.getItem('client') ? JSON.parse(localStorage.getItem('client')) : []

class Main {

    constructor() {
        this.form = document.getElementById('form');
        this.form.addEventListener("submit", this.createRecord.bind(this));
        this.form3 = document.getElementById('form3');
        this.form3.addEventListener("submit", this.editRecord.bind(this));

        this.tableData = document.getElementById('data');
        this.populateTable()
    }

    createRecord(e) {
        e.preventDefault();
        let name = document.getElementById('name').value;
        let surname = document.getElementById('surname').value;
        let id = document.getElementById('id').value;
        let phone = document.getElementById('phone').value;
        let address = document.getElementById('address').value;
        let photo = document.getElementById('photo').value;
        let color = document.getElementById('color').value;
        let brand = document.getElementById('brand').value;
        let model = document.getElementById('model').value;
        let year = document.getElementById('year').value;
        let plate = document.getElementById('plate').value;

        console.log(name, surname, id, phone, address, photo, color, brand, model, year, plate)
        let record = new Record(name, surname, id, address, phone, brand, model, color, year, plate, photo)
        getData.push(record)
        localStorage.setItem('client', JSON.stringify(getData));

        document.getElementById('name').value = '';
        document.getElementById('surname').value = '';
        document.getElementById('id').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('address').value = '';
        document.getElementById('photo').value = '';
        document.getElementById('color').value = '#000000';
        document.getElementById('brand').value = '';
        document.getElementById('model').value = '';
        document.getElementById('year').value = '';
        document.getElementById('plate').value = '';
        document.getElementById('img').src = 'img/coche.png'
        this.populateTable()
    }

    editRecord(record, e) {
        e.preventDefault();
        let name = document.getElementById('edit_name').value;
        let surname = document.getElementById('edit_surname').value;
        let id = document.getElementById('edit_id').value;
        let phone = document.getElementById('edit_phone').value;
        let address = document.getElementById('edit_address').value;
        let photo = document.getElementById('edit_photo').value;
        let color = document.getElementById('edit_color').value;
        let brand = document.getElementById('edit_brand').value;
        let model = document.getElementById('edit_model').value;
        let year = document.getElementById('edit_year').value;
        let plate = document.getElementById('edit_plate').value;

        let clientData = localStorage.getItem('client');
        let data = JSON.parse(clientData);
        let object = data[record.id];

        object.name = name;
        object.surname = surname;
        object.idnum = id;
        object.tel = phone;
        object.address = address;
        object.pic = photo;
        object.color = color;
        object.marca = brand;
        object.modelo = model;
        object.year = year;
        object.placa = plate;
        localStorage.setItem('client', JSON.stringify(data));
        console.log(name, surname, id, phone, address, photo, color, brand, model, year, plate)
    }


    populateTable() {
        let index = 0;
        document.querySelectorAll('.clientDetails').forEach(info => info.remove())
        getData.forEach((element) => {
            let createElement = `<tr class="clientDetails">
        
        <td>${element.fullname}</td>
        <td>${element.idnum}</td>
        <td class="d-none d-sm-block"><img src="${element.pic}" alt="" width="50" height="50"></td>
        <td>${element.plate}</td>
        <td class="d-none d-sm-block">${element.color}</td>


        <td>
            <a
            class="btn btn-success"
            data-bs-toggle="modal"
            href="#readForm"
            role="button"
            id="readButton${index}"
            ><i class="bi bi-eye"></i></a>

            <a
            class="btn btn-primary"
            data-bs-toggle="modal"
            href="#editForm"
            role="button"
            id="editButton${index}"
            ><i class="bi bi-pencil-square"></i></a>

            <button class="btn btn-danger" onclick="deleteInfo(${element})"><i class="bi bi-trash"></i></button>
                        
        </td>
    </tr>`

            this.tableData.innerHTML += createElement;

            let read_id = "readButton" + index;
            let edit_id = "editButton" + index;
            index++;
            setTimeout(() => {
                let buttonRead = document.getElementById(read_id);
                buttonRead.addEventListener('click', () => this.readInfo(element));

                let buttonEdit = document.getElementById(edit_id);
                buttonEdit.addEventListener('click', () => this.editInfo(element));
            }, 0);
        })
    }

    retrieveFromLocalStorage() {
        let recordData = localStorage.getItem('client');
        let parsedData = JSON.parse(recordData);
        return parsedData.client
    }



    readInfo(record) {
        console.log(record)
        // document.querySelector('.showImg').src = pic,
        document.querySelector('#show_name').value = record.name,
            document.querySelector('#show_surname').value = record.surname,
            document.querySelector("#show_address").value = record.address,
            document.querySelector("#show_id").value = record.idnum,
            document.querySelector("#show_phone").value = record.tel,
            document.querySelector('#show_plate').value = record.plate,
            document.querySelector('#show_color').value = record.color,
            document.querySelector('#show_brand').innerHTML += `<option selected value="${record.brand}">${record.brand}</option>`,
            document.querySelector('#show_model').innerHTML = `<option selected value="${record.model}">${record.model}</option>`,
            document.querySelector('#show_year').value = record.year
    }

    editInfo(record) {
        console.log(record)
        // document.querySelector('.showImg').src = pic,
        document.querySelector('#edit_name').value = record.name,
            document.querySelector('#edit_surname').value = record.surname,
            document.querySelector("#edit_address").value = record.address,
            document.querySelector("#edit_id").value = record.idnum,
            document.querySelector("#edit_phone").value = record.tel,
            document.querySelector('#edit_plate').value = record.plate,
            document.querySelector('#edit_color').value = record.color,
            document.querySelector('#edit_brand').innerHTML += `<option selected value="${record.brand}">${record.brand}</option>`,
            document.querySelector('#edit_model').innerHTML = `<option selected value="${record.model}">${record.model}</option>`,
            document.querySelector('#edit_year').value = record.year
    }

    static deleteFromLocalStorage(id) {
        localStorage.removeItem(id);
    }

    static clearLocalStorage() {
        localStorage.clear();
    }
}

class Record {
    static index = 0;

    constructor(name, surname, idnum, address, tel, brand, model, color, year, plate, pic, id = Record.index++) {
        this.name = name;
        this.surname = surname;
        this.idnum = idnum;
        this.address = address;
        this.tel = tel;
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.year = year;
        this.plate = plate;
        this.pic = pic;
        this.id = id;
        this.fullname = this.name + " " + this.surname;
    }
}

let data = {
    cars: [
        {
            carBrand: "Chevrolet",
            carModels: ["Aveo", "Spark", "Cruze", "Silverado"]
        },
        {
            carBrand: "Chery",
            carModels: ["Tiggo", "QQ", "Arauca", "Orinoco"]
        },
        {
            carBrand: "Ford",
            carModels: ["Fiesta", "Focus", "Mustang", "Explorer"]
        },
        {
            carBrand: "Jeep",
            carModels: ["Grand Cherokee", "Wrangler"]
        },
        {
            carBrand: "Renault",
            carModels: ["Logan", "Clio"]
        },
        {
            carBrand: "Toyota",
            carModels: ["Corolla", "Hilux", "Fortuner", "Yaris"]
        }
    ]
};

window.onload = function () {
    let main = new Main();
    const selectBrand = document.getElementById("brand");
    const selectModel = document.getElementById("model");
    selectModel.disabled = true;

    function matchBrand(cars, e) {
        return cars.carBrand === e.target.value
    }

    //Add State Value to State Select option
    data.cars.forEach((value) => {
        selectBrand.appendChild(createOption(value.carBrand, value.carBrand));
    });

    selectBrand.addEventListener("change", function (e) {
        selectModel.disabled = false;
        index = data.cars.filter(car => matchBrand(car, e))
        index = index[0];
        selectModel.innerHTML = "";
        selectModel.append(createOption("Select Model", ""));
        index.carModels.forEach((model) => {
            selectModel.append(createOption(model, model));

        });
    });

    //Create New Option Tag With Value
    function createOption(displayMember, valueMember) {
        const newOption = document.createElement("option");
        newOption.value = valueMember;
        newOption.text = displayMember;
        return newOption;
    }
};