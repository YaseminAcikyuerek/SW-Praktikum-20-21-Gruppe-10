import NamedBusinessObject from './NamedBusinessObject';

/**
 * Represents a customer of the bank.
 */
export default class SemesterBO extends NamedBusinessObject {

constructor(aStart, aEnd) {
    super();
    this.start = aStart;
    this.end = aEnd;
  }


  setStart(aStart) {
    this.start = aStart;
  }


  getStart() {
    return this.start;
  }



  setEnd(aEnd) {
    this.end = aEnd;
  }


  getEnd() {
    return this.end;
  }

  /**
   * Returns an Array of CustomerBOs from a given JSON structure.
   */
  static fromJSON(semesters) {
    let result = [];

    if (Array.isArray(semesters)) {
      semesters.forEach((c) => {
        Object.setPrototypeOf(c, SemesterBO.prototype);
        result.push(c);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let c = semesters;
      Object.setPrototypeOf(c, SemesterBO.prototype);
      result.push(c);
    }

    return result;
  }
}