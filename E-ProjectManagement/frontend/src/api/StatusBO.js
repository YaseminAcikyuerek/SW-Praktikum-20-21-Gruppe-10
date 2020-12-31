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

 static fromJSON(status) {
    let result = [];

    if (Array.isArray(status)) {
      status.forEach((t) => {
        Object.setPrototypeOf(t, StatusBO.prototype);
        result.push(t);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let t = status
      Object.setPrototypeOf(t, StatusBO.prototype);
      result.push(t);
    }

    return result;
  }
}

