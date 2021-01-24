import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ManagementAPI from '../../api/ManagementAPI';
import ProjectTypeBO from '../../api/ProjectTypeBO';
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
class ProjectTypeForm extends Component {

  constructor(props) {
    super(props);

    let n = '', sw = '', ec;
    if (props.projectType) {
      n = props.projectType.getName();
      sw = props.projectType.getSws();
      ec = props.projectType.getEcts();
    }

    // Init the state
    this.state = {
      name: n,
      nameValidationFailed: false,
      nameEdited: false,
      sws: sw,
      swsValidationFailed: false,
      swsEdited: false,
      ects: ec,
      ectsValidationFailed: false,
      ectsEdited: false,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null
    };
    // save this state for canceling
    this.baseState = this.state;
  }

  /** Adds the projecttype */
  addProjectType = () => {
    let newProjectType = new ProjectTypeBO(this.state.name, this.state.sws, this.state.ects);
    ManagementAPI.getAPI().addProjectType(newProjectType).then(projectType => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty projecttype
      this.setState(this.baseState);
      this.props.onClose(projectType); // call the parent with the projecttype object from backend
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

  /** Updates the projecttype */
  updateProjectType = () => {
    // clone the original projecttype, in case the backend call fails
    let updatedProjectType = Object.assign(new ProjectTypeBO(), this.props.projectType);
    // set the new attributes from our dialog
    updatedProjectType.setName(this.state.name);
    updatedProjectType.setSws(this.state.sws);
    updatedProjectType.setEcts(this.state.ects);
    ManagementAPI.getAPI().updateProjectType(updatedProjectType).then(projectType => {
      this.setState({
        updatingInProgress: false,              // disable loading indicator
        updatingError: null                     // no error message
      });
      // keep the new state as base state
      this.baseState.name = this.state.name;
      this.baseState.sws = this.state.sws;
      this.baseState.ects = this.state.ects;
      this.props.onClose(updatedProjectType);      // call the parent with the new projecttype
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
    const { classes, projectType, show } = this.props;
    const { name, nameValidationFailed, nameEdited, sws, swsValidationFailed, swsEdited, ects, ectsValidationFailed,
    ectsEdited, addingInProgress, addingError, updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    if (projectType) {
      // customer defindet, so ist an edit dialog
      title = 'Update a projecttype';
      header = `ProjectType ID: ${projectType.getID()}`;
    } else {
      title = 'Create a new projecttype';
      header = 'Enter projecttype data';
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
              <TextField type='text' required fullWidth margin='normal' id='sws' label='SWS:' value={sws}
                onChange={this.textFieldValueChange} error={swsValidationFailed}
                helperText={swsValidationFailed ? 'SWS must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='ects' label='ECTS:' value={ects}
                onChange={this.textFieldValueChange} error={ectsValidationFailed}
                helperText={ectsValidationFailed ? 'ECTS must contain at least one character' : ' '} />
            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Show error message in dependency of projecttype prop
              projectType ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The projecttype ${projectType.getID()} could not be updated.`} onReload={this.updateProjectType} />
                :
                <ContextErrorMessage error={addingError} contextErrorMsg={`The projecttype could not be added.`} onReload={this.addProjectType} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            {
              // If a projecttype is given, show an update button, else an add button
              projectType ?
                <Button disabled={nameValidationFailed || swsValidationFailed || ectsValidationFailed} variant='contained' onClick={this.updateProjectType} color='primary'>
                  Update
              </Button>
                : <Button disabled={nameValidationFailed || !nameEdited || swsValidationFailed || !swsEdited || ectsValidationFailed || !ectsEdited} variant='contained' onClick={this.addProjectType} color='primary'>
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
ProjectTypeForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjectTypeBO to be edited */
  projectType: PropTypes.object,
  /** If true, the form is rendered */
  show: PropTypes.bool.isRequired,
  /**
   * Handler function which is called, when the dialog is closed.
   * Sends the edited or created ProjectTypeBO as parameter or null, if cancel was pressed.
   *
   * Signature: onClose(ProjectTypeBO projecttype);
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProjectTypeForm);