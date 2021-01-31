import  NamedBusinessObject from './NamedBusinessObject';




export default class PersonBO extends NamedBusinessObject {


  constructor() {
    super();
    this.role = null;
    this.email = '';
    this.google_user_id = '';
  }



  setRole(aRole) {
  this.role= aRole;
  }

  getRole() {
    return this.role;
  }

  setEmail(aEmail) {
  this.role= aEmail;
  }

  getEmail() {
    return this.email;
  }

  setGoogleUserId(aGoogleUserId) {
  this.google_user_id = aGoogleUserId;
  }

  getGoogleUserId() {
    return this.google_user_id;
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

