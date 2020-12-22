import BusinessObject from './BusinessObject';

/**
 * Represents an Module object of a Semester .
 */
export default class ModuleBO extends BusinessObject {

  /**
   * Constructs a new ModuleBO object with a given owner.
   *
   * @param {*} aOwner - the owner of this ModuleBO.
   */
  constructor(aOwner) {
    super();
    this.owner = aOwner;
  }

  /**
   * Sets the owner of this ModuleBO.
   *
   * @param {*} aOwner - the new owner of this ModuleBO.
   */
  setOwner(aOwner) {
    this.owner = aOwner;
  }

  /**
   * Gets the owner of this ModuleBO.
   */
  getOwner() {
    return this.owner;
  }

  /**
   * Returns an Array of ModuleBOs from a given JSON structure
   */
  static fromJSON(modules) {
    let result = [];

    if (Array.isArray(modules)) {
      accounts.forEach((a) => {
        Object.setPrototypeOf(a, ModuleBO.prototype);
        result.push(a);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let a = modules;
      Object.setPrototypeOf(a, ModuleBO.prototype);
      result.push(a);
    }

    return result;
  }
