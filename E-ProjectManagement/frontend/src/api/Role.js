
export default class Role {

  constructor() {
    this.name = '';
    this.id = '';
  }


  setRoleName(aName) {
    this.name = aName;
  }


  getRoleName() {
    return this.name;
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
