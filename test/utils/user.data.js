class UserData {
    constructor() {}

    setFakeData(name, password, role, status) {
        this.name = name;
        this.password = password;
        this.role = role;
        this.status = status;
    }

    setEmployeeData(id, firsLastName) {
        this.id = id;
        this.firsLastName = firsLastName;
    }


}

export default new UserData();