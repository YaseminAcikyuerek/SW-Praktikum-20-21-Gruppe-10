import  BusinessObject from './BusinessObject';

/**
 * Zeigt die Namen der ganzen Projektbestandteile an.
 */
export default class NamedBusinessObjectBO extends BusinessObject {

/**
   *
   *
   */
  constructor(aName) {
    this.Name = aName;

  }

  setName(aName) {
  this.Name = aName;
  }

  getName() {
    return this.Name
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
