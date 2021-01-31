
export default class Role {

  constructor() {
    this.role_name = '';
    this.id = '';
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

      let s = roles;
      Object.setPrototypeOf(s, Role.prototype);
      result.push(s);
    }

    return result;
  }

}
