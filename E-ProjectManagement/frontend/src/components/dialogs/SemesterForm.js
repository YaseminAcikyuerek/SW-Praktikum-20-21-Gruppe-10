import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ManagementAPI, SemesterBO } from '../../api/ManagementAPI';
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
class SemesterForm extends Component {

  constructor(props) {
    super(props);

    let n = '', st = ''; en= '';
    if (props.semester) {
      n = props.semester.getName();
      st = props.semester.getStart();
      en = props.semester.getEnd();
    }

    // Init the state
    this.state = {
      name: fn,
      nameValidationFailed: false,
      nameEdited: false,
      start: st,
      startValidationFailed: false,
      startEdited: false,
      end: st,
      endValidationFailed: false,
      endEdited: false,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null
    };
    // save this state for canceling
    this.baseState = this.state;
  }

  /** Adds the semester */
  addSemester = () => {
    let newSemester = new SemesterBO(this.state.name, this.state.start, this.state.end);
    ProjectAPI.getAPI().addSemester(newSemester).then(semester => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty semester
      this.setState(this.baseState);
      this.props.onClose(semester); // call the parent with the semester object from backend
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

  /** Updates the semester */
  updateSemester = () => {
    // clone the original semester, in case the backend call fails
    let updatedSemester = Object.assign(new SemesterBO(), this.props.semester);
    // set the new attributes from our dialog
    updatedSemester.setName(this.state.name);
    updatedSemester.setStart(this.state.start);
    updatedSemester.setEnd(this.state.end);
    ProjectAPI.getAPI().updateSemester(updatedSemester).then(semester => {
      this.setState({
        updatingInProgress: false,              // disable loading indicator
        updatingError: null                     // no error message
      });
      // keep the new state as base state
      this.baseState.name = this.state.name;
      this.baseState.start = this.state.start;
      this.baseState.end = this.state.end;
      this.props.onClose(updatedSemester);      // call the parent with the new semester
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
    const { classes, semester, show } = this.props;
    const { name, nameValidationFailed, nameEdited, start, startValidationFailed, startEdited,
    end, endValidationFailed, endEdited,addingInProgress, addingError, updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    if (semester) {
      // semester defindet, so ist an edit dialog
      title = 'Update a semester';
      header = `Semester ID: ${semester.getID()}`;
    } else {
      title = 'Create a new semester';
      header = 'Enter semester data';
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
              <TextField type='text' required fullWidth margin='normal' id='start' label='Start:' value={start}
                onChange={this.textFieldValueChange} error={startValidationFailed}
                helperText={startValidationFailed ? 'The start must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='end' label='End:' value={end}
                onChange={this.textFieldValueChange} error={endValidationFailed}
                helperText={endValidationFailed ? 'The End must contain at least one character' : ' '} />
            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Show error message in dependency of semester prop
              semester ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The semester ${semester.getID()} could not be updated.`} onReload={this.updateSemester} />
                :
                <ContextErrorMessage error={addingError} contextErrorMsg={`The semester could not be added.`} onReload={this.addSemester} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            {
              // If a semester is given, show an update button, else an add button
              customer ?
                <Button disabled={nameValidationFailed || startValidationFailed || endValidationFailed} variant='contained' onClick={this.updateSemester} color='primary'>
                  Update
              </Button>
                : <Button disabled={nameValidationFailed || !nameEdited || startValidationFailed || !startEdited ||
                endValidationFailed || !endEdited} variant='contained' onClick={this.addSemester} color='primary'>
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
SemesterForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The SemesterBO to be edited */
  customer: PropTypes.object,
  /** If true, the form is rendered */
  show: PropTypes.bool.isRequired,
  /**
   * Handler function which is called, when the dialog is closed.
   * Sends the edited or created SemesterBO as parameter or null, if cancel was pressed.
   *
   * Signature: onClose(SemesterBO semester);
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(SemesterForm);