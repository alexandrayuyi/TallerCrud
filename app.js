class Form {
    constructor() {
        this.form = document.getElementById("form");
        this.form2 = document.getElementById("form2");
        this.form2.querySelector("#submit").addEventListener("submit", this.submitForm.bind(this));
    }



    submitForm(event) {
        event.preventDefault();
        let record = new Record();
        record = record.createRecordFromForm();
        record.saveToLocalStorage();
        this.form.reset();
        this.form2.reset();
        alert("Record saved successfully");
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
    }

    get fullName() {
        return this.name + " " + this.surname;
    }

    saveToLocalStorage() {
        localStorage.setItem(this.id, JSON.stringify(this));
    }

    retrieveFromLocalStorage(id) {
        let recordData = localStorage.getItem(id);
        let parsedData = JSON.parse(recordData);
        return new Record(parsedData.name, parsedData.surname, parsedData.idnum, parsedData.address, parsedData.tel, parsedData.brand, parsedData.model, parsedData.color, parsedData.year, parsedData.plate, parsedData.pic);
    }

    static deleteFromLocalStorage(id) {
        localStorage.removeItem(id);
    }

    static clearLocalStorage() {
        localStorage.clear();
    }

    createRecordFromForm() {
        let form = document.getElementById("form");
        let form2 = document.getElementById("form2");
        let name = form.elements["name"].value;
        let surname = form.elements["surname"].value;
        let idnum = form.elements["id"].value;
        let address = form.elements["address"].value;
        let tel = form.elements["phone"].value;
        let brand = form2.elements["brand"].value;
        let model = form2.elements["model"].value;
        let color = form2.elements["color"].value;
        let year = form2.elements["year"].value;
        let plate = form2.elements["plate"].value;
        let pic = form2.elements["photo"].value;
        console.log(name, surname, id, address, tel, brand, model, color, year, plate, pic)
        return new Record(name, surname, idnum, address, tel, brand, model, color, year, plate, pic);
    }
}

let data = {
    cars: [
        {
            carBrand: "Toyota",
            carModels: ["Corolla", "Hilux", "Fortuner", "Yaris"]
        },
        {
            carBrand: "Chevrolet",
            carModels: ["Aveo", "Spark", "Cruze", "Silverado"]
        },
        {
            carBrand: "Ford",
            carModels: ["Fiesta", "Focus", "Mustang", "Explorer"]
        },
        {
            carBrand: "Renault",
            carModels: ["Logan", "Clio"]
        },
        {
            carBrand: "Jeep",
            carModels: ["Grand Cherokee", "Wrangler"]
        },
        {
            carBrand: "Chery",
            carModels: ["Tiggo", "QQ", "Arauca", "Orinoco"]
        }
    ]
};

window.onload = function () {
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
        console.log(index)
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