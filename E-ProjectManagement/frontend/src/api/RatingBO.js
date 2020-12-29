import BusinessObject from './BusinessObject';

/**
 * Represents a customer of the bank.
 */
export default class RatingBO extends BusinessObject {

constructor(aProject,aEvaluator,ToBeAssessed,aGrade,aPassed) {
    super();
    this.project = aProject;
    this.evaluator = aEvaluator;
    this.to_be_assessed = aToBeAssessed;
    this.grade = aGrade;
    this.passed = aPassed;

  }

  setProject(aProject) {
  this.project = aProject ;
  }

  getProject() {
    return this.project
  }

  setEvaluator(aEvaluator) {
  this.evaluator = aEvaluator ;
  }

  getEvaluator() {
    return this.Evaluator
  }

  setToBeAssessed(aToBeAssessed) {
  this.to_be_assessed = aToBeAssessed ;
  }

  getToBeAssessed() {
    return this.to_be_assessed
  }

  setGrade(aGrade) {
  this.grade = aGrade ;
  }

  getGrade() {
    return this.grade
  }

  setPassed(aPassed) {
  this.passed = aPassed ;
  }

  getPassed() {
    return this.passed
  }



  static fromJSON(ratings) {
    let result = [];

    if (Array.isArray(ratings)) {
      ratings.forEach((c) => {
        Object.setPrototypeOf(c, RatingBOBO.prototype);
        result.push(c);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let c = ratings;
      Object.setPrototypeOf(c, RatingBO.prototype);
      result.push(c);
    }

    return result;
  }
}

