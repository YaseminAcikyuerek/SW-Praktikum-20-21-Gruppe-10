import BusinessObject from './BusinessObject';

/**
 * Represents a customer of the bank.
 */
export default class RatingBO extends BusinessObject {

constructor() {
    super();
    this.project = null;
    this.evaluator = null;
    this.to_be_assessed = null;
    this.grade = 0;
    this.passed = true;

  }

  setProject(aProject) {
  this.project = aProject ;
  }

  getProject() {
    return this.project;
  }

  setEvaluator(aEvaluator) {
  this.evaluator = aEvaluator ;
  }

  getEvaluator() {
    return this.evaluator;
  }

  setToBeAssessed(aToBeAssessed) {
  this.to_be_assessed = aToBeAssessed;
  }

  getToBeAssessed() {
    return this.to_be_assessed;
  }

  setGrade(aGrade) {
  this.grade = aGrade;
  }

  getGrade() {
    return this.grade;
  }

  setPassed(aPassed) {
  this.passed = aPassed;
  }

  getPassed() {
    return this.passed;
  }



  static fromJSON(ratings) {
    let result = [];

    if (Array.isArray(ratings)) {
      ratings.forEach((i) => {
        Object.setPrototypeOf(i, RatingBO.prototype);
        result.push(i);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let i = ratings;
      Object.setPrototypeOf(i, RatingBO.prototype);
      result.push(i);
    }

    return result;
  }
}

