import  NamedBusinessObject from './NamedBusinessObject';




export default class PersonBO extends NamedBusinessObject {


  constructor(aRole) {
    super();
    this.role = aRole;

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

