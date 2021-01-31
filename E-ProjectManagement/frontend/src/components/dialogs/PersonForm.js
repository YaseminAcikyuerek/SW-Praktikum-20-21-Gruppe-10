import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ManagementAPI from '../../api/ManagementAPI';
import PersonBO from  '../../api/PersonBO';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';



class PersonForm extends Component {

  constructor(props) {
    super(props);

    let na = '', ro = '',em = '',gui = '';
    if (props.person) {
      na = props.person.getName();
      ro = props.person.getRole();
      em = props.person.getEmail();
      gui = props.person.getGoogleUserId();
    }

    // Init the state
    this.state = {
      name: na,
      nameValidationFailed: false,
      nameEdited: false,
      role: ro,
      roleValidationFailed: false,
      roleEdited: false,
      email: em,
      emailValidationFailed: false,
      emailEdited: false,
      google_user_id: gui,
      google_user_idValidationFailed: false,
      google_user_idEdited: false,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null
    };
    // save this state for canceling
    this.baseState = this.state;
  }

  /** Adds the person */
  addPerson = () => {
    let newPerson = new PersonBO(this.state.name, this.state.role, this.state.email, this.state.google_user_id);
    ManagementAPI.getAPI().addPerson(newPerson).then(person => {
    console.log(newPerson)
      // Backend call sucessfull
      // reinit the dialogs state for a new empty person
      this.setState(this.baseState);
      this.props.onClose(person); // call the parent with the person object from backend
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

  /** Updates the person */
  updatePerson = () => {

    let updatedPerson = Object.assign(new PersonBO(), this.props.person);

    updatedPerson.setName(this.state.name);
    updatedPerson.setRole(this.state.role);
    updatedPerson.setEmail(this.state.email);
    updatedPerson.setGoogleUserId(this.state.google_user_id);

    ManagementAPI.getAPI().updatePerson(updatedPerson).then(person => {
      this.setState({
        updatingInProgress: false,              // disable loading indicator
        updatingError: null                     // no error message
      });
      // keep the new state as base state
      this.baseState.name = this.state.name;
      this.baseState.role = this.state.role;
      this.baseState.email = this.state.email;
      this.baseState.google_user_id = this.state.google_user_id;
      this.props.onClose(updatedPerson);      // call the parent with the new person
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
    const { classes, person, show } = this.props;
    const { name, nameValidationFailed, nameEdited, role, roleValidationFailed, roleEdited, email, emailValidationFailed, emailEdited, google_user_id, google_user_idValidationFailed, google_user_idEdited,
      addingInProgress,
      addingError, updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    if (person) {
      // person defindet, so ist an edit dialog
      title = 'Update a person';
      header = `Person ID: ${person.getID()}`;
    } else {
      title = 'Create a new person';
      header = 'Enter person data';
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
              <TextField type='text' required fullWidth margin='normal' id='role' label='Role:' value={role}
                onChange={this.textFieldValueChange} error={roleValidationFailed}
                helperText={roleValidationFailed ? 'The role must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='email' label='Email:' value={email}
                onChange={this.textFieldValueChange} error={emailValidationFailed}
                helperText={emailValidationFailed ? 'The email must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='google_user_id' label='GoogleUserId:' value={google_user_id}
                onChange={this.textFieldValueChange} error={google_user_idValidationFailed}
                helperText={google_user_idValidationFailed ? 'The google_user_id must contain at least one character' : ' '} />

            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Show error message in dependency of person prop
              person ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The person ${person.getID()} could not be updated.`} onReload={this.updatePerson} />
                :
                <ContextErrorMessage error={addingError} contextErrorMsg={`The person could not be added.`} onReload={this.addPerson} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            {
              // If a person is given, show an update button, else an add button
              person ?
                <Button disabled={nameValidationFailed || roleValidationFailed || emailValidationFailed || google_user_idValidationFailed} variant='contained' onClick={this.updatePerson} color='primary'>
                  Update
              </Button>
                : <Button disabled={nameValidationFailed || !nameEdited || roleValidationFailed || !roleEdited || emailValidationFailed || !emailEdited || google_user_idValidationFailed || !google_user_idEdited} variant='contained' onClick={this.addPerson} color='primary'>
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
PersonForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The PersonBO to be edited */
  person: PropTypes.object,
  /** If true, the form is rendered */
  show: PropTypes.bool.isRequired,
  /**
   * Handler function which is called, when the dialog is closed.
   * Sends the edited or created CustomerBO as parameter or null, if cancel was pressed.
   *
   * Signature: onClose(PersonBO person);
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(PersonForm);