import  BusinessObject from './BusinessObject';

/**
 * Zeigt eine Teilnahme  am Project an.
 */
export default class ParticipationBO extends BusinessObject {

/**
   *
   *
   */
  constructor(aProject, aStudent) {
    super();
    this.project = aProject;
    this.student = aStudent;
  }

  setProject(aProject) {
  this.projectroject = aProject;
  }

  getProject() {
    return this.project
  }

  setStudent(aStudent) {
  this.student = aStudent;
  }

  getStudent() {
    return this.student


  static fromJSON(participations) {
    let result = [];

    if (Array.isArray(participations)) {
      participations.forEach((c) => {
        Object.setPrototypeOf(c, ParticipationBO.prototype);
        result.push(c);
      })
    } else {
      // Ist offenbar ein singuläres Objekt
      let c = participations;
      Object.setPrototypeOf(c, ParticipationBO.prototype);
      result.push(c);
    }

    return result;
  }
