import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import StudentForm from './dialogs/StudentForm';
import StudentListEntry from './StudentListEntry';

/**
 * Controlls a list of CustomerListEntrys to create a accordion for each customer.
 *
 * @see See [CustomerListEntry](#customerlistentry)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class StudentList extends Component {

  constructor(props) {
    super(props);

    // console.log(props);
    let expandedID = null;

    if (this.props.location.expandStudent) {
      expandedID = this.props.location.expandStudent.getID();
    }

    // Init an empty state
    this.state = {
      student: [],
      filteredStudent: [],
      studentFilter: '',
      error: null,
      loadingInProgress: false,
      expandedStudentID: expandedID,
      showStudentForm: false
    };
  }

  /** Fetches all CustomerBOs from the backend */
  getStudent = () => {
    ManagementAPI.getAPI().getStudent()

      .then(studentBOs =>
        this.setState({               // Set new state when CustomerBOs have been fetched
         student: studentBOs,
          filteredStudent: [...studentBOs], // store a copy
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
           student: [],
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
    this.getStudent();
  }

  /**
   * Handles onExpandedStateChange events from the CustomerListEntry component. Toggels the expanded state of
   * the CustomerListEntry of the given CustomerBO.
   *
   * @param {customer} CustomerBO of the CustomerListEntry to be toggeled
   */
  onExpandedStateChange = student => {
    // console.log(customerID);
    // Set expandend customer entry to null by default
    let newID = null;

    // If same customer entry is clicked, collapse it else expand a new one
    if (student.getID() !== this.state.expandedStudentID) {
      // Expand the customer entry with customerID
      newID = student.getID();
    }
    // console.log(newID);
    this.setState({
      expandedStudentID: newID,
    });
  }

  /**
   * Handles onCustomerDeleted events from the CustomerListEntry component
   *
   * @param {customer} CustomerBO of the CustomerListEntry to be deleted
   */
  studentDeleted = student => {
    const newStudenList = this.state.student.filter(studentFromState => studentFromState.getID() !== student.getID());
    this.setState({
      student: newCustomrList,
      filteredCustomers: [...newStudenList],
      showStudentForm: false
    });
  }

  /** Handles the onClick event of the add customer button */
  addStudentButtonClicked = event => {
    // Do not toggle the expanded state
    event.stopPropagation();
    //Show the CustmerForm
    this.setState({
      showStudentForm: true
    });
  }

  /** Handles the onClose event of the CustomerForm */
  studentFormClosed = student => {
    // customer is not null and therefore created
    if (student) {
      const newStudenList = [...this.state.student, student];
      this.setState({
        student: newStudenList,
        filteredStudent: [...newStudenList],
        showStudentForm: false
      });
    } else {
      this.setState({
        showStudentForm: false
      });
    }
  }

  /** Handels onChange events of the customer filter text field */
  filterFieldValueChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredStudent: this.state.student.filter(student => {
        let CourseAbbrContainsValue = student.getCourseAbbr().toLowerCase().includes(value);
        let MatriculationNrContainsValue = student.getMatriculationNr().toLowerCase().includes(value);
        return CourseAbbrContainsValue || MatriculationNrContainsValue;
      }),
      studentFilter: value
    });
  }

  /** Handles the onClose event of the clear filter button */
  clearFilterFieldButtonClicked = () => {
    // Reset the filter
    this.setState({
      filtereStudent: [...this.state.student],
      studentFilter: ''
    });
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { filteredStudent, studentFilter, expandedStudentID, loadingInProgress, error, showStudentForm } = this.state;

    return (
      <div className={classes.root}>
        <Grid className={classes.studentFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
              Filter student list course_abbr :
              </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              id='studentFilter'
              type='text'
              value={studentFilter}
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
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addCustomerButtonClicked}>
              Add Customer
          </Button>
          </Grid>
        </Grid>
        {
          // Show the list of CustomerListEntry components
          // Do not use strict comparison, since expandedCustomerID maybe a string if given from the URL parameters
          filteredStudent.map(student =>
            <StudentListEntry key={student.getID()} student={student} expandedState={expandedStudentID === student.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
              onStudentDeleted={this.studentDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of student could not be loaded.`} onReload={this.getStudent} />
        <StudentForm show={showStudentForm} onClose={this.studentFormClosed} />
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  studentFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }
});

/** PropTypes */
StudentList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(StudentList));