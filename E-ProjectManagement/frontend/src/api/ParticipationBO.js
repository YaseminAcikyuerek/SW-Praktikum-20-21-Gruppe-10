import BusinessObject from './BusinessObject';

/**
 * Represents an Participation object of a Person.
 */
export default class ParticipationBO extends BusinessObject {

  /**
   * Constructs a new ParticipationBO object with a given owner.
   *
   * @param {*} aOwner - the owner of this ParticipationBO.
   */
  constructor(aOwner) {
    super();
    this.owner = aOwner;
  }

  /**
   * Sets the owner of this ParticipationBO.
   *
   * @param {*} aOwner - the new owner of this ParticipationBO.
   */
  setOwner(aOwner) {
    this.owner = aOwner;
  }

  /**
   * Gets the owner of this ParticipationBO.
   */
  getOwner() {
    return this.owner;
  }

  /**
   * Returns an Array of Participation BOs from a given JSON structure
   */
  static fromJSON(participations) {
    let result = [];

    if (Array.isArray(participations)) {
      accounts.forEach((a) => {
        Object.setPrototypeOf(a, ParticipationBO.prototype);
        result.push(a);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let a = participations;
      Object.setPrototypeOf(a, ParticipationBO.prototype);
      result.push(a);
    }

    return result;
  }
