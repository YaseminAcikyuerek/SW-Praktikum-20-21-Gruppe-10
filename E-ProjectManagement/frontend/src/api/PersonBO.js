import  BusinessObject from './BusinessObject';

/**
 * Zeigt die Person an, die .
 */
export default class PersonBO extends BusinessObject {

/**
   *
   *
   */
  constructor(aRole) {
    super();
    this.role = aRole;

  }

  setRole(aRole) {
  this.role= aRole;
  }

  getRole() {
    return this.role
  }



  static fromJSON(persons) {
    let result = [];

    if (Array.isArray(persons)) {
      persons.forEach((c) => {
        Object.setPrototypeOf(c, PersonBO.prototype);
        result.push(c);
      })
    } else {
      // Ist offenbar ein singuläres Objekt
      let c = persons;
      Object.setPrototypeOf(c, PersonBO.prototype);
      result.push(c);
    }

    return result;
  }

