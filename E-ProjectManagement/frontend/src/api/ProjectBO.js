import NamedBusinessObject from './NamedBusinessObject';

/**
 * Represents a Project of the Management-system.
 */
export default class ProjectBO extends NamedBusinessObject {


/**
   *
   *
   */
  constructor() {
    super();
    this.status = '';
    this.owner = '';
    this.module = null;
    this.projectType = null;
    this.semester = null;
    this.capacity = '';
    this.external_partner_list = '';
    this.short_description = '';
    this.flag = 0;
    this.bd_before_lecture_period = '';
    this.bd_during_lecture_period = '';
    this.bd_during_exam_period  = '';
    this.preferred_bd_during_lecture_period = '';
    this.special_room = '';
    this.language = '';
    this.room = '';


  }

  setStatus(aStatus) {
  this.status = aStatus ;
  }

  getStatus() {
    return this.status;
  }

  setOwner(aOwner) {
  this.owner = aOwner ;
  }

  getOwner() {
    return this.owner;
  }

  setModule(aModule) {
  this.module = aModule ;
  }

  getModule() {
    return this.module;
  }

  setProjectType(aProjectType) {
  this.project_type = aProjectType ;
  }

  getProjectType() {
    return this.project_type;
  }

 setSemester(aSemester){
    this.semester = aSemester;
  }

  getSemester(){
    return this.semester;
  }

  setCapacity(aCapacity) {
  this.capacity = aCapacity ;
  }

  getCapacity() {
    return this.capacity;
  }

  setExternalPartnerList(aExternalPartnerList){
    this.external_partner_list = aExternalPartnerList;
  }

  getExternalPartnerList(){
    return this.external_partner_list;
  }

  setShortDescription(aShortDescription) {
  this.short_description = aShortDescription ;
  }

  getShortDescription() {
    return this.short_description;
  }

  setFlag(aFlag) {
  this.flag = aFlag ;
  }

  getFlag() {
    return this.Flag;
  }

  setBdBeforeLecturePeriod(aBdBeforeLecturePeriod) {
  this.bd_before_lecture_period = aBdBeforeLecturePeriod ;
  }

  getBdBeforeLecturePeriod() {
    return this.bd_before_lecture_period;
  }

  setBdDuringLecturePeriod(aBdDuringLecturePeriod) {
  this.bd_during_lecture_period = aBdDuringLecturePeriod ;
  }

  getBdDuringLecturePeriod() {
    return this.bd_during_lecture_period;
  }

  setBdDuringExamPeriod(aBdDuringExamPeriod) {
  this.bd_during_exam_period = aBdDuringExamPeriod ;
  }

  getBdDuringExamPeriod() {
    return this.bd_during_exam_period;
  }

  setPreferredBdDuringLecturePeriod(aPreferredBdDuringLecturePeriod) {
  this.preferred_bd_during_lecture_period = aPreferredBdDuringLecturePeriod ;
  }

  getPreferredBdDuringLecturePeriod() {
    return this.preferred_bd_during_lecture_period;
  }

  setSpecialRoom(aSpecialRoom) {
  this.special_room = aSpecialRoom ;
  }

  getSpecialRoom() {
    return this.special_room;
  }

  setLanguage(aLanguage) {
  this.language = aLanguage ;
  }

  getLanguage() {
    return this.language;
  }

  setRoom(aRoom){
  this.room = aRoom ;
  }

  getRoom() {
  return this.room;
  }



  static fromJSON(projects) {
    let result = [];

    if (Array.isArray(projects)) {
      projects.forEach((j) => {
        Object.setPrototypeOf(j, ProjectBO.prototype);
        result.push(j);
      })
    } else {

      let j = projects;
      Object.setPrototypeOf(j, ProjectBO.prototype);
      result.push(j);
    }

    return result;
  }

}

