import  NamedBusinessObject from './NamedBusinessObject';

/**
 * Zeigt ein Module eines Semesters an.
 */
export default class ModuleBO extends BusinessObject {

/**
   * Ein Konstrukt eines ModuleBO object mit der edv-nr .
   *
   */
  constructor(edv_nr) {
    super();
    this.edv_nr = aEdv_nr;
  }

  setEdvNr(aEdv_nr) {
  this.edv_nr = aEdv_nr;
  }

  getEdvNr() {
    return this.edv_nr
  }

  static fromJSON(modules) {
    let result = [];

    if (Array.isArray(modules)) {
      customers.forEach((c) => {
        Object.setPrototypeOf(c, ModuleBO.prototype);
        result.push(c);
      })
    } else {
      // Ist offenbar ein singuläres Objekt
      let c = modules;
      Object.setPrototypeOf(c, ModuleBO.prototype);
      result.push(c);
    }

    return result;
  }






