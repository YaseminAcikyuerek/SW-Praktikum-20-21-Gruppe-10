import ModuleBO from './ModuleBO';
import ParticipationBO from './ParticipationBO';
import ProjectTypeBO from './ProjectTypeBO';
import RatingBO from './RatingBO';
import SemesterBO from './SemesterBO';
import StatusBO from './StatusBO';
import StudentBO from './StudentBO';
import PersonBO from './PersonBO';
import ProjectBO from './ProjectBO';
import Role from './Role';



export default class ManagementAPI {

  static #api = null;

  #managementServerBaseURL = '/management';


  // Person related
  #getPersonsURL = () => `${this.#managementServerBaseURL}/persons`;
  #addPersonURL = () => `${this.#managementServerBaseURL}/person`;
  #getPersonURL = (id) => `${this.#managementServerBaseURL}/person/${id}`;
  #updatePersonURL = (id) => `${this.#managementServerBaseURL}/person/${id}`;
  #deletePersonURL = (id) => `${this.#managementServerBaseURL}/person/${id}`;
  #searchPersonURL = (personName) => `${this.#managementServerBaseURL}/person-by-name/${personName}`;


  //Project related
  #getProjectsURL = () => `${this.#managementServerBaseURL}/projects`;
  #addProjectURL = () => `${this.#managementServerBaseURL}/projects`;
  #getProjectURL = (id) => `${this.#managementServerBaseURL}/project/${id}`;
  #updateProjectURL = (id) => `${this.#managementServerBaseURL}/project/${id}`;
  #deleteProjectURL = (id) => `${this.#managementServerBaseURL}/project/${id}`;
  #searchProjectURL = (projectOwner) => `${this.#managementServerBaseURL}/project-by-owner/${projectOwner}`;

  //Student related
  #getStudentsURL = () => `${this.#managementServerBaseURL}/students`;
  #addStudentURL = () => `${this.#managementServerBaseURL}/students`;
  #getStudentURL = (id) => `${this.#managementServerBaseURL}/student/${id}`;
  #updateStudentURL = (id) => `${this.#managementServerBaseURL}/student/${id}`;
  #deleteStudentURL = (id) => `${this.#managementServerBaseURL}/student/${id}`;
  #searchStudentURL = (studentName) => `${this.#managementServerBaseURL}/student-by-name/${studentName}`;


  //Participation related
  #getAllParticipationsURL = () => `${this.#managementServerBaseURL}/participation`;
  #getParticipationsForStudentURL = (id) => `${this.#managementServerBaseURL}/student/${id}/participation`;
  #addParticipationsForStudentURL = (id) => `${this.#managementServerBaseURL}/student/${id}/participation`;
  #updateParticipationURL = (id) => `${this.#managementServerBaseURL}/participation/${id}`;
  #deleteParticipationIdURL = (id) => `${this.#managementServerBaseURL}/participation/${id}`;
  #searchParticipationURL = (participationStudent) => `${this.#managementServerBaseURL}/participation-by-student/${participationStudent}`;


  //Semester related
  #getSemestersURL = () => `${this.#managementServerBaseURL}/semester`;
  #addSemesterURL = () => `${this.#managementServerBaseURL}/semester`;
  #getSemesterURL = (id) => `${this.#managementServerBaseURL}/semester/${id}`;
  #updateSemesterURL = (id) => `${this.#managementServerBaseURL}/semester/${id}`;
  #deleteSemesterURL = (id) => `${this.#managementServerBaseURL}/semester/${id}`;
  #searchSemesterURL = (semesterName) => `${this.#managementServerBaseURL}/semester-by-name/${semesterName}`;


  //Rating related
  #getRatingsURL = () => `${this.#managementServerBaseURL}/rating`;
  #addRatingURL = () => `${this.#managementServerBaseURL}/rating`;
  #getRatingURL = (id) => `${this.#managementServerBaseURL}/rating/${id}`;
  #updateRatingURL = (id) => `${this.#managementServerBaseURL}/rating/${id}`;
  #deleteRatingURL = (id) => `${this.#managementServerBaseURL}/rating/${id}`;
  #searchRatingURL = (ratingName) => `${this.#managementServerBaseURL}/rating-by-name/${ratingName}`;


