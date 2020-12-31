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
    return this.sws
  }
  setEcts(aEcts) {
  this.ects = aEcts;
  }

  getEcts() {
    return this.Ects
  }

  static fromJSON(ProjectType) {
    let result = [];

    if (Array.isArray(project_types)) {
      project_types.forEach((c) => {
        Object.setPrototypeOf(c, ProjectTypeBO.prototype);
        result.push(c);
      })
    } else {
      //
      let c = project_types;
      Object.setPrototypeOf(c, ProjectTypeBO.prototype);
      result.push(c);
    }

    return result;
  }
