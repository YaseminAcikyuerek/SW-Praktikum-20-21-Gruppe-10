import ModuleBO from './api/ModuleBO';
import ParticipationBO from './api/ParticipationBO';
import PersonBO from './api/PersonBO';
import ProjectBO from './api/ProjectBO';
import ProjectTypeBO from './api/ProjectTypeBO';
import RatingBO from './api/RatingBO';
import RoleBO from './api/RoleBO';
import SemesterBO from './api/SemesterBO';
import StatusBO from './api/StatusBO';
import StudentBO from './api/StudentBO';

export default class ManagementAPI {

    static #api = null;


  // Local Python backend
  #managementServerBaseURL = '/management';

  // Local http-fake-backend
  //#managementServerBaseURL = '/api/management';

  #currencyFormatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: ''
  });

  #currency = '';

}

 // Person  related
  #getPersonsURL = () => `${this.#managementServerBaseURL}/person`;
  #addPersonURL = () => `${this.#managementServerBaseURL}/person`;
  #getPersonURL = (id) => `${this.#managementServerBaseURL}/person/${id}`;
  #updatePersonURL = (id) => `${this.#managementServerBaseURL}/person/${id}`;
  #deletePersonURL = (id) => `${this.#managementServerBaseURL}/person/${id}`;
  #searchPersonURL = (personName) => `${this.#managementServerBaseURL}/person-by-name/${personName}`;

  #getProjectsURL = () => `${this.#managementServerBaseURL}/project`;
  #addProjectURL = () => `${this.#managementServerBaseURL}/project`;
  #getProjectURL = (id) => `${this.#managementServerBaseURL}/project/${id}`;
  #updateProjectURL = (id) => `${this.#managementServerBaseURL}/project/${id}`;
  #deleteProjectURL = (id) => `${this.#managementServerBaseURL}/project/${id}`;
  #searchProjectURL = (projectOwner,projectName) => `${this.#managementServerBaseURL}/project-by-owner/${projectOwner}`;




  static getAPI() {
    if (this.#api == null) {
      this.#api = new ManagementAPI();
    }
    return this.#api;
  }

  #fetchAdvanced = (url, init) => fetch(url, init)
    .then(res => {
      // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
      if (!res.ok) {
        throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    }
    )





  getCurrencyFormatter() {
    return this.#currencyFormatter;
  }


  getCurrency() {
    return this.#currency;
  }


  getPerson() {
    return this.#fetchAdvanced(this.#getPersonURL()).then((responseJSON) => {
      let personBOs = PersonBO.fromJSON(responseJSON);
      // console.info(personBOs);
      return new Promise(function (resolve) {
        resolve(personBOs);
      })
    })
  }


  getPerson(personID) {
    return this.#fetchAdvanced(this.#getPersonURL(personID)).then((responseJSON) => {
      // We always get an array of PersonBOs.fromJSON, but only need one object
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
      // console.info(responsePersonBO);
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
  }


  /**
   * Adds a Person and returns a Promise, which resolves to a new PersonBO object with the
   * firstName and lastName of the parameter personBO object.
   *
   * @param {PersonBO} personBO to be added. The ID of the new person is set by the backend
   * @public
   */

  addPerson(personBO) {
    return this.#fetchAdvanced(this.#addPersonURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(personBO)
    }).then((responseJSON) => {
      // We always get an array of PersonBOs.fromJSON, but only need one object
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
      // console.info(projectBOs);
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
  }


  /**
   * Updates a person and returns a Promise, which resolves to a PersonBO.
   *
   * @param {PersonBO} personBO to be updated
   * @public
   */

  updatePerson(personBO) {
    return this.#fetchAdvanced(this.#updatePersonURL(personBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(personBO)
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON
      let responseCustomerBO = PersonBO.fromJSON(responseJSON)[0];
      // console.info(projectBOs);
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
  }

  /**
   * Returns a Promise, which resolves to an Array of PersonBOs
   *
   * @param {Number} personID to be deleted
   * @public
   */

  deletePerson(personID) {
    return this.#fetchAdvanced(this.#deletePersonURL(personID), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of PersonBOs.fromJSON
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
      // console.info(accountBOs);
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
  }


   /**
   * Returns a Promise, which resolves to an Array of PersonBOs
   *
   * @param {Number} personID to be deleted
   * @public
   */

   searchPerson(personName) {
    return this.#fetchAdvanced(this.#searchPersonURL(personName)).then((responseJSON) => {
      let personBOs = PersonBO.fromJSON(responseJSON);
      // console.info(personBOs);
      return new Promise(function (resolve) {
        resolve(personBOs);
      })
    })
  }




















