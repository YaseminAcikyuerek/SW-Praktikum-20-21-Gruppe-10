import  BusinessObject from './BusinessObject';

/**
 *
 */
export default class NamedBusinessObjectBO extends BusinessObject {

/**
   *
   *
   */
  constructor(aName) {
    this.name = aName;

  }

  setName(aName) {
  this.name = aName;
  }

  getName() {
    return this.name
  }



  static fromJSON(namedbusinessobjects) {
    let result = [];

    if (Array.isArray(namedbusinessobjects)) {
      namedbusinessobjects.forEach((c) => {
        Object.setPrototypeOf(c, NamedBusinessObjectBO.prototype);
        result.push(c);
      })
    } else {
      // Ist offenbar ein singuläres Objekt
      let c = namedbusinessobjects;
      Object.setPrototypeOf(c, NamedBusinessObjectBO.prototype);
      result.push(c);
    }

    return result;
  }
