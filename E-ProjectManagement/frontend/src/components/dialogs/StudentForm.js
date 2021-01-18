import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ManagementAPI from "../../api/ManagementAPI";
import StudentBO from '../../api/StudentBO'
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';


/**
 * Shows a modal form dialog for a CustomerBO in prop customer. If the customer is set, the dialog is configured
 * as an edit dialog and the text fields of the form are filled from the given CustomerBO object.
 * If the customer is null, the dialog is configured as a new customer dialog and the textfields are empty.
 * In dependency of the edit/new state, the respective backend calls are made to update or create a customer.
 * After that, the function of the onClose prop is called with the created/update CustomerBO object as parameter.
 * When the dialog is canceled, onClose is called with null.
 *
 * @see See Material-UIs [Dialog](https://material-ui.com/components/dialogs)
 * @see See Material-UIs [TextField](https://material-ui.com/components/text-fields//)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class StudentForm extends Component {

  constructor(props) {
    super(props);

    let n = '', ca = '', mn = '';
    if (props.student) {
      n = props.student.getName();
      ca = props.student.getCourseAbbr();
      mn = props.student.getMatriculationNr();
    }

    // Init the state
    this.state = {
      name: n,
      nameValidationFailed: false,
      nameEdited: false,
      courseAbbr: ca,
      courseAbbrValidationFailed: false,
      courseAbbrEdited: false,
      matriculationNr: mn,
      matriculationNrValidationFailed: false,
      matriculationNrEdited: false,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null
    };
    // save this state for canceling
    this.baseState = this.state;
  }

  /** Adds the student */
  addStudent = () => {
    let newStudent = new StudentBO(this.state.name, this.state.courseAbbr, this.state.matriculationNr);
    ManagementAPI.getAPI().addStudent(newStudent).then(student => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty student
      this.setState(this.baseState);
      this.props.onClose(student); // call the parent with the student object from backend
    }).catch(e =>
      this.setState({
        updatingInProgress: false,    // disable loading indicator
        updatingError: e              // show error message
      })
    );

    // set loading to true
    this.setState({
      updatingInProgress: true,       // show loading indicator
      updatingError: null             // disable error message
    });
  }

  /** Updates the student */
  updateStudent = () => {
    // clone the original student, in case the backend call fails
    let updatedStudent = Object.assign(new StudentBO(), this.props.student);
    // set the new attributes from our dialog
    updatedStudent.setName(this.state.name);
    updatedStudent.setCourseAbbr(this.state.courseAbbr);
    updatedStudent.setMatriculationNr(this.state.matriculationNr);
    ManagementAPI.getAPI().updateStudent(updatedStudent).then(student => {
      this.setState({
        updatingInProgress: false,              // disable loading indicator
        updatingError: null                     // no error message
      });
      // keep the new state as base state
      this.baseState.name = this.state.name;
      this.baseState.courseAbbr = this.state.courseAbbr;
      this.baseState.matriculationNr = this.state.matriculationNr;
      this.props.onClose(updatedStudent);     // call the parent with the new student
    }).catch(e =>
      this.setState({
        updatingInProgress: false,              // disable loading indicator
        updatingError: e                        // show error message
      })
    );

    // set loading to true
    this.setState({
      updatingInProgress: true,                 // show loading indicator
      updatingError: null                       // disable error message
    });
  }

  /** Handles value changes of the forms textfields and validates them */
  textFieldValueChange = (event) => {
    const value = event.target.value;

    let error = false;
    if (value.trim().length === 0) {
      error = true;
    }

    this.setState({
      [event.target.id]: event.target.value,
      [event.target.id + 'ValidationFailed']: error,
      [event.target.id + 'Edited']: true
    });
  }

  /** Handles the close / cancel button click event */
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }

  /** Renders the component */
  render() {
    const { classes, student, show } = this.props;
    const { name, nameValidationFailed, nameEdited, courseAbbr, courseAbbrValidationFailed, courseAbbrEdited,
    matriculationNr, matriculationNrValidationFailed, matriculationNrEdited,
    addingInProgress, addingError, updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    if (student) {
      // student defindet, so ist an edit dialog
      title = 'Update a student';
      header = `Student ID: ${student.getID()}`;
    } else {
      title = 'Create a new student';
      header = 'Enter student data';
    }

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogTitle id='form-dialog-title'>{title}
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {header}
            </DialogContentText>
            <form className={classes.root} noValidate autoComplete='off'>
              <TextField autoFocus type='text' required fullWidth margin='normal' id='name' label='Name:' value={name}
                onChange={this.textFieldValueChange} error={nameValidationFailed}
                helperText={nameValidationFailed ? 'The name must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='courseAbbr' label='Course Abbr:' value={courseAbbr}
                onChange={this.textFieldValueChange} error={courseAbbrValidationFailed}
                helperText={courseAbbrValidationFailed ? 'The Course Abbr must contain at least one character' : ' '} />
               <TextField type='text' required fullWidth margin='normal' id='matriculationNr' label='Matriculation Nr:' value={matriculationNr}
                onChange={this.textFieldValueChange} error={matriculationNrValidationFailed}
                helperText={matriculationNrValidationFailed ? 'The matriculation number must contain at least one character' : ' '} />
            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Show error message in dependency of customer prop
              student ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The student ${student.getID()} could not be updated.`} onReload={this.updateStudent} />
                :
                <ContextErrorMessage error={addingError} contextErrorMsg={`The student could not be added.`} onReload={this.addStudent} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            {
              // If a student is given, show an update button, else an add button
              student ?
                <Button disabled={nameValidationFailed || courseAbbrValidationFailed || matriculationNrValidationFailed} variant='contained' onClick={this.updateSemester} color='primary'>
                  Update
              </Button>
                : <Button disabled={nameValidationFailed || !nameEdited || courseAbbrValidationFailed || !courseAbbrEdited || matriculationNrValidationFailed || !matriculationNrEdited} variant='contained' onClick={this.addStudent} color='primary'>
                  Add
             </Button>
            }
          </DialogActions>
        </Dialog>
        : null
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

/** PropTypes */
StudentForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The StudentBO to be edited */
  student: PropTypes.object,
  /** If true, the form is rendered */
  show: PropTypes.bool.isRequired,
  /**
   * Handler function which is called, when the dialog is closed.
   * Sends the edited or created StudentBO as parameter or null, if cancel was pressed.
   *
   * Signature: onClose(StudentBO student);
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(StudentForm);