import NamedBusinessObject from './NamedBusinessObject';

/**
 * Represents a Project of the Management-system.
 */
export default class ProjectBO extends NamedBusinessObject {


/**
   *
   *
   */
  constructor(aName,aSemester,aModule,aShortDescription,aExternalPartnerList,aCapacity,aBdDuringExamPeriod, aBdBeforeLecturePeriod,aBdDuringLecturePeriod,aPreferredBdDuringLecturePeriod,aLanguage, aRoom,aSpecialRoom,aFlag, aStatus,aProjectType,aOwner) {
    super(aName);
    this.semester = aSemester;
    this.module = aModule;
    this.short_description = aShortDescription;
    this.external_partner_list = aExternalPartnerList;
    this.capacity = aCapacity;
    this.bd_during_exam_period  = aBdDuringExamPeriod;
    this.bd_before_lecture_period = aBdBeforeLecturePeriod;
    this.bd_during_lecture_period = aBdDuringLecturePeriod;
    this.preferred_bd_during_lecture_period = aPreferredBdDuringLecturePeriod;
    this.language = aLanguage;
    this.room = aRoom;
    this.special_room = aSpecialRoom;
    this.flag = aFlag;
    this.status = aStatus;
    this.projectType = aProjectType;
    this.owner = aOwner;
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

  setCapacity(aCapacity) {
  this.capacity = aCapacity ;
  }

  getCapacity() {
    return this.capacity;
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

  setExternalPartnerList(aExternalPartnerList){
    this.external_partner_list = aExternalPartnerList;
  }

  getExternalPartnerList(){
    return this.external_partner_list;
  }

  setSemester(aSemester){
    this.semester = aSemester;
  }

  getSemester(){
    return this.semester;
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

