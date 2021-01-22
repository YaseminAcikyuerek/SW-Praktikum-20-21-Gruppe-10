import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ModuleForm from './dialogs/ModuleForm';
import ModuleListEntry from './ModuleListEntry';

/**
 * Controlls a list of ModuleListEntrys to create a accordion for each customer.
 *
 * @see See [ModuleListEntry](#modulelistentry)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class ModuleList extends Component {

  constructor(props) {
    super(props);

    // console.log(props);
    let expandedID = null;

    if (this.props.location.expandModule) {
      expandedID = this.props.location.expandModule.getID();
    }

    // Init an empty state
    this.state = {
      modules: [],
      filteredModules: [],
      ModuleFilter: '',
      error: null,
      loadingInProgress: false,
      expandedModuleID: expandedID,
      showModuleForm: false
    };
  }

  /** Fetches all ModulesBOs from the backend */
  getModules = () => {
    ManagementAPI.getAPI().getModules()
      .then(moduleBOs =>
        this.setState({               // Set new state when ModuleBOs have been fetched
          modules: moduleBOs,
          filteredModules: [...moduleBOs], // store a copy
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
           modules: [],
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
    this.getModules();
  }

  /**
   * Handles onExpandedStateChange events from the ModuleListEntry component. Toggels the expanded state of
   * the ModuleListEntry of the given CustomerBO.
   *
   * @param {module} ModuleBO of the CustomerListEntry to be toggeled
   */
  onExpandedStateChange = module => {
    // console.log(moduleID);
    // Set expandend module entry to null by default
    let newID = null;

    // If same customer entry is clicked, collapse it else expand a new one
    if (module.getID() !== this.state.expandedModuleID) {
      // Expand the customer entry with customerID
      newID = module.getID();
    }
    // console.log(newID);
    this.setState({
      expandedModuleID: newID,
    });
  }

  /**
   * Handles onModuleDeleted events from the ModuleListEntry component
   *
   * @param {moduler} ModuleBO of the CustomerListEntry to be deleted
   */
  moduleDeleted = module => {
    const newModuleList = this.state.modules.filter(moduleFromState => moduleFromState.getID() !==module.getID());
    this.setState({
      modules: newModuleList,
      filteredModules: [...newModuleList],
      showModuleForm: false
    });
  }

  /** Handles the onClick event of the add module button */
  addModuleButtonClicked = event => {
    // Do not toggle the expanded state
    event.stopPropagation();
    //Show the ModuleForm
    this.setState({
      showModuleForm: true
    });
  }

  /** Handles the onClose event of the ModuleForm */
  moduleFormClosed = module => {
    // customer is not null and therefore created
    if (module) {
      const newModuleList = [...this.state.modules,module];
      this.setState({
        modules: newModuleList,
        filteredModules: [...newModuleList],
        showModuleForm: false
      });
    } else {
      this.setState({
        showModuleForm: false
      });
    }
  }

  /** Handels onChange events of the module filter text field */
  filterFieldValueChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredModules: this.state.modules.filter(module => {
        let NameContainsValue = module.getName().toLowerCase().includes(value);
        let EdvNrContainsValue = module.getEdvNr().toLowerCase().includes(value);

        return NameContainsValue || EdvNrContainsValue
      }),
      moduleFilter: value
    });
  }

  /** Handles the onClose event of the clear filter button */
  clearFilterFieldButtonClicked = () => {
    // Reset the filter
    this.setState({
      filteredModules: [...this.state.modules],
      moduleFilter: ''
    });
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { filteredModules, moduleFilter, expandedModuleID, loadingInProgress, error, showModuleForm } = this.state;

    return (
      <div className={classes.root}>
        <Grid className={classes.moduleFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
              Filter module list by name:
              </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              id='moduleFilter'
              type='text'
              value={moduleFilter}
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
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addModuleButtonClicked}>
              Add Module
          </Button>
          </Grid>
        </Grid>
        {
          // Show the list of ModuleListEntry components
          // Do not use strict comparison, since expandedCustomerID maybe a string if given from the URL parameters
          filteredModules.map(module =>
            <ModuleListEntry key={module.getID()} module={module} expandedState={expandedModuleID === module.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
              onModuleDeleted={this.moduleDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of modules could not be loaded.`} onReload={this.getModules} />
        <ModuleForm show={showModuleForm} onClose={this.moduleFormClosed} />
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
ModuleList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ModuleList));