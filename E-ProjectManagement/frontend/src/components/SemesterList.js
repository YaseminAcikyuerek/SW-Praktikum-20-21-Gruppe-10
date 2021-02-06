import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import SemesterForm from './dialogs/SemesterForm';
import SemesterListEntry from './SemesterListEntry';

/**
 * Controlls a list of SemesterListEntrys to create a accordion for each semester.
 */
class SemesterList extends Component {

  constructor(props) {
    super(props);

    // console.log(props);


    // Init an empty state
    this.state = {
      semester: [],
      filteredSemesters: [],
      semesterFilter: '',
      error: null,
      loadingInProgress: false,
      showSemesterForm: false
    };
  }

  /** Fetches all SemesterBOs from the backend */
  getSemesters = () => {
    ManagementAPI.getAPI().getSemesters()
        .then(semesterBOs =>
        this.setState({               // Set new state when SemesterBOs have been fetched
          semester: semesterBOs,
          filteredSemesters: [...semesterBOs], // store a copy
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
            semester: [],
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
    this.getSemesters();
  }

  /**
   * Handles onExpandedStateChange events from the SemesterListEntry component. Toggels the expanded state of
   * the SemesterListEntry of the given SemesterBO.
   *
   * @param {module} SemesterBO of the SemesterListEntry to be toggeled
   */


  /**
   * Handles onSemesterDeleted events from the SemesterListEntry component
   *
   * @param {semester} SemesterBO of the SemesterListEntry to be deleted
   */
  semesterDeleted = semester => {
    const newSemesterList = this.state.semester.filter(semesterFromState => semesterFromState.getID() !==semester.getID());
    this.setState({
      semester: newSemesterList,
      filteredSemesters: [...newSemesterList],
      showSemesterForm: false
    });
  }

  /** Handles the onClick event of the add module button */
  addSemesterButtonClicked = event => {
    // Do not toggle the expanded state
    event.stopPropagation();
    //Show the SemesterForm
    this.setState({
      showSemesterForm: true
    });
  }

  /** Handles the onClose event of the ModuleForm */
  semesterFormClosed = semester => {
    // semester is not null and therefore created
    if (semester) {
      const newSemesterList = [...this.state.semester,semester];
      this.setState({
        semester: newSemesterList,
        filteredSemesters: [...newSemesterList],
        showSemesterForm: false
      });
    } else {
      this.setState({
        showSemesterForm: false
      });
    }
  }

  /** Handels onChange events of the semster filter text field */
  filterFieldValueChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredSemesters: this.state.semester.filter(semester => {
        let NameContainsValue = semester.getName().toLowerCase().includes(value);
        let startContainsValue = semester.getStart().toLowerCase().includes(value);
        let endContainsValue = semester.getEnd().toLowerCase().includes(value);

        return NameContainsValue || startContainsValue || endContainsValue
      }),
      semesterFilter: value
    });
  }

  /** Handles the onClose event of the clear filter button */
  clearFilterFieldButtonClicked = () => {
    // Reset the filter
    this.setState({
      filteredSemesters: [...this.state.semester],
      semesterFilter: ''
    });
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { semester, semesterFilter, loadingInProgress, error, showSemesterForm } = this.state;

    return (

      <div className={classes.root}>
        <Grid className={classes.semesterFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
              Filter semester list by name:
              </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              id='semesterFilter'
              type='text'
              value={semesterFilter}
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
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addSemesterButtonClicked}>
              Add Semester
          </Button>
          </Grid>
        </Grid>

        {
          semester.map(semester =>
            <SemesterListEntry key={semester.getID()} semester={semester}
              onSemesterDeleted={this.semesterDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of semesters could not be loaded.`} onReload={this.getSemesters} />
        <SemesterForm show={showSemesterForm} onClose={this.semesterFormClosed} />
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
SemesterList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(SemesterList));