  // Role  related
  #getRolesURL = () => `${this.#managementServerBaseURL}/role`;
  #addRoleURL = () => `${this.#managementServerBaseURL}/role`;
  #getRoleURL = (id) => `${this.#managementServerBaseURL}/role/${id}`;
  #updateRoleURL = (id) => `${this.#managementServerBaseURL}/role/${id}`;
  #deleteRoleURL = (id) => `${this.#managementServerBaseURL}/role/${id}`;
  #searchRoleURL = (roleName) => `${this.#managementServerBaseURL}/role-by-name/${roleName}`;


  // ProjectType  related
  #getProjectTypesURL = () => `${this.#managementServerBaseURL}/project_type`;
  #addProjectTypeURL = () => `${this.#managementServerBaseURL}/project_type`;
  #getProjectTypeURL = (id) => `${this.#managementServerBaseURL}/project_type/${id}`;
  #updateProjectTypeURL = (id) => `${this.#managementServerBaseURL}/project_type/${id}`;
  #deleteProjectTypeURL = (id) => `${this.#managementServerBaseURL}/project_type/${id}`;
  #searchProjectTypeURL = (project_typeName) => `${this.#managementServerBaseURL}/project_type-by-name/${project_typeName}`;


  // Status  related
  #getStatusesURL = () => `${this.#managementServerBaseURL}/status`;
  #addStatusURL = () => `${this.#managementServerBaseURL}/status`;
  #getStatusURL = (id) => `${this.#managementServerBaseURL}/status/${id}`;
  #updateStatusURL = (id) => `${this.#managementServerBaseURL}/status/${id}`;
  #deleteStatusURL = (id) => `${this.#managementServerBaseURL}/status/${id}`;
  #searchStatusURL = (statusName) => `${this.#managementServerBaseURL}/status-by-name/${statusName}`;


  // Module related
  #getModulesURL = () => `${this.#managementServerBaseURL}/modules`;
  #addModuleURL = () => `${this.#managementServerBaseURL}/modules`;
  #getModuleURL = (id) => `${this.#managementServerBaseURL}/module/${id}`;
  #updateModuleURL = (id) => `${this.#managementServerBaseURL}/module/${id}`;
  #deleteModuleURL = (id) => `${this.#managementServerBaseURL}/module/${id}`;
  #searchModuleURL = (ModuleName) => `${this.#managementServerBaseURL}/module-by-name/${ModuleName}`;


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


  /**
   * Returns a Promise, which resolves to an Array of PersonBOs
   *
   * @public
   */

  getPersons() {
    return this.#fetchAdvanced(this.#getPersonsURL()).then((responseJSON) => {
      let personBOs = PersonBO.fromJSON(responseJSON);
      // console.info(personBOs);
      return new Promise(function (resolve) {
        resolve(personBOs);
      })
    })
  }


  /**
   * Returns a Promise, which resolves to a PersonBO
   *
   * @param {Number} personID to be retrieved
   * @public
   */

  getPerson(personID) {
    return this.#fetchAdvanced(this.#getPersonURL(personID)).then((responseJSON) => {
      // We always get an array of PersonBOs.fromJSON, but only need one object
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
       console.info(responsePersonBO);
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


//Jetzt kommt Project

  /**
   * Returns a Promise, which resolves to an Array of ProjectBOs
   *
   * @public
   */

  getProjects() {
    return this.#fetchAdvanced(this.#getProjectsURL()).then((responseJSON) => {
      let projectBOs = ProjectBO.fromJSON(responseJSON);
      console.info(projectBOs);
      return new Promise(function (resolve) {
        resolve(projectBOs);
      })
    })

  }




  /**
   * Returns a Promise, which resolves to a ProjectBO
   *
   * @param {Number} projectID to be retrieved
   * @public
   */

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
   * Updates a project and returns a Promise, which resolves to a ProjectBO.
   *
   * @param {ProjectBO} projectBO to be updated
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
      //console.error(this.props.url, status, err.toString());
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
   * @param {Number} projectId to be deleted
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

   /**
   * Returns a Promise, which resolves to an Array of StudentBOs
   *
   * @public
   */

  getStudents(){
    return this.#fetchAdvanced(this.#getStudentsURL()).then((responseJSON) => {
      let studentBOs = StudentBO.fromJSON(responseJSON);
      // console.info(studentBOs);
      return new Promise(function (resolve) {
        resolve(studentBOs);
      })
    })

  }

/**
   * Returns a Promise, which resolves to a StudentBO
   *
   * @param {Number} studentID to be retrieved
   * @public
   */

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

   /**
   * Returns a Promise, which resolves to an Array of ParticipationBOs
   *
   * @public
   */

  getAllParticipations(){
    return this.#fetchAdvanced(this.#getAllParticipationsURL()).then((responseJSON) => {
      let participationBOs = ParticipationBO.fromJSON(responseJSON);
      //console.info(participationBOs);
      return new Promise(function (resolve) {
        resolve(participationBOs);
      })
    })
  }




  /**
   * Returns a Promise, which resolves to a ParticipationBO
   *
   * @param {Number} studentID to be retrieved
   * @public
   */

  getParticipationsForStudent(studentID) {
    return this.#fetchAdvanced(this.#getParticipationsForStudentURL(studentID)).then((responseJSON) => {
      // We always get an array of ParticipationBOs.fromJSON, but only need one object
      let participationBOs = ParticipationBO.fromJSON(responseJSON);
      // console.info(responseParticipationBO);
      return new Promise(function (resolve) {
        resolve(participationBOs);
      })
    })
  }




  /**
   * Adds a Participation and returns a Promise, which resolves to a new ParticipationBO object with all
   *  the parameter of participationBO object.
   *
   * @param {Number} studentID to be added. The ID of the new project is set by the backend
   * @public
   */

  addParticipationsForStudent(studentID) {
    return this.#fetchAdvanced(this.#addParticipationsForStudentURL(studentID), {
      method: 'POST',
    })
      .then((responseJSON) => {
       // We always get an array of ParticipationBOs.fromJSON, but only need one object
         let participationBO = ParticipationBO.fromJSON(responseJSON)[0];
       // console.info(participationBOs);
        return new Promise(function (resolve) {
           resolve(participationBO);
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
   * @param {Number} participationID to be deleted
   * @public
   */

  deleteParticipation(participationID) {
    return this.#fetchAdvanced(this.#deleteParticipationIdURL(participationID), {
      method: 'DELETE'
    })
        .then((responseJSON) => {
      // We always get an array of ParticipationBOs.fromJSON
      let participationBOs = ParticipationBO.fromJSON(responseJSON)[0];
      // console.info(participationBOs);
      return new Promise(function (resolve) {
        resolve(participationBOs);
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




   // Semester

    /**
   * Returns a Promise, which resolves to an Array of CustomerBOs
   *
   * @public
   */

  getSemesters() {
    return this.#fetchAdvanced(this.#getSemestersURL()).then((responseJSON) => {
      let semesterBOs = SemesterBO.fromJSON(responseJSON);
      // console.info(personBOs);
      return new Promise(function (resolve) {
        resolve(semesterBOs);
      })
    })
  }




  /**
   * Returns a Promise, which resolves to a SemesterBO
   *
   * @param {Number} semesterID to be retrieved
   * @public
   */

  getSemester(semesterID) {
    return this.#fetchAdvanced(this.#getSemesterURL(semesterID)).then((responseJSON) => {
      // We always get an array of SemesterBOs.fromJSON, but only need one object
      let responseSemesterBO = SemesterBO.fromJSON(responseJSON)[0];
      // console.info(responsePersonBO);
      return new Promise(function (resolve) {
        resolve(responseSemesterBO);
      })
    })
  }



  /**
   * Adds a Semester and returns a Promise, which resolves to a new SemesterBO object with the
   *  of the parameter semesterBO object.
   *
   * @param {SemesterBO} semesterBO to be added. The ID of the new person is set by the backend
   * @public
   */

  addSemester(semesterBO) {
    return this.#fetchAdvanced(this.#addSemesterURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(semesterBO)
    }).then((responseJSON) => {
      // We always get an array of PersonBOs.fromJSON, but only need one object
      let responseSemesterBO = SemesterBO.fromJSON(responseJSON)[0];
      // console.info(projectBOs);
      return new Promise(function (resolve) {
        resolve(responseSemesterBO);
      })
    })
  }


  /**
   * Updates a semester and returns a Promise, which resolves to a PersonBO.
   *
   * @param {SemesterBO} semesterBO to be updated
   * @public
   */

  updateSemester(semesterBO) {
    return this.#fetchAdvanced(this.#updateSemesterURL(semesterBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(semesterBO)
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON
      let responseSemesterBO = SemesterBO.fromJSON(responseJSON)[0];
      // console.info(projectBOs);
      return new Promise(function (resolve) {
        resolve(responseSemesterBO);
      })
    })
  }






  /**
   * Returns a Promise, which resolves to an Array of SemesterBOs
   *
   * @param {Number} semesterID to be deleted
   * @public
   */

  deleteSemester(semesterID) {
    return this.#fetchAdvanced(this.#deleteSemesterURL(semesterID), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of SemesterBOs.fromJSON
      let responseSemesterBO = SemesterBO.fromJSON(responseJSON)[0];
      // console.info(accountBOs);
      return new Promise(function (resolve) {
        resolve(responseSemesterBO);
      })
    })
  }





  /**
   * Returns a Promise, which resolves to an Array of SemesterBOs
   *
   * @param {Number} semesterID to be deleted
   * @public
   */

   searchSemester(semesterName) {
    return this.#fetchAdvanced(this.#searchSemesterURL(semesterName)).then((responseJSON) => {
      let semesterBOs = SemesterBO.fromJSON(responseJSON);
      // console.info(personBOs);
      return new Promise(function (resolve) {
        resolve(semesterBOs);
      })
    })
  }




