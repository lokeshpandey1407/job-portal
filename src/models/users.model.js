export default class UserModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
  static addUser(data) {
    let id = users.length + 1;
    let { name, email, password } = data;
    const user = new UserModel(id, name, email, password);
    users.push(user);
  }

  static isValidUser(email, password) {
    let foundUser = users.find((user) => {
      return user.email == email && user.password == password;
    });
    return foundUser;
  }
}

const users = [
  {
    id: 1,
    name: "lokesh pandey",
    email: "luvpnd@gmail.com",
    password: "Lokesh@1801",
  },
];
