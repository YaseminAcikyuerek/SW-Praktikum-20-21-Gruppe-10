import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, Accordion, AccordionSummary, AccordionDetails, InputAdornment, IconButton, Grid, Typography, ListItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ProjectForm from './dialogs/ProjectForm';
import ProjectListEntryStudent from './ProjectListEntryStudent';
import Paper from '@material-ui/core/Paper';



class ProjectListStudent extends Component {

  constructor(props) {
    super(props);

    // console.log(props);
    let expandedID = null;

    if (this.props.location.expandProject) {
      expandedID = this.props.location.expandProject.getID();
    }

    // Init an empty state
    this.state = {
      acceptedProjects: [],
      signedProjects: [],
      error: null,
      loadingInProgress: false,
      expandedProjectID: expandedID,
        student: null,
    };
  }

  /** Fetches all ProjectBOs with state accepted from the backend */
  searchProjectAcceptedURL = () => {
    ManagementAPI.getAPI().searchProject()
      .then(projectBOs =>
        this.setState({               // Set new state when ProjectBOs have been fetched
          acceptedProjects: projectBOs,
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
           acceptedProjects: [],
            loadingInProgress: false, // disable loading indicator
            error: e
          })
        );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  getProjects = async () =>{
    let student = await ManagementAPI.getAPI().getStudentByMail(this.props.currentUserMail) //studentBO
    ManagementAPI.getAPI().getProjectsByStudent(student)
    this.setState({student: student})
  }

  getProjectsByStudentURL = (studentBO) => {
    ManagementAPI.getAPI().getProjectsByStudent(studentBO.getID())
      .then(responseProjectBO =>
        this.setState({               // Set new state when ProjectBOs have been fetched
          studentProjects: responseProjectBO,
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
           studentProjects: [],
            loadingInProgress: false, // disable loading indicator
            error: e
          })
          );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }


  /**
   * Handles onExpandedStateChange events from the ProjectListStudent component. Toggels the expanded state of
   * the ProjectListStudentEntry of the given PersonBO.
   *
   * DRINGEND ÜBERARBEITEN!!!
   *
   * @param {person} PersonBO of the PersonListEntry to be toggeled
   */
  onExpandedStateChange = student => {
    // console.log(personID);
    // Set expandend person entry to null by default
    let newID = null;

    // If same person entry is clicked, collapse it else expand a new one
    if (student.getID() !== this.state.expandedStudentID) {
      // Expand the person entry with personID
      newID = student.getID();
    }
    // console.log(newID);
    this.setState({
      expandedStudentID: newID,
    });
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount () {
    this.searchProjectAcceptedURL();
    this.getProjectsByStudentURL();
  }

  /** Renders the component */
  render() {

    const { classes } = this.props;
    const { expandedProjectID, loadingInProgress, error, acceptedProjects ,student, signedProjects} = this.state;

    return (

      <div className={classes.root}>
        <Grid className={classes.projectFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <h1>Auswahl Projekte</h1>
            <Paper className={classes.paper}> {
            acceptedProjects.map(project =>
            <ProjectListEntryStudent key={project.getID()} project={project} expandedState={expandedProjectID === project.getID()}
              onExpandedStateChange={this.onExpandedStateChange} student = {student}
              onProjectDeleted={this.projectDeleted}
            />)
            }
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.searchProjectAcceptedURL} />
            </Paper>
          </Grid>
          <Grid item xs={4}>
              <h1>Meine Projekte</h1>
              <Paper className={classes.paper}>{
               <div>
                {signedProjects.map(p => <ListItem>{p.name}</ListItem>)}
               </div>
              }</Paper>
          </Grid>
         </Grid>
      </div>
    );
  }




}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  }
});

/** PropTypes */
ProjectListStudent.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ProjectListStudent));