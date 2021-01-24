import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ProjectTypeForm from './dialogs/ProjectTypeForm';
import ProjectTypeListEntry from './ProjectTypeListEntry';


class ProjectTypeList extends Component {

  constructor(props) {
    super(props);

    // console.log(props);
    let expandedID = null;

    if (this.props.location.expandProjectType) {
      expandedID = this.props.location.expandProjectType.getID();
    }

    // Init an empty state
    this.state = {
      projectTypes: [],
      filteredProjectTypes: [],
      ProjectTypeFilter: '',
      error: null,
      loadingInProgress: false,
      expandedProjectTypeID: expandedID,
      showProjectTypeForm: false
    };
  }

  /** Fetches all ProjectTypesBOs from the backend */
  getProjectTypes = () => {
    ManagementAPI.getAPI().getProjectTypes()
      .then(projectTypeBOs =>
        this.setState({               // Set new state when ProjectTypeBOs have been fetched
          projectType: projectTypeBOs,
          filteredProjectTypes: [...projectTypeBOs], // store a copy
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
           projectTypes: [],
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
    this.getProjectTypes();
  }

  /**
   * Handles onExpandedStateChange events from the ProjectTypeListEntry component. Toggels the expanded state of
   * the ProjectTypeListEntry of the given CustomerBO.
   *
   * @param {module} ProjectTypeBO of the ProjectTypeListEntry to be toggeled
   */
  onExpandedStateChange = projectType => {
    // console.log(projectTypeID);
    // Set expandend projectType entry to null by default
    let newID = null;

    // If same projectType entry is clicked, collapse it else expand a new one
    if (projectType.getID() !== this.state.expandedProjectTypeID) {
      // Expand the projectType entry with ID
      newID = projectType.getID();
    }
    // console.log(newID);
    this.setState({
      expandedProjectTypeID: newID,
    });
  }

  /**
   * Handles onProjectTypeDeleted events from the ProjectTypeListEntry component
   *
   * @param {projectType} ProjectTypeBO of the ProjectTypeListEntry to be deleted
   */
  projectTypeDeleted = projectType => {
    const newProjectTypeList = this.state.projectTypes.filter(projectTypeFromState => projectTypeFromState.getID() !==projectType.getID());
    this.setState({
      projectType: newProjectTypeList,
      filteredProjectTypes: [...newProjectTypeList],
      showProjectTypeForm: false
    });
  }

  /** Handles the onClick event of the add projectType button */
  addProjectTypeButtonClicked = event => {
    // Do not toggle the expanded state
    event.stopPropagation();
    //Show the ProjectTypeForm
    this.setState({
      showProjectTypeForm: true
    });
  }

  /** Handles the onClose event of the ProjectTypeForm */
  projectTypeFormClosed = projectType => {
    // projectType is not null and therefore created
    if (projectType) {
      const newProjectTypeList = [...this.state.projectType,projectType];
      this.setState({
        projectTypes: newProjectTypeList,
        filteredProjectTypes: [...newProjectTypeList],
        showProjectTypeForm: false
      });
    } else {
      this.setState({
        showProjectTypeForm: false
      });
    }
  }

  /** Handels onChange events of the module filter text field */
  filterFieldValueChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredProjectTypes: this.state.projectTypes.filter(projectType => {
        let NameContainsValue = projectType.getName().toLowerCase().includes(value);
        let SwsContainsValue = projectType.getSws().toLowerCase().includes(value);
        let EctsContainsValue = projectType.getEcts().toLowerCase().includes(value);

        return SwsContainsValue || EctsContainsValue || NameContainsValue
      }),
      projectTypeFilter: value
    });
  }

  /** Handles the onClose event of the clear filter button */
  clearFilterFieldButtonClicked = () => {
    // Reset the filter
    this.setState({
      filteredProjectTypes: [...this.state.projectTypes],
      projectTypeFilter: ''
    });
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { filteredProjectTypes, projectTypeFilter, expandedProjectTypeID, loadingInProgress, error, showProjectTypeForm } = this.state;

    return (
      <div className={classes.root}>
        <Grid className={classes.projectTypeFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
              Filter projectType list by name:
              </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              id='projectTypeFilter'
              type='text'
              value={projectTypeFilter}
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
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addProjectTypeButtonClicked}>
              Add Project Type
          </Button>
          </Grid>
        </Grid>
        {
          // Show the list of ProjectTypeListEntry components
          // Do not use strict comparison, since  maybe a string if given from the URL parameters
          filteredProjectTypes.map(projectType =>
            <ProjectTypeListEntry key={projectType.getID()} projectType={projectType} expandedState={expandedProjectTypeID === projectType.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
              onProjectTypeDeleted={this.projectTypeDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of projectTypes could not be loaded.`} onReload={this.getProjectTypes} />
        <ProjectTypeForm show={showProjectTypeForm} onClose={this.projectTypeFormClosed} />
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
ProjectTypeList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ProjectTypeList));