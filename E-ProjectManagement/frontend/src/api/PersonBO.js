import  NamedBusinessObject from './NamedBusinessObject';




export default class PersonBO extends NamedBusinessObject {


  constructor(aName,aRole, aEmail, aGoogleUserId) {
    super(aName);
    this.role = aRole;
    this.email = aEmail
    this.google_user_id = aGoogleUserId
  }

  getName() {
    return super.getName();
  }
  setName(aName) {
    super.setName(aName);
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

