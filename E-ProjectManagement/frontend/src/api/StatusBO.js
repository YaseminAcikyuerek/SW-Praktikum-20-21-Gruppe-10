import NamedBusinessObject from './NamedBusinessObject';

/**
 * Represents a customer of the bank.
 */
export default class StatusBO extends NamedBusinessObject {

constructor(aStatus) {
    super();
    this.status = aStatus;

  }


  setStatus(aStatus) {
    this.status = aStatus;
  }



  getStatus() {
    return this.status;
  }

 static fromJSON(statuses) {
    let result = [];

    if (Array.isArray(statuses)) {
      statuses.forEach((u) => {
        Object.setPrototypeOf(u, StatusBO.prototype);
        result.push(u);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let u = statuses
      Object.setPrototypeOf(u, StatusBO.prototype);
      result.push(u);
    }

    return result;
  }
}

