import BusinessObject from './BusinessObject';

/**
 * Represents a customer of the bank.
 */
export default class ProjectBO extends BusinessObject {


/**
   *
   *
   */
  constructor(aProject, aStudent) {
    super();
    this.Project = aProject;
    this.Student = aStudent;
  }

  setProject(aProject) {
  this.Project = aProject;
  }

  getProject() {
    return this.Project
  }

  setStudent(aStudent) {
  this.Student = aStudent;
  }

  getStudent() {
    return this.Student


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

