import BusinessObject from './BusinessObject';

/**
 * Represents a customer of the bank.
 */
export default class ProjectBO extends BusinessObject {


/**
   *
   *
   */
  constructor(aStatus,aOwner,aModule,aStudent,aProjectType,aTime,aCapacity,aShortDescription,aFlag,aBdBeforeLecturePeriod,aBdDuringExamPeriod,aBdDuringLecturePeriod,aPreferredBdDuringLecturePeriod,aRoom,aSpecialRoom,aLanguage) {
    super();
    this.status = aStatus;
    this.owner = aOwner;
    this.module = aModule;
    this.student = aStudent;
    this.project_type = aProjectType;
    this.time = aTime;
    this.capacity = aCapacity;
    this.short_description = aShortDescription;
    this.flag = aFlag;
    this.bd_before_lecture_period = aBdBeforeLecturePeriod;
    this.bd_during_lecture_period = aBdDuringLecturePeriod;
    this.bd_during_exam_period  = aBdDuringExamPeriod ;
    this.preferred_bd_during_lecture_period = aPreferredBdDuringLecturePeriod;
    this.special_room = aSpecialRoom;
    this.language = aLanguage;
    this.room = aRoom;
  }

  set(aStatus) {
  this.status = aStatus ;
  }

  getStatus() {
    return this.status
  }

  set(aOwner) {
  this.owner = aOwner ;
  }

  getOwner() {
    return this.owner
  }

  set(aModule) {
  this.module = aModule ;
  }

  getModule() {
    return this.module
  }

  set(aStudent) {
  this.student = aStudent ;
  }

  getStudent() {
    return this.student
  }

  set(aProjectType) {
  this.project_type = aProjectType ;
  }

  getProjectType() {
    return this.project_type
  }

  set(aTime) {
  this.time = aTime;
  }

  getTime() {
    return this.time
  }

  set(aCapacity) {
  this.capacity = aCapacity ;
  }

  getCapacity() {
    return this.capacity
  }

  set(aShortDescription) {
  this.short_description = aShortDescription ;
  }

  getShortDescription() {
    return this.short_description
  }

  set(aFlag) {
  this.flag = aFlag ;
  }

  getFlag() {
    return this.Flag
  }

  set(aBdBeforeLecturePeriod) {
  this.bd_before_lecture_period = aBdBeforeLecturePeriod ;
  }

  getBdBeforeLecturePeriod() {
    return this.bd_before_lecture_period
  }

  set(aBdDuringLecturePeriod) {
  this.bd_during_lecture_period = aBdDuringLecturePeriod ;
  }

  getBdDuringLecturePeriod() {
    return this.bd_during_lecture_period
  }

  set(aBdDuringExamPeriod) {
  this.bd_during_exam_period = aBdDuringExamPeriod ;
  }

  getBdDuringExamPeriod() {
    return this.bd_during_exam_period
  }

  set(aPreferredBdDuringLecturePeriod) {
  this.preferred_bd_during_lecture_period = aPreferredBdDuringLecturePeriod ;
  }

  getPreferredBdDuringLecturePeriod() {
    return this.preferred_bd_during_lecture_period
  }

  set(aSpecialRoom) {
  this.special_room = aSpecialRoom ;
  }

  getSpecialRoom() {
    return this.special_room
  }

  set(aLanguage) {
  this.language = aLanguage ;
  }

  getLanguage() {
    return this.language
  }

  set(aRoom){
  this.room = aRoom ;
  }
  getRoom() {
  return this.Room
  }





  static fromJSON(projects) {
    let result = [];

    if (Array.isArray(projects)) {
      projects.forEach((c) => {
        Object.setPrototypeOf(c, ProjectBO.prototype);
        result.push(c);
      })
    } else {
      // Ist offenbar ein singuläres Objekt
      let c = projects;
      Object.setPrototypeOf(c, ProjectBO.prototype);
      result.push(c);
    }

    return result;
  }

