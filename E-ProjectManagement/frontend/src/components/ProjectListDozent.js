import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ProjectForm from './dialogs/ProjectForm';
import ProjectListEntry from './ProjectListEntry';
import Paper from '@material-ui/core/Paper';

/**
 * Controlls a list of ProjectListEntrys to create a accordion for each project.
 *
 * @see See [ProjectListEntry](#projectlistentry)
 */
class ProjectListDozent extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      projects: [],
      currentUser: [],
      person: null,
      error: null,
      loadingInProgress: false,
      showProjectForm: false
    };
  }

  /** Fetches personBo from the backend with logged in e-mail*/
  searchProjectsByOwner = async () => {
    let personID = 0;
    // console.log("getPersonByMail loaded");

        await ManagementAPI.getAPI().getPersonByMail(this.props.currentUserMail).then(personBOs =>
        this.setState({               // Set new state when ProjectBOs have been fetched
          currentUser: personBOs,
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
           currentUser: 0,
            loadingInProgress: false, // disable loading indicator
            error: e
          })
        );
    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });

    /** Fetches all RatingBOs from person from the backend */
    ManagementAPI.getAPI().searchProjectsByOwner(this.state.currentUser[0].id).then(projectBOs =>
        this.setState({               // Set new state when ProjectBOs have been fetched
          projects: projectBOs,
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
           projects: [],
            loadingInProgress: false, // disable loading indicator
            error: e
          })
        );
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.searchProjectsByOwner();
  }

  /**
   * Handles onProjectDeleted events from the ProjectListEntry component
   *
   * @param {project} ProjectBO of the ProjectListEntry to be deleted
   */
  projectDeleted = project => {
    const newProjectList = this.state.projects.filter(projectFromState => projectFromState.getID() !==project.getID());
    this.setState({
      projects: newProjectList,
      showProjectForm: false
    });
  }

  /** Handles the onClick event of the add project button */
  addProjectButtonClicked = event => {
    // Do not toggle the expanded state
    event.stopPropagation();
    //Show the ProjectForm
    this.setState({
      showProjectForm: true
    });
  }

  /** Handles the onClose event of the ProjectForm */
  projectFormClosed = project => {
    // project is not null and therefore created
    if (project) {
      const newProjectList = [...this.state.projects,project];
      this.setState({
        projects: newProjectList,
        showProjectForm: false
      });
    } else {
      this.setState({
        showProjectForm: false
      });
    }
  }

  /** Handels onChange events of the project filter text field */
  filterFieldValueChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredProjects: this.state.projects.filter(project => {
        let SemesterContainsValue = project.getSemester().toLowerCase().includes(value);
        let ModuleContainsValue = project.getModule().toLowerCase().includes(value);
        let ShortDescriptionContainsValue = project.getShortDescription().toLowerCase().includes(value);
        let ExternalPartnerListContainsValue = project.getExternalPartnerList().toLowerCase().includes(value);
        let CapacityContainsValue = project.getCapacity().toLowerCase().includes(value);
        let BdDuringExamPeriodContainsValue = project.getBdDuringExamPeriod().toLowerCase().includes(value);
        let BdBeforeLecturePeriod = project.getBdBeforeLecturePeriod().toLowerCase().includes(value);
        let BdDuringLecturePeriod = project.getBdDuringLecturePeriod().toLowerCase().includes(value);
        let PreferredBdDuringLecturePeriod = project.getPreferredBdDuringLecturePeriod.toLowerCase().includes(value);
        let LanguageContainsValue = project.getLanguage().toLowerCase().includes(value);
        let RoomContainsValue = project.getRoom().toLowerCase().includes(value);
        let FlagContainsValue = project.getFlag().toLowerCase().includes(value);
        let StatusContainsValue = project.getStatus().toLowerCase().includes(value);
        let ProjectTypeContainsValue = project.getProjectType().toLowerCase().includes(value);
        let OwnerContainsValue = project.getOwner().toLowerCase().includes(value);

        return SemesterContainsValue || ModuleContainsValue || ShortDescriptionContainsValue ||ExternalPartnerListContainsValue ||
        CapacityContainsValue || BdDuringExamPeriodContainsValue || BdBeforeLecturePeriod || BdDuringLecturePeriod ||
        PreferredBdDuringLecturePeriod || LanguageContainsValue || RoomContainsValue || FlagContainsValue ||
        StatusContainsValue || ProjectTypeContainsValue || OwnerContainsValue
      }),
      projectFilter: value
    });
  }

  /** Handles the onClose event of the clear filter button */
  clearFilterFieldButtonClicked = () => {
    // Reset the filter
    this.setState({
      filteredProjects: [...this.state.projects],
      projectFilter: ''
    });
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { projects,loadingInProgress, error, showProjectForm } = this.state;

    return (
      <div className={classes.root}>
          <Grid item xs />
          <Grid item>
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addProjectButtonClicked}>
              Neues Projekt beantragen
          </Button>
          </Grid>
        {
          // Show the list of ProjectListEntry components
          // Do not use strict comparison, since expandedProjectID maybe a string if given from the URL parameters
          projects.map(project =>
            <ProjectListEntry key={project.getID()} project={project}
              onProjectDeleted={this.projectDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.searchProjectsByOwner} />
        <ProjectForm show={showProjectForm} onClose={this.projectFormClosed} />
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  ProjectFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }
});

/** PropTypes */
ProjectListDozent.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ProjectListDozent));