import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ManagementAPiAPI, ParticipationBO } from '../../api';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';


/**
 * Shows a modal form dialog for a ParticipationBO in prop customer. If the participation is set, the dialog is configured
 * as an edit dialog and the text fields of the form are filled from the given CustomerBO object.
 * If the participation is null, the dialog is configured as a new participation dialog and the textfields are empty.
 * In dependency of the edit/new state, the respective backend calls are made to update or create a customer.
 * After that, the function of the onClose prop is called with the created/update CustomerBO object as parameter.
 * When the dialog is canceled, onClose is called with null.
 *
 * @see See Material-UIs [Dialog](https://material-ui.com/components/dialogs)
 * @see See Material-UIs [TextField](https://material-ui.com/components/text-fields//)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class ParticipationForm extends Component {

  constructor(props) {
    super(props);

    let pr = '', st = '';
    if (props.participation) {
      pr = props.participation.getProject();
      st = props.participation.getStudent();
    }

    // Init the state
    this.state = {
      project: pr,
      projectValidationFailed: false,
      projectEdited: false,
      student: st,
      studentValidationFailed: false,
      studentEdited: false,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null
    };
    // save this state for canceling
    this.baseState = this.state;
  }

  /** Adds the participation */
  addParticipation = () => {
    let newParticipation = new ParticipationBO(this.state.project, this.state.student);
    ProjectAPI.getAPI().addParticipation(newParticipation).then(participation => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty participation
      this.setState(this.baseState);
      this.props.onClose(participation); // call the parent with the participation object from backend
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

  /** Updates the participation */
  updateParticipation = () => {
    // clone the original participation, in case the backend call fails
    let updatedParticipation = Object.assign(new ParticipationBO(), this.props.participation);
    // set the new attributes from our dialog
    updatedParticipation.setProject(this.state.project);
    updatedParticipation.setStudent(this.state.student);
    ProjectAPI.getAPI().updateParticipation(updatedParticipation).then(participation => {
      this.setState({
        updatingInProgress: false,              // disable loading indicator
        updatingError: null                     // no error message
      });
      // keep the new state as base state
      this.baseState.project = this.state.project;
      this.baseState.student = this.state.student;
      this.props.onClose(updatedParticipation);      // call the parent with the new participation
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
    const { classes, participation, show } = this.props;
    const { project, projectValidationFailed, projectEdited, student, studentValidationFailed, studentEdited, addingInProgress,
      addingError, updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    if (participation) {
      // participation defindet, so ist an edit dialog
      title = 'Update a participation';
      header = `Participation ID: ${participation.getID()}`;
    } else {
      title = 'Create a new participation';
      header = 'Enter participation data';
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
              <TextField autoFocus type='text' required fullWidth margin='normal' id='project' label='Project:' value={project}
                onChange={this.textFieldValueChange} error={projectValidationFailed}
                helperText={projectValidationFailed ? 'The Project must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='student' label='Student:' value={student}
                onChange={this.textFieldValueChange} error={StudentValidationFailed}
                helperText={StudentValidationFailed ? 'The student must contain at least one character' : ' '} />
            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Show error message in dependency of participation prop
              participation ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The participation ${participation.getID()} could not be updated.`} onReload={this.updateParticipation} />
                :
                <ContextErrorMessage error={addingError} contextErrorMsg={`The participation could not be added.`} onReload={this.addParticipation} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            {
              // If a participation is given, show an update button, else an add button
              customer ?
                <Button disabled={projectValidationFailed || studentValidationFailed} variant='contained' onClick={this.updateParticipation} color='primary'>
                  Update
              </Button>
                : <Button disabled={projectValidationFailed || !projectEdited || studentValidationFailed || !studentEdited} variant='contained' onClick={this.addParticipation} color='primary'>
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
ParticipationForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ParticipationBO to be edited */
  participation: PropTypes.object,
  /** If true, the form is rendered */
  show: PropTypes.bool.isRequired,
  /**
   * Handler function which is called, when the dialog is closed.
   * Sends the edited or created ParticipationBO as parameter or null, if cancel was pressed.
   *
   * Signature: onClose(ParticipationBO customer);
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ParticipationForm);