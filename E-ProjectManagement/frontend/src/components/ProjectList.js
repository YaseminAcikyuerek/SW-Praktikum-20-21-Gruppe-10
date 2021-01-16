import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import { ManagementAPI } from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ProjectForm from './dialogs/ProjectForm';
import ProjectListEntry from './ProjectListEntry';

/**
 * Controlls a list of CustomerListEntrys to create a accordion for each customer.
 *
 * @see See [CustomerListEntry](#customerlistentry)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class ProjectList extends Component {

  constructor(props) {
    super(props);

    // console.log(props);
    let expandedID = null;

    if (this.props.location.expandProject) {
      expandedID = this.props.location.expandProject.getID();
    }

    // Init an empty state
    this.state = {
      projects: [],
      filteredProjects: [],
      customerFilter: '',
      error: null,
      loadingInProgress: false,
      expandedCustomerID: expandedID,
      showCustomerForm: false
    };
  }

  /** Fetches all CustomerBOs from the backend */
  getCustomers = () => {
    ManagementAPI.getAPI().getProjects()
      .then(projectBOs =>
        this.setState({               // Set new state when CustomerBOs have been fetched
          projects: projectBOs,
          filteredProjects: [...projectBOs], // store a copy
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
           projects: [],
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
    this.getProjects();
  }

  /**
   * Handles onExpandedStateChange events from the CustomerListEntry component. Toggels the expanded state of
   * the CustomerListEntry of the given CustomerBO.
   *
   * @param {customer} CustomerBO of the CustomerListEntry to be toggeled
   */
  onExpandedStateChange = project => {
    // console.log(customerID);
    // Set expandend customer entry to null by default
    let newID = null;

    // If same customer entry is clicked, collapse it else expand a new one
    if (project.getID() !== this.state.expandedProjectID) {
      // Expand the customer entry with customerID
      newID = project.getID();
    }
    // console.log(newID);
    this.setState({
      expandedProjectID: newID,
    });
  }

  /**
   * Handles onCustomerDeleted events from the CustomerListEntry component
   *
   * @param {customer} CustomerBO of the CustomerListEntry to be deleted
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
    // customer is not null and therefore created
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

  /** Handels onChange events of the customer filter text field */
  filterFieldValueChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredProjects: this.state.projects.filter(customer => {
        let firstNameContainsValue = customer.getFirstName().toLowerCase().includes(value);
        let lastNameContainsValue = customer.getLastName().toLowerCase().includes(value);
        return firstNameContainsValue || lastNameContainsValue;
      }),
      customerFilter: value
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
    const { filteredProjects, projectFilter, expandedProjectID, loadingInProgress, error, showProjectForm } = this.state;

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
              Add Customer
          </Button>
          </Grid>
        </Grid>
        {
          // Show the list of CustomerListEntry components
          // Do not use strict comparison, since expandedCustomerID maybe a string if given from the URL parameters
          filteredProjects.map(project =>
            <ProjectListEntry key={project.getID()} project={project} expandedState={expandedProjectID === project.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
              onProjectDeleted={this.projectDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`} onReload={this.getCustomers} />
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
  customerFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }
});

/** PropTypes */
ProjectList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ProjectList));