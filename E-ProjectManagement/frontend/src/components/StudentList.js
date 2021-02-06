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
 */
class StudentList extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      student: [],
      error: null,
      loadingInProgress: false,
      showStudentForm: false
    };
  }

  /** Fetches all StudentBOs from the backend */
  getStudent = () => {
    ManagementAPI.getAPI().getStudents()
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
   * Handles onCustomerDeleted events from the CustomerListEntry component
   *
   * @param {student} StudentBO of the CustomerListEntry to be deleted
   */
  studentDeleted = student => {
    const newStudentList = this.state.student.filter(studentFromState => studentFromState.getID() !== student.getID());
    this.setState({
      student: newStudentList,
      filteredStudents: [...newStudentList],
      showStudentForm: false
    });
  }

  /** Handles the onClick event of the add student button */
  addStudentButtonClicked = event => {
    // Do not toggle the expanded state
    event.stopPropagation();
    //Show the StudentForm
    this.setState({
      showStudentForm: true
    });
  }

  /** Handles the onClose event of the StudentForm */
  studentFormClosed = student => {
    // customer is not null and therefore created
    if (student) {
      const newStudentList = [...this.state.student, student];
      this.setState({
        student: newStudentList,
        filteredStudent: [...newStudentList],
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
      filterStudent: [...this.state.student],
      studentFilter: ''
    });
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { student, loadingInProgress, error, showStudentForm } = this.state;

    return (
      <div className={classes.root}>
        <Grid className={classes.studentFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item xs />
          <Grid item>
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addStudentButtonClicked}>
              Add Student
          </Button>
          </Grid>
        </Grid>
        {
          student.map(student =>
            <StudentListEntry key={student.getID()} student={student}
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