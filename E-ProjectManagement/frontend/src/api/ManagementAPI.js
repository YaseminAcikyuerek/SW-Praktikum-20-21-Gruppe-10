/**import ModuleBO from './api/ModuleBO';
import ParticipationBO from './api/ParticipationBO';
 import ProjectTypeBO from './api/ProjectTypeBO';
import RatingBO from './api/RatingBO';
import RoleBO from './api/RoleBO';
import SemesterBO from './api/SemesterBO';
import StatusBO from './api/StatusBO';
import StudentBO from './api/StudentBO';*/
import PersonBO from './PersonBO';
import ProjectBO from './ProjectBO';



export default class ManagementAPI {

    static #api = null;
    //Local Python backend
  #managementServerBaseURL = '/management';


  // Person  related
  #getPersonsURL = () => `${this.#managementServerBaseURL}/person`;
  #addPersonURL = () => `${this.#managementServerBaseURL}/person`;
  #getPersonURL = (id) => `${this.#managementServerBaseURL}/person/${id}`;
  #updatePersonURL = (id) => `${this.#managementServerBaseURL}/person/${id}`;
  #deletePersonURL = (id) => `${this.#managementServerBaseURL}/person/${id}`;
  #searchPersonURL = (personName) => `${this.#managementServerBaseURL}/person-by-name/${personName}`;


  //Project related
  #getProjectsURL = () => `${this.#managementServerBaseURL}/project`;
  #addProjectURL = () => `${this.#managementServerBaseURL}/project`;
  #getProjectURL = (id) => `${this.#managementServerBaseURL}/project/${id}`;
  #updateProjectURL = (id) => `${this.#managementServerBaseURL}/project/${id}`;
  #deleteProjectURL = (id) => `${this.#managementServerBaseURL}/project/${id}`;
  #searchProjectURL = (projectOwner) => `${this.#managementServerBaseURL}/project-by-owner/${projectOwner}`;

  //Student related
  #getStudentsURL = () => `${this.#managementServerBaseURL}/student`;
  #addStudentURL = () => `${this.#managementServerBaseURL}/student`;
  #getStudentURL = (id) => `${this.#managementServerBaseURL}/student/${id}`;
  #updateStudentURL = (id) => `${this.#managementServerBaseURL}/student/${id}`;
  #deleteStudentURL = (id) => `${this.#managementServerBaseURL}/student/${id}`;
  #searchStudentURL = (studentName) => `${this.#managementServerBaseURL}/student-by-name/${studentName}`;


  //Participation related
  #getParticipationsURL = () => `${this.#managementServerBaseURL}/participation`;
  #addParticipationURL = () => `${this.#managementServerBaseURL}/participation`;
  #getParticipationURL = (id) => `${this.#managementServerBaseURL}/participation/${id}`;
  #updateParticipationURL = (id) => `${this.#managementServerBaseURL}/participation/${id}`;
  #deleteParticipationURL = (id) => `${this.#managementServerBaseURL}/participation/${id}`;
  #searchParticipationURL = (participationStudent) => `${this.#managementServerBaseURL}/participation-by-student/${participationStudent}`;


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




  getPersons() {
    return this.#fetchAdvanced(this.#getPersonsURL()).then((responseJSON) => {
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
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
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

}



//Jetzt kommt Project

  getProjects(){
    return this.#fetchAdvanced(this.#getProjectsURL()).then((responseJSON) => {
      let projectBOs = ProjectBO.fromJSON(responseJSON);
      // console.info(projectBOs);
      return new Promise(function (resolve) {
        resolve(projectBOs);
      })
    })

  }





  getProject(projectID) {
    return this.#fetchAdvanced(this.#getProjectURL(projectID)).then((responseJSON) => {
      // We always get an array of ProjectBOs.fromJSON, but only need one object
      let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
      // console.info(responseProjectBO);
      return new Promise(function (resolve) {
        resolve(responseProjectBO);
      })
    })
  }


  /**
   * Adds a Project and returns a Promise, which resolves to a new ProjectBO object with all
   *  the parameter of projectBO object.
   *
   * @param {ProjectBO} projectBO to be added. The ID of the new project is set by the backend
   * @public
   */

  addProject(projectBO) {
    return this.#fetchAdvanced(this.#addProjectURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(projectBO)
    }).then((responseJSON) => {
      // We always get an array of ProjectBOs.fromJSON, but only need one object
      let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
      // console.info(projectBOs);
      return new Promise(function (resolve) {
        resolve(responseProjectBO);
      })
    })
  }




  /**
   * Updates a person and returns a Promise, which resolves to a ProjectBO.
   *
   * @param {PersonBO} projectBO to be updated
   * @public
   */

  updateProject(projectBO) {
    return this.#fetchAdvanced(this.#updateProjectURL(projectBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(projectBO)
    }).then((responseJSON) => {
      // We always get an array of projectBOs.fromJSON
      let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
      // console.info(projectBOs);
      return new Promise(function (resolve) {
        resolve(responseProjectBO);
      })
    })
  }

  /**
   * Returns a Promise, which resolves to an Array of ProjectBOs
   *
   * @param {Number} ProjectID to be deleted
   * @public
   */



  deleteProject(projectID) {
    return this.#fetchAdvanced(this.#deleteProjectURL(projectID), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of ProjectBOs.fromJSON
      let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
      // console.info(projectBOs);
      return new Promise(function (resolve) {
        resolve(responseProjectBO);
      })
    })
  }


   /**
   * Returns a Promise, which resolves to an Array of ProjectBOs
   *
   * @param {Number} projectID to be deleted
   * @public
   */

   searchProject(projectOwner) {
     return this.#fetchAdvanced(this.#searchProjectURL(projectOwner)).then((responseJSON) => {
      let projectBOs = ProjectBO.fromJSON(responseJSON);
      // console.info(projectBOs);
      return new Promise(function (resolve) {
        resolve(projectBOs);
      })
    })

   }



   //Hier kommt der Student

  getStudents(){
    return this.#fetchAdvanced(this.#getStudentsURL()).then((responseJSON) => {
      let studentBOs = StudentBO.fromJSON(responseJSON);
      // console.info(studentBOs);
      return new Promise(function (resolve) {
        resolve(studentBOs);
      })
    })

  }


  getStudent(studentID) {
    return this.#fetchAdvanced(this.#getStudentURL(studentID)).then((responseJSON) => {
      // We always get an array of StudentBOs.fromJSON, but only need one object
      let responseStudentBO = StudentBO.fromJSON(responseJSON)[0];
      // console.info(responseStudentBO);
      return new Promise(function (resolve) {
        resolve(responseStudentBO);
      })
    })
  }


  /**
   * Adds a Student and returns a Promise, which resolves to a new StudentBO object with all
   *  the parameter of studentBO object.
   *
   * @param {StudentBO} studentBO to be added. The ID of the new student is set by the backend
   * @public
   */

  addStudent(studentBO) {
    return this.#fetchAdvanced(this.#addStudentURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(studentBO)
    }).then((responseJSON) => {
      // We always get an array of StudentBOs.fromJSON, but only need one object
      let responseStudentBO = StudentBO.fromJSON(responseJSON)[0];
      // console.info(studentBOs);
      return new Promise(function (resolve) {
        resolve(responseStudentBO);
      })
    })
  }




  /**
   * Updates a student and returns a Promise, which resolves to a StudentBO.
   *
   * @param {StudentBO} studentBO to be updated
   * @public
   */

  updateStudent(studentBO) {
    return this.#fetchAdvanced(this.#updateStudentURL(studentBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(studentBO)
    }).then((responseJSON) => {
      // We always get an array of studentBOs.fromJSON
      let responseStudentBO = StudentBO.fromJSON(responseJSON)[0];
      // console.info(studentBOs);
      return new Promise(function (resolve) {
        resolve(responseStudentBO);
      })
    })
  }

  /**
   * Returns a Promise, which resolves to an Array of StudentBOs
   *
   * @param {Number} StudentID to be deleted
   * @public
   */



  deleteStudent(studentID) {
    return this.#fetchAdvanced(this.#deleteStudentURL(studentID), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of StudentBOs.fromJSON
      let responseStudentBO = StudentBO.fromJSON(responseJSON)[0];
      // console.info(studentBOs);
      return new Promise(function (resolve) {
        resolve(responseStudentBO);
      })
    })
  }


   /**
   * Returns a Promise, which resolves to an Array of StudentBOs
   *
   * @param {Number} studentID to be deleted
   * @public
   */

   searchStudent(studentName) {
     return this.#fetchAdvanced(this.#searchStudentURL(studentName)).then((responseJSON) => {
      let studentBOs = StudentBO.fromJSON(responseJSON);
      // console.info(studentBOs);
      return new Promise(function (resolve) {
        resolve(studentBOs);
      })
    })

   }



//Jetzt kommt Participation

  getParticipations(){
    return this.#fetchAdvanced(this.#getParticipationsURL()).then((responseJSON) => {
      let participationBOs = ParticipationBO.fromJSON(responseJSON);
      // console.info(participationBOs);
      return new Promise(function (resolve) {
        resolve(participationBOs);
      })
    })

  }





  getParticipation(participationID) {
    return this.#fetchAdvanced(this.#getParticipationURL(participationID)).then((responseJSON) => {
      // We always get an array of ParticipationBOs.fromJSON, but only need one object
      let responseParticipationBO = ParticipationBO.fromJSON(responseJSON)[0];
      // console.info(responseParticipationBO);
      return new Promise(function (resolve) {
        resolve(responseParticipationBO);
      })
    })
  }


  /**
   * Adds a Participation and returns a Promise, which resolves to a new ParticipationBO object with all
   *  the parameter of participationBO object.
   *
   * @param {ParticipationBO} participationBO to be added. The ID of the new project is set by the backend
   * @public
   */

  addParticipation(participationBO) {
    return this.#fetchAdvanced(this.#addParticipationURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(participationBO)
    }).then((responseJSON) => {
      // We always get an array of ParticipationBOs.fromJSON, but only need one object
      let responseParticipationBO = ParticipationBO.fromJSON(responseJSON)[0];
      // console.info(participationBOs);
      return new Promise(function (resolve) {
        resolve(responseParticipationBO);
      })
    })
  }




  /**
   * Updates a participation and returns a Promise, which resolves to a ParticipationBO.
   *
   * @param {ParticipationBO} participationBO to be updated
   * @public
   */

  updateParticipation(participationBO) {
    return this.#fetchAdvanced(this.#updateParticipationURL(participationBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(participationBO)
    }).then((responseJSON) => {
      // We always get an array of participationBOs.fromJSON
      let responseParticipationBO = ParticipationBO.fromJSON(responseJSON)[0];
      // console.info(participationBOs);
      return new Promise(function (resolve) {
        resolve(responseParticipationBO);
      })
    })
  }

  /**
   * Returns a Promise, which resolves to an Array of ParticipationBOs
   *
   * @param {Number} ParticipationID to be deleted
   * @public
   */



  deleteParticipation(participationID) {
    return this.#fetchAdvanced(this.#deleteParticipationURL(participationID), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of ParticipationBOs.fromJSON
      let responseParticipationBO = ParticipationBO.fromJSON(responseJSON)[0];
      // console.info(participationBOs);
      return new Promise(function (resolve) {
        resolve(responseParticipationBO);
      })
    })
  }


   /**
   * Returns a Promise, which resolves to an Array of ParticipationBOs
   *
   * @param {Number} projectID to be deleted
   * @public
   */

   searchParticipation(participationStudent) {
     return this.#fetchAdvanced(this.#searchParticipationURL(participationStudent)).then((responseJSON) => {
      let participationBOs = ParticipationBO.fromJSON(responseJSON);
      // console.info(participationBOs);
      return new Promise(function (resolve) {
        resolve(participationBOs);
      })
    })

   }



