//Rating

/**
   * Returns a Promise, which resolves to an Array of RatingBOs
   *
   * @public
   */
  getRatings() {
    return this.#fetchAdvanced(this.#getRatingsURL()).then((responseJSON) => {
      let ratingBOs = RatingBO.fromJSON(responseJSON);
      // console.info(ratingBOs);
      return new Promise(function (resolve) {
        resolve(ratingBOs);
      })
    })
  }


  /**
   * Returns a Promise, which resolves to a RatingBO
   *
   * @param {Number} ratingID to be retrieved
   * @public
   */

  getRating(ratingID) {
    return this.#fetchAdvanced(this.#getRatingURL(ratingID)).then((responseJSON) => {
      // We always get an array of RatingBOs.fromJSON, but only need one object
      let responseRatingBO = RatingBO.fromJSON(responseJSON)[0];
      // console.info(responsePersonBO);
      return new Promise(function (resolve) {
        resolve(responseRatingBO);
      })
    })
  }


  /**
   * Adds a Rating and returns a Promise, which resolves to a new RatingBO object with the
   *  of the parameter personBO object.
   *
   * @param {RatingBO} ratingBO to be added. The ID of the new person is set by the backend
   * @public
   */

  addRating(ratingBO) {
    return this.#fetchAdvanced(this.#addRatingURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ratingBO)
    }).then((responseJSON) => {
      // We always get an array of RatingBOs.fromJSON, but only need one object
      let responseRatingBO = RatingBO.fromJSON(responseJSON)[0];
      // console.info(ratingBOs);
      return new Promise(function (resolve) {
        resolve(responseRatingBO);
      })
    })
  }


  /**
   * Updates a rating and returns a Promise, which resolves to a RatingBO.
   *
   * @param {RatingBO} ratingBO to be updated
   * @public
   */

  updateRating(ratingBO) {
    return this.#fetchAdvanced(this.#updateRatingURL(ratingBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ratingBO)
    }).then((responseJSON) => {
      // We always get an array of RatingBOs.fromJSON
      let responseRatingBO = RatingBO.fromJSON(responseJSON)[0];
      // console.info(ratingBOs);
      return new Promise(function (resolve) {
        resolve(responseRatingBO);
      })
    })
  }



  /**
   * Returns a Promise, which resolves to an Array of RatingBOs
   *
   * @param {Number} ratingID to be deleted
   * @public
   */

  deleteRating(ratingID) {
    return this.#fetchAdvanced(this.#deleteRatingURL(ratingID), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of RatingBOs.fromJSON
      let responseRatingBO = RatingBO.fromJSON(responseJSON)[0];
      // console.info(ratingBOs);
      return new Promise(function (resolve) {
        resolve(responseRatingBO);
      })
    })
  }


   /**
   * Returns a Promise, which resolves to an Array of RatingBOs
   *
   * @param {Number} ratingID to be deleted
   * @public
   */

   searchRating(ratingName) {
    return this.#fetchAdvanced(this.#searchRatingURL(ratingName)).then((responseJSON) => {
      let ratingBOs = RatingBO.fromJSON(responseJSON);
      // console.info(ratingBOs);
      return new Promise(function (resolve) {
        resolve(ratingBOs);
      })
    })
  }



//Role

  /**
   * Returns a Promise, which resolves to an Array of RolesBOs
   *
   * @public
   */

  getRoles() {
    return this.#fetchAdvanced(this.#getRolesURL()).then((responseJSON) => {
      let roles = Role.fromJSON(responseJSON);
      // console.info(roles);
      return new Promise(function (resolve) {
        resolve(roles);
      })
    })
  }



  /**
   * Returns a Promise, which resolves to a Role
   *
   * @param {Number} roleID to be retrieved
   * @public
   */

  getRole(roleID) {
    return this.#fetchAdvanced(this.#getRoleURL(roleID)).then((responseJSON) => {
      // We always get an array of RoleBOs.fromJSON, but only need one object
      let responseRole = Role.fromJSON(responseJSON)[0];
      // console.info(responseRoleBO);
      return new Promise(function (resolve) {
        resolve(responseRole);
      })
    })
  }


  /**
   * Adds a Role and returns a Promise, which resolves to a new RoleBO object with the
   *  of the parameter personBO object.
   *
   * @param {Role} role to be added. The ID of the new role is set by the backend
   * @public
   */

  addRole(role) {
    return this.#fetchAdvanced(this.#addRoleURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(role)
    }).then((responseJSON) => {
      // We always get an array of RoleBOs.fromJSON, but only need one object
      let responseRole = Role.fromJSON(responseJSON)[0];
      // console.info(roleBOs);
      return new Promise(function (resolve) {
        resolve(responseRole);
      })
    })
  }


  /**
   * Updates a role and returns a Promise, which resolves to a RoleBO.
   *
   * @param {Role} role to be updated
   * @public
   */

  updateRole(role) {
    return this.#fetchAdvanced(this.#updateRoleURL(role.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(role)
    }).then((responseJSON) => {
      // We always get an array of RoleBOs.fromJSON
      let responseRole = Role.fromJSON(responseJSON)[0];
      // console.info(roles);
      return new Promise(function (resolve) {
        resolve(responseRole);
      })
    })
  }

  /**
   * Returns a Promise, which resolves to an Array of RoleBOs
   *
   * @param {Number} roleID to be deleted
   * @public
   */

  deleteRole(roleID) {
    return this.#fetchAdvanced(this.#deleteRoleURL(roleID), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of RoleBOs.fromJSON
      let responseRole = Role.fromJSON(responseJSON)[0];
      // console.info(roleBOs);
      return new Promise(function (resolve) {
        resolve(responseRole);
      })
    })
  }


   /**
   * Returns a Promise, which resolves to an Array of RoleBOs
   *
   * @param {Number} roleID to be deleted
   * @public
   */

   searchRole(roleName) {
    return this.#fetchAdvanced(this.#searchRoleURL(roleName)).then((responseJSON) => {
      let roles = Role.fromJSON(responseJSON);
      // console.info(roles);
      return new Promise(function (resolve) {
        resolve(roles);
      })
    })
  }





//ProjectType

  /**
   * Returns a Promise, which resolves to an Array of ProjectTypeBOs
   *
   * @public
   */

  getProjectTypes() {
    return this.#fetchAdvanced(this.#getProjectTypesURL()).then((responseJSON) => {
      let project_typeBOs = ProjectTypeBO.fromJSON(responseJSON);
      // console.info(projectTypeBOs);
      return new Promise(function (resolve) {
        resolve(project_typeBOs);
      })
    })
  }

/**
   * Returns a Promise, which resolves to a ProjectTypeBO
   *
   * @param {Number} projectTypeID to be retrieved
   * @public
   */

  getProjectType(projectTypeID) {
    return this.#fetchAdvanced(this.#getProjectTypeURL(projectTypeID)).then((responseJSON) => {
      // We always get an array of ProjectTypeBOs.fromJSON, but only need one object
      let responseProjectTypeBO = ProjectTypeBO.fromJSON(responseJSON)[0];
      // console.info(responseProjectTypeBO);
      return new Promise(function (resolve) {
        resolve(responseProjectTypeBO);
      })
    })
  }


  /**
   * Adds a ProjectType and returns a Promise, which resolves to a new ProjectTypeBO object with the
   *  of the parameter projectTypeBO object.
   *
   * @param {ProjectTypeBO} projectTypeBO to be added. The ID of the new person is set by the backend
   * @public
   */

  addProjectType(projectTypeBO) {
    return this.#fetchAdvanced(this.#addProjectTypeURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(projectTypeBO)
    }).then((responseJSON) => {
      // We always get an array of ProjectTypePBOs.fromJSON, but only need one object
      let responseProjectTypeBO = ProjectTypeBO.fromJSON(responseJSON)[0];
      // console.info(projectTypeBOs);
      return new Promise(function (resolve) {
        resolve(responseProjectTypeBO);
      })
    })
  }


  /**
   * Updates a project_type and returns a Promise, which resolves to a ProjectTypeBO.
   *
   * @param {ProjectTypeBO} projectTypeBO to be updated
   * @public
   */

  updateProjectType(projectTypeBO) {
    return this.#fetchAdvanced(this.#updateProjectTypeURL(projectTypeBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(projectTypeBO)
    }).then((responseJSON) => {
      // We always get an array of ProjectTypeBOs.fromJSON
      let responseProjectTypeBO = ProjectTypeBO.fromJSON(responseJSON)[0];
      // console.info(projectTypeBOs);
      return new Promise(function (resolve) {
        resolve(responseProjectTypeBO);
      })
    })
  }

  /**
   * Returns a Promise, which resolves to an Array of ProjectTypeBOs
   *
   * @param {Number} projectTypeID to be deleted
   * @public
   */

  deleteProjectType(projectTypeID) {
    return this.#fetchAdvanced(this.#deleteProjectTypeURL(projectTypeID), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of ProjectTypeBOs.fromJSON
      let responseProjectTypeBO = ProjectTypeBO.fromJSON(responseJSON)[0];
      // console.info(projectTypeBOs);
      return new Promise(function (resolve) {
        resolve(responseProjectTypeBO);
      })
    })
  }



  /**
   * Returns a Promise, which resolves to an Array of ProjectTypeBOs
   *
   * @param {Number} projectTypeID to be deleted
   * @public
   */

  searchProjectType(projectTypeName) {
    return this.#fetchAdvanced(this.#searchProjectTypeURL(projectTypeName)).then((responseJSON) => {
      let projectTypeBOs = ProjectTypeBO.fromJSON(responseJSON);
      // console.info(personBOs);
      return new Promise(function (resolve) {
        resolve(projectTypeBOs);
      })
    })
  }



