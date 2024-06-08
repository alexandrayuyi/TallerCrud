getData = localStorage.getItem('client') ? JSON.parse(localStorage.getItem('client')) : []
let editID;

class Main {

    constructor() {
        this.form = document.getElementById('form');
        this.form.addEventListener("submit", this.submitRecord.bind(this));
        this.form3 = document.getElementById('form3');
        this.form3.addEventListener("submit", this.editRecord.bind(this));

        this.tableData = document.getElementById('data');
        this.populateTable()
        console.log(editID);
        // localStorage.clear();
    }

    submitRecord(e) {
        let exists, exists2
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

        getData.forEach(record => {
            (record.idnum == id) ? exists = true : exists = false;
        });

        getData.forEach(record => {
            (record.plate === plate) ? exists2 = true : exists2 = false;
        });

        exists ? alert('El número de identificación ya existe') : (exists2) ? alert('La placa ya existe') : this.createRecord(name, surname, id, address, phone, brand, model, color, year, plate, photo);
    }

    createRecord(name, surname, id, address, phone, brand, model, color, year, plate, photo) {
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
        // document.getElementById('img').src = 'img/coche.png'
        this.populateTable()
    }



    editRecord(e) {
        e.preventDefault()
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

        // let clientData = localStorage.getItem('client');
        // let data = JSON.parse(clientData);
        // let object = data[editID];
        // console.log(object)

        getData.


            getData[editID].name = name;
        getData[editID].surname = surname;
        getData[editID].idnum = id;
        getData[editID].tel = phone;
        getData[editID].address = address;
        getData[editID].pic = photo;
        getData[editID].color = color;
        getData[editID].brand = brand;
        getData[editID].model = model;
        getData[editID].year = year;
        getData[editID].plate = plate;
        getData[editID].fullname = name + " " + surname;

        // object.name = name;
        // object.surname = surname;
        // object.idnum = id;
        // object.tel = phone;
        // object.address = address;
        // object.pic = photo;
        // object.color = color;
        // object.marca = brand;
        // object.modelo = model;
        // object.year = year;
        // object.placa = plate;

        localStorage.setItem('client', JSON.stringify(getData));

        // localStorage.setItem('client', JSON.stringify(data));
        // console.log(name, surname, id, phone, address, photo, color, brand, model, year, plate)
        this.populateTable()
    }

    deleteRecord(record) {
        editID = record.id;
        getData.splice(editID, 1);
        record.dreceaseIndex;
        localStorage.setItem('client', JSON.stringify(getData));
        this.populateTable()
    }


    populateTable() {
        getData = localStorage.getItem('client') ? JSON.parse(localStorage.getItem('client')) : []
        let index = 0;
        document.querySelectorAll('.clientDetails').forEach(info => info.remove())
        getData.forEach((element) => {
            let createElement = `<tr class="clientDetails">
        
        <td>${element.fullname}</td>
        <td>${element.idnum}</td>
        <td class="d-none d-md-block "><div class="img" style="background-image: url(${element.pic})"></div></td>
        <td>${element.plate}</td>
        <td class="d-none d-md-block "><div class="mini-color " width="50" height="50" style="background-color:${element.color}"></div></td>


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

            <button class="btn btn-danger" id="deleteButton${index}"><i class="bi bi-trash"></i></button>
                        
        </td>
    </tr>`

            this.tableData.innerHTML += createElement;

            let read_id = "readButton" + index;
            let edit_id = "editButton" + index;
            let delete_id = "deleteButton" + index;

            element.id = index;



            setTimeout(() => {
                let buttonRead = document.getElementById(read_id);
                buttonRead.addEventListener('click', () => this.readInfo(element));

                let buttonEdit = document.getElementById(edit_id);
                buttonEdit.addEventListener('click', () => this.editInfo(element));

                let buttonDelete = document.getElementById(delete_id);
                buttonDelete.addEventListener('click', () => this.deleteRecord(element));
            }, 0);
            index++;
        })
        console.log(getData)
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
            document.querySelector('#show_year').value = record.year,
            document.querySelector('#show_photo').value = record.pic,
            document.getElementById('show_img').src = record.pic
    }

    editInfo(record) {
        document.querySelector('#edit_img').src = record.pic;
        document.querySelector('#edit_name').value = record.name,
            document.querySelector('#edit_surname').value = record.surname,
            document.querySelector("#edit_address").value = record.address,
            document.querySelector("#edit_id").value = record.idnum,
            document.querySelector("#edit_phone").value = record.tel,
            document.querySelector('#edit_plate').value = record.plate,
            document.querySelector('#edit_color').value = record.color,
            document.querySelector('#edit_brand').value = record.brand,
            document.querySelector('#edit_model').innerHTML = `<option selected value="${record.model}">${record.model}</option>`,
            document.querySelector('#edit_year').value = record.year,
            document.querySelector('#edit_photo').value = record.pic
        editID = record.id;
        console.log(editID);
        console.log(record)
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

    constructor(nam, surnam, idnum, address, tel, brand, model, color, year, plate, pi) {
        this.name = this.capitalize(nam);
        this.surname = this.capitalize(surnam);
        this.idnum = idnum;
        this.address = address;
        this.tel = tel;
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.year = year;
        this.plate = plate;
        this.pic = pi.replace(/\\/g, '/');
        this.id = Record.getIndex();
        this.fullname = this.name + " " + this.surname;
    }

    capitalize(val) {
        console.log(val)
        let firsLetter = val.charAt(0);
        firsLetter = firsLetter.toUpperCase()
        const rest = val.slice(1);
        console.log(firsLetter)
        console.log(rest)
        return firsLetter + rest
    }

    static getIndex() {
        let index = localStorage.getItem('index');
        !index ? index = 0 : index = Number(index)
        localStorage.setItem('index', index + 1);
        return index;
    }

    static dreceaseIndex() {
        let index = localStorage.getItem('index');
        !index ? index = 0 : index = Number(index)
        localStorage.setItem('index', index - 1);
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
    const selectBrandEdit = document.getElementById("edit_brand");
    const selectModelEdit = document.getElementById("edit_model");
    selectModel.disabled = true;
    selectModelEdit.disabled = true;

    function matchBrand(cars, e) {
        return cars.carBrand === e.target.value
    }

    //Add State Value to State Select option
    data.cars.forEach((value) => {
        selectBrand.appendChild(createOption(value.carBrand, value.carBrand));
        selectBrandEdit.appendChild(createOption(value.carBrand, value.carBrand));
    });

    selectBrand.addEventListener("change", function (e) {
        selectModel.disabled = false;
        index = data.cars.filter(car => matchBrand(car, e))
        index = index[0];
        selectModel.innerHTML = "";
        index.carModels.forEach((model) => {
            selectModel.append(createOption(model, model));

        });
    });

    selectBrandEdit.addEventListener("change", function (e) {
        selectModelEdit.disabled = false;
        index = data.cars.filter(car => matchBrand(car, e))
        index = index[0];
        selectModelEdit.innerHTML = "";
        index.carModels.forEach((model) => {
            selectModelEdit.append(createOption(model, model));

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