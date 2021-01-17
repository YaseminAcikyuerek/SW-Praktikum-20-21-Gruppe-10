import NamedBusinessObject from './NamedBusinessObject';

/**
 * Represents a customer of the bank.
 */
export default class Role extends NamedBusinessObject {


constructor(aRoleName, aId) {
    super();
    this.role_name = aRoleName;
    this.id = aId;
  }


  setRoleName(aRoleName) {
    this.role_name = aRoleName;
  }


  getRoleName() {
    return this.role_name;
  }


  setId(aId) {
    this.id = aId;
  }

  /**
   * Gets the lastname.
   */
  getId() {
    return this.id;
  }


  static fromJSON(roles) {
    let result = [];

    if (Array.isArray(roles)) {
      roles.forEach((s) => {
        Object.setPrototypeOf(s, Role.prototype);
        result.push(s);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let s = roles;
      Object.setPrototypeOf(s, Role.prototype);
      result.push(s);
    }

    return result;
  }
}