//Module

   /**
   * Returns a Promise, which resolves to an Array of ModuleBOs
   *
   * @public
   */
   getModules(){
    return this.#fetchAdvanced(this.#getModulesURL()).then((responseJSON) => {
      let moduleBOs = ModuleBO.fromJSON(responseJSON);
      // console.info(moduleBOs);
      return new Promise(function (resolve) {
        resolve(moduleBOs);
      })
    })

  }


  /**
   * Returns a Promise, which resolves to a CustomerBO
   *
   * @param {Number} moduleID to be retrieved
   * @public
   */

  getModule(moduleID) {
    return this.#fetchAdvanced(this.#getModuleURL(moduleID)).then((responseJSON) => {
      // We always get an array of ModuleBOs.fromJSON, but only need one object
      let responseModuleBO = ModuleBO.fromJSON(responseJSON)[0];
      // console.info(responseModuleBO);
      return new Promise(function (resolve) {
        resolve(responseModuleBO);
      })
    })
  }


  /**
   * Adds a Module and returns a Promise, which resolves to a new ModuleBO object with all
   *  the parameter of moduleBO object.
   *
   * @param {ModuleBO} moduleBO to be added. The ID of the new module is set by the backend
   * @public
   */

  addModule(moduleBO) {
    return this.#fetchAdvanced(this.#addModuleURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(moduleBO)
    }).then((responseJSON) => {
      // We always get an array of ModuleBOs.fromJSON, but only need one object
      let responseModuleBO = ModuleBO.fromJSON(responseJSON)[0];
      // console.info(moduleBOs);
      return new Promise(function (resolve) {
        resolve(responseModuleBO);
      })
    })
  }




  /**
   * Updates a module and returns a Promise, which resolves to a ModuleBO.
   *
   * @param {ModuleBO} moduleBO to be updated
   * @public
   */

  updateModule(moduleBO) {
    return this.#fetchAdvanced(this.#updateModuleURL(moduleBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(moduleBO)
    }).then((responseJSON) => {
      // We always get an array of moduleBOs.fromJSON
      let responseModuleBO = ModuleBO.fromJSON(responseJSON)[0];
      // console.info(moduleBOs);
      return new Promise(function (resolve) {
        resolve(responseModuleBO);
      })
    })
  }




  /**
   * Returns a Promise, which resolves to an Array of ModuleBOs
   *
   * @param {Number} ModuleID to be deleted
   * @public
   */

  deleteModule(moduleID) {
    return this.#fetchAdvanced(this.#deleteModuleURL(moduleID), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of moduleBOs.fromJSON
      let responseModuleBO = ModuleBO.fromJSON(responseJSON)[0];
      // console.info(moduleBOs);
      return new Promise(function (resolve) {
        resolve(responseModuleBO);
      })
    })
  }




   /**
   * Returns a Promise, which resolves to an Array of ModuleBOs
   *
   * @param {Number} moduleID to be deleted
   * @public
   */

   searchModule(moduleName) {
     return this.#fetchAdvanced(this.#searchModuleURL(moduleName)).then((responseJSON) => {
      let moduleBOs = ModuleBO.fromJSON(responseJSON);
      // console.info(moduleBOs);
      return new Promise(function (resolve) {
        resolve(moduleBOs);
      })
    })

   }


   //Jetzt kommt Status

  /**
   * Returns a Promise, which resolves to an Array of StatusBOs
   *
   * @public
   */

  getStatuses () {
    return this.#fetchAdvanced(this.#getStatusesURL()).then((responseJSON) => {
      let statusBOs = StatusBO.fromJSON(responseJSON);
      // console.info(statusBOs);
      return new Promise(function (resolve) {
        resolve(statusBOs);
      })
    })

  }



  /**
   * Returns a Promise, which resolves to a CustomerBO
   *
   * @param {Number} statusID to be retrieved
   * @public
   */
  getStatus(statusID) {
    return this.#fetchAdvanced(this.#getStatusURL(statusID)).then((responseJSON) => {
      // We always get an array of StatusBOs.fromJSON, but only need one object
      let responseStatusBO = StatusBO.fromJSON(responseJSON)[0];
      // console.info(responseStatusBO);
      return new Promise(function (resolve) {
        resolve(responseStatusBO);
      })
    })
  }




  /**
   * Adds a Status and returns a Promise, which resolves to a new StatusBO object with all
   *  the parameter of statusBO object.
   *
   * @param {StatusBO} statusBO to be added. The ID of the new status is set by the backend
   * @public
   */

  addStatus(statusBO) {
    return this.#fetchAdvanced(this.#addStatusURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(statusBO)
    }).then((responseJSON) => {
      // We always get an array of StatusBOs.fromJSON, but only need one object
      let responseStatusBO = StatusBO.fromJSON(responseJSON)[0];
      // console.info(statusBOs);
      return new Promise(function (resolve) {
        resolve(responseStatusBO);
      })
    })
  }




  /**
   * Updates a status and returns a Promise, which resolves to a StatusBO.
   *
   * @param {StatusBO} statusBO to be updated
   * @public
   */

  updateStatus(statusBO) {
    return this.#fetchAdvanced(this.#updateStatusURL(statusBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(statusBO)
    }).then((responseJSON) => {
      // We always get an array of statusBOs.fromJSON
      let responseStatusBO = StatusBO.fromJSON(responseJSON)[0];
      // console.info(statusBOs);
      return new Promise(function (resolve) {
        resolve(responseStatusBO);
      })
    })
  }





  /**
   * Returns a Promise, which resolves to an Array of StatusBOs
   *
   * @param {Number} statusID to be deleted
   * @public
   */

  deleteStatus(statusID) {
    return this.#fetchAdvanced(this.#deleteStatusURL(statusID), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of StatusBOs.fromJSON
      let responseStatusBO = StatusBO.fromJSON(responseJSON)[0];
      // console.info(statusBOs);
      return new Promise(function (resolve) {
        resolve(responseStatusBO);
      })
    })
  }


   /**
   * Returns a Promise, which resolves to an Array of StatusBOs
   *
   * @param {Number} statusID to be deleted
   * @public
   */

   searchStatus(statusOwner) {
     return this.#fetchAdvanced(this.#searchStatusURL(statusOwner)).then((responseJSON) => {
      let statusBOs = StatusBO.fromJSON(responseJSON);
      // console.info(statusBOs);
      return new Promise(function (resolve) {
        resolve(statusBOs);
      })
    })
   }

}