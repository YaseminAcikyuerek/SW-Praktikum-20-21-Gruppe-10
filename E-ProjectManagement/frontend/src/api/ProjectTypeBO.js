import NamedBusinessObject from './NamedBusinessObject';


export default class ProjectTypeBO extends NamedBusinessObject {

constructor(aName, aSws, aEcts) {
    super(aName);
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
    return this.ects;
  }

  static fromJSON(projectTypes) {
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
