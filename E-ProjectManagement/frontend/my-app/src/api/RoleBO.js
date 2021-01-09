import NamedBusinessObject from './NamedBusinessObject';

/**
 * Represents a customer of the bank.
 */
export default class RoleBO extends NamedBusinessObject {


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
      roles.forEach((c) => {
        Object.setPrototypeOf(c, RoleBO.prototype);
        result.push(c);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let c = roles;
      Object.setPrototypeOf(c, RoleBO.prototype);
      result.push(c);
    }

    return result;
  }
}
