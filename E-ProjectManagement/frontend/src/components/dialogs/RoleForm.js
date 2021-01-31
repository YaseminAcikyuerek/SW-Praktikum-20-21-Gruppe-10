import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ManagementAPI from "../../api/ManagementAPI";
import Role from '../../api/Role';
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
class RoleForm extends Component {

  constructor(props) {
    super(props);

    let  rn = '',i = '';
    if (props.role) {
      i = props.role.getId();
      rn = props.role.getRoleName();
    }

    // Init the state
    this.state = {
      id: i,
      idValidationFailed: false,
      idNameEdited: false,
      roleName: rn,
      roleNameValidationFailed: false,
      roleNameEdited: false,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null
    };
    // save this state for canceling
    this.baseState = this.state;
  }

  /** Adds the role */
  addRole = () => {
    let newRole = new Role();
    newRole.setRoleName(this.state.roleName)
    newRole.setId(this.state.id)
    ManagementAPI.getAPI().addRole(newRole).then(role => {
      console.log(newRole);
      // Backend call sucessfull
      // reinit the dialogs state for a new empty role
      this.setState(this.baseState);
      this.props.onClose(role); // call the parent with the role object from backend
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

  /** Updates the role */
  updateRole = () => {
    // clone the original role, in case the backend call fails
    let updatedRole = Object.assign(new Role(), this.props.role);
    // set the new attributes from our dialog
    updatedRole.setId(this.state.id);
    updatedRole.setRoleName(this.state.roleName);
   ManagementAPI.getAPI().updateRole(updatedRole).then(role => {
      this.setState({
        updatingInProgress: false,              // disable loading indicator
        updatingError: null                     // no error message
      });
      // keep the new state as base state
      this.baseState.id = this.state.id;
      this.baseState.roleName = this.state.roleName;
      this.props.onClose(updatedRole);      // call the parent with the new role
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
    const { classes, role, show } = this.props;
    const { id, idValidationFailed, idEdited, roleName, roleNameValidationFailed, roleNameEdited, addingInProgress,
      addingError, updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    if (role) {
      // role defindet, so ist an edit dialog
      title = 'Update a role';
      header = `Role ID: ${role.getID()}`;
    } else {
      title = 'Create a new role';
      header = 'Enter role data';
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
              <TextField autoFocus type='text' required fullWidth margin='normal' id='id' label='ID:' value={id}
                onChange={this.textFieldValueChange} error={idValidationFailed}
                helperText={idValidationFailed ? 'The ID must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='roleName' label='RoleName:' value={roleName}
                onChange={this.textFieldValueChange} error={roleNameValidationFailed}
                helperText={roleNameValidationFailed ? 'The roleName must contain at least one character' : ' '} />
            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Show error message in dependency of customer prop
              role ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The role ${role.getID()} could not be updated.`} onReload={this.updateRole} />
                :
                <ContextErrorMessage error={addingError} contextErrorMsg={`The role could not be added.`} onReload={this.addRole} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            {
              // If a customer is given, show an update button, else an add button
              role ?
                <Button disabled={idValidationFailed || roleNameValidationFailed} variant='contained' onClick={this.updateRole} color='primary'>
                  Update
              </Button>
                : <Button disabled={idValidationFailed || !idEdited || roleNameValidationFailed || !roleNameEdited} variant='contained' onClick={this.addRole} color='primary'>
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
RoleForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The Role to be edited */
  role: PropTypes.object,
  /** If true, the form is rendered */
  show: PropTypes.bool.isRequired,
  /**
   * Handler function which is called, when the dialog is closed.
   * Sends the edited or created CustomerBO as parameter or null, if cancel was pressed.
   *
   * Signature: onClose(CustomerBO customer);
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(RoleForm);