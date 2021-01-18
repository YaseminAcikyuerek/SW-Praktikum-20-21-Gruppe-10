import NamedBusinessObject from './NamedBusinessObject';

/**
 * R
 */
export default class ProjectTypeBO extends NamedBusinessObject {

constructor(aSws,aEcts) {
    super();
    this.sws = aSws;
    this.ects = aEcts;
  }

  setSws(aSws) {
  this.sws = aSws;
  }

  getSws() {
    return this.sws;
  }
  setEcts(aEcts) {
  this.ects = aEcts;
  }

  getEcts() {
    return this.Ects;
  }

  static fromJSON(ProjectType) {
    let result = [];

    if (Array.isArray(projectTypes)) {
      projectTypes.forEach((t) => {
        Object.setPrototypeOf(t, ProjectTypeBO.prototype);
        result.push(t);
      })
    } else {
      //
      let t = projectTypes;
      Object.setPrototypeOf(t, ProjectTypeBO.prototype);
      result.push(t);
    }

    return result;
  }

}
