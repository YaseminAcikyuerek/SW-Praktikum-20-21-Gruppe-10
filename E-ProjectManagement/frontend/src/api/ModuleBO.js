import  NamedBusinessObject from './NamedBusinessObject';

/**
 * .
 */
export default class ModuleBO extends NamedBusinessObject {

/**
   *
   *
   */
  constructor(aEdv_nr) {
    super();
    this.edv_nr = aEdv_nr;
  }

  setEdvNr(aEdv_nr) {
  this.edv_nr = aEdv_nr;
  }

  getEdvNr() {
    return this.edv_nr;
  }

  static fromJSON(modules) {
    let result = [];

    if (Array.isArray(modules)) {
      modules.forEach((z) => {
        Object.setPrototypeOf(z, ModuleBO.prototype);
        result.push(z);
      })
    } else {
      //
      let z = modules;
      Object.setPrototypeOf(z, ModuleBO.prototype);
      result.push(z);
    }

    return result;
  }

}






