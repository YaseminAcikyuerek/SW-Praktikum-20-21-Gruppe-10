import PersonBO from './PersonBO';



export default class StudentBO extends PersonBO {

constructor(aName, aCourseAbbr, aMatriculationNr) {
    super(aName);
    this.course_abbr = aCourseAbbr;
    this.matriculation_nr = aMatriculationNr;

  }


  setCourseAbbr(aCourseAbbr) {
    this.course_abbr = aCourseAbbr;
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


  static fromJSON(students) {
    let result = [];

    if (Array.isArray(students)) {
      students.forEach((u) => {
        Object.setPrototypeOf(u, StudentBO.prototype);
        result.push(u);
      })
    } else {

      let u = students
      Object.setPrototypeOf(u, StudentBO.prototype);
      result.push(u);
    }

    return result;
  }
}

