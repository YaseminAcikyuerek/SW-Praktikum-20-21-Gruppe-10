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

/**
 * Controlls a list of ProjectListEntrys to create a accordion for each project.
 *
 * @see See [ProjectListEntry](#projectlistentry)
 */
class ProjectListDozent extends Component {

  constructor(props) {
    super(props);

    // console.log(props);
    let expandedID = null;

    if (this.props.location.expandProject) {
      expandedID = this.props.location.expandProject.getID();
    }

    // Init an empty state
    this.state = {
      personProjects: [],
      filteredProjects: [],
      ProjectFilter: '',
      error: null,
      loadingInProgress: false,
      showProjectForm: false
    };
  }

  getProjects = async () =>{
    let person = await ManagementAPI.getAPI().getPersonByMail(this.props.currentUserMail) //personBO
    ManagementAPI.getAPI().searchProjectsByOwner(person)
    this.setState({person: person})
  }
  /** Fetches all ProjectBOs from person from the backend */
  searchProjectsByOwner= (id) => {
    ManagementAPI.getAPI().searchProjectsByOwner(id)
      .then(projectBOs =>
        this.setState({               // Set new state when ProjectBOs have been fetched
          personProjects: projectBOs,
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
           personProjects: [],
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
      filteredProjects: [...newProjectList],
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
        filteredProjects: [...newProjectList],
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
    const { filteredProjects, projectFilter, loadingInProgress, error, showProjectForm } = this.state;

    return (
      <div className={classes.root}>
        <Grid className={classes.projectFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
              Filter project list by name:
              </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              id='projectFilter'
              type='text'
              value={projectFilter}
              onChange={this.filterFieldValueChange}
              InputProps={{
                endAdornment: <InputAdornment position='end'>
                  <IconButton onClick={this.clearFilterFieldButtonClicked}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs />
          <Grid item>
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addProjectButtonClicked}>
              Neues Projekt beantragen
          </Button>
          </Grid>
        </Grid>
        {
          // Show the list of ProjectListEntry components
          // Do not use strict comparison, since expandedProjectID maybe a string if given from the URL parameters
          filteredProjects.map(project =>
            <ProjectListEntry key={project.getID()} project={project}
              onProjectDeleted={this.projectDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getProjects} />
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