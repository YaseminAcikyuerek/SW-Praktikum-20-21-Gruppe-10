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

  getID(){
    return super.getID();
}

  getCreationTime() {
    return super.getCreationTime();
  }

  static fromJSON(namedBusinessObjects) {
    let result = [];

    if (Array.isArray(namedBusinessObjects)) {
      namedBusinessObjects.forEach((n) => {
        Object.setPrototypeOf(n, NamedBusinessObjectBO.prototype);
        result.push(n);
      })
    } else {
      // Ist offenbar ein singuläres Objekt
      let n = namedBusinessObjects;
      Object.setPrototypeOf(n, NamedBusinessObjectBO.prototype);
      result.push(n);
    }

    return result;
  }
}
