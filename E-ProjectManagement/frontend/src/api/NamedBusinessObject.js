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

  toString() {
    let result = '';
    for (var prop in this) {
      result += prop + ': ' + this[prop] + ' ';
    }
    return result;
  }
}

