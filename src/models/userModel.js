class User {
  constructor({ id = null, name, surname, email, username, password }) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.username = username;
    this.password = password;
  }
}

module.exports = User;
