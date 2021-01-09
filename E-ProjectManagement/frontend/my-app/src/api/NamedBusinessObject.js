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
    super();
    this.name = aName;

  }

  setName(aName) {
  this.name = aName;
  }

  getName() {
    return this.name;
  }



  static fromJSON(namedbusinessobject) {
    let result = [];

    if (Array.isArray(namedbusinessobject)) {
      namedbusinessobject.forEach((c) => {
        Object.setPrototypeOf(c, NamedBusinessObjectBO.prototype);
        result.push(c);
      })
    } else {
      // Ist offenbar ein singuläres Objekt
      let c = namedbusinessobject;
      Object.setPrototypeOf(c, NamedBusinessObjectBO.prototype);
      result.push(c);
    }

    return result;
  }
}
