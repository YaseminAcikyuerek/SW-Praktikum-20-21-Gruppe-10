import  NamedBusinessObject from './NamedBusinessObject';




export default class PersonBO extends NamedBusinessObject {


  constructor(aRole) {
    super();
    this.role = aRole;
    this.email = aEmail
    this.google_user_id = aGoogle_user_id
  }

  setRole(aRole) {
  this.role= aRole;
  }

  getRole() {
    return this.role;
  }

  getName() {
    return super.getName();
  }
  setName(aName) {
    super.setName(aName);
  }

  getEmail() {
    return this.getEmail();
  }
  setEmail(aEmail) {
    this.email = aEmail
  }

  getGoogle_user_id() {
    return this.getaGoogle_user_id
  }
  setGoogle_user_id(aGoogle_user_id) {
    this.Google_user_id = aGoogle_user_id
  }


  static fromJSON(persons) {
    let result = [];

    if (Array.isArray(persons)) {
      persons.forEach((e) => {
        Object.setPrototypeOf(e, PersonBO.prototype);
        result.push(e);
      })
    } else {
      // Ist offenbar ein singuläres Objekt
      let e = persons;
      Object.setPrototypeOf(e, PersonBO.prototype);
      result.push(e);
    }

    return result;
  }

}

