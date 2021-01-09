import PersonBO from './PersonBO';

/**
 * Represents a customer of the bank.
 */
export default class StudentBO extends PersonBO {

constructor(aCourse_abbr,aMatriculation_nr) {
    super();
    this.course_abbr = aCourseAbbr;
    this.matriculation_nr = aMatriculationNr;

  }


  setCourseAbbr(aCourseAbbr) {
    this.course_abbr = aCourse_abbr;
  }

  getCourseAbbr() {
    return this.course_abbr;
  }


  setMatriculationNr(aMatriculationNr) {
    this.matriculation_nr = aMatriculationNr;
  }


  getMatriculationNr() {
    return this.matriculation_nr;
  }


  static fromJSON(student) {
    let result = [];

    if (Array.isArray(student)) {
      student.forEach((t) => {
        Object.setPrototypeOf(t, StudentBO.prototype);
        result.push(t);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let t = student
      Object.setPrototypeOf(t, StudentBO.prototype);
      result.push(t);
    }

    return result;
  }
}

