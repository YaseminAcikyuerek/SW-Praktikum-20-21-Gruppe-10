
export default class Status {

    constructor() {
    this.name = '';

  }

  setStatus(aName) {
    this.name = aName;
  }

  getStatus() {
    return this.name;
  }

 static fromJSON(statuses) {
    let result = [];

    if (Array.isArray(statuses)) {
      statuses.forEach((u) => {
        Object.setPrototypeOf(u, Status.prototype);
        result.push(u);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let u = statuses
      Object.setPrototypeOf(u, Status.prototype);
      result.push(u);
    }

    return result;
  }
}


