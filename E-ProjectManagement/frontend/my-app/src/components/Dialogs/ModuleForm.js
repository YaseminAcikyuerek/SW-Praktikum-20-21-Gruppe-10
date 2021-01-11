import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ProjectAPI, ModuleBO } from '../../api';
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
class CustomerForm extends Component {

  constructor(props) {
    super(props);

    let n = '', enr = '';
    if (props.customer) {
      n = props.customer.getName();
      enr = props.customer.getEdvNr();
    }

    // Init the state
    this.state = {
      name: n,
      nameValidationFailed: false,
      nameEdited: false,
      edvNr: enr,
      enrNrValidationFailed: false,
      enrEdited: false,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null
    };
    // save this state for canceling
    this.baseState = this.state;
  }

  /** Adds the module */
  addModule = () => {
    let newModule = new ModuleBO(this.state.name, this.state.edvNr);
    ProjectAPI.getAPI().addModule(newModule).then(module => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty module
      this.setState(this.baseState);
      this.props.onClose(module); // call the parent with the module object from backend
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

  /** Updates the module */
  updateModule = () => {
    // clone the original module, in case the backend call fails
    let updatedModule = Object.assign(new ModuleBO(), this.props.module);
    // set the new attributes from our dialog
    updatedModule.setName(this.state.name);
    updatedModule.setEdvNr(this.state.edvNr);
    ProjectAPI.getAPI().updateModule(updatedModule).then(module => {
      this.setState({
        updatingInProgress: false,              // disable loading indicator
        updatingError: null                     // no error message
      });
      // keep the new state as base state
      this.baseState.name = this.state.name;
      this.baseState.edvNr = this.state.edvNr;
      this.props.onClose(updatedModule);      // call the parent with the new module
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
    const { classes, module, show } = this.props;
    const { name, nameValidationFailed, nameEdited, edvNr, edvNrValidationFailed, edvNrEdited, addingInProgress,
      addingError, updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    if (module) {
      // module defindet, so ist an edit dialog
      title = 'Update a module';
      header = `Module ID: ${module.getID()}`;
    } else {
      title = 'Create a new module';
      header = 'Enter module data';
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
              <TextField type='text' required fullWidth margin='normal' id='edvNr' label='EDV Nummer:' value={edvNr}
                onChange={this.textFieldValueChange} error={edvNrValidationFailed}
                helperText={edvNrValidationFailed ? 'The EDV number must contain at least one character' : ' '} />
            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Show error message in dependency of module prop
              customer ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The module ${module.getID()} could not be updated.`} onReload={this.updateModule} />
                :
                <ContextErrorMessage error={addingError} contextErrorMsg={`The module could not be added.`} onReload={this.addModule} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            {
              // If a module is given, show an update button, else an add button
              customer ?
                <Button disabled={nameValidationFailed || edvNrValidationFailed} variant='contained' onClick={this.updateModule} color='primary'>
                  Update
              </Button>
                : <Button disabled={nameValidationFailed || !nameEdited || edvNrValidationFailed || !edvNrEdited} variant='contained' onClick={this.addModule} color='primary'>
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
ModuleForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ModuleBO to be edited */
  module: PropTypes.object,
  /** If true, the form is rendered */
  show: PropTypes.bool.isRequired,
  /**
   * Handler function which is called, when the dialog is closed.
   * Sends the edited or created CustomerBO as parameter or null, if cancel was pressed.
   *
   * Signature: onClose(ModuleBO module);
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ModuleForm);