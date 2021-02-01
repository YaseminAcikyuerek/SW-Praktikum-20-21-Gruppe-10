import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ManagementAPI from '../../api/ManagementAPI';
import RatingBO from '../../api/RatingBO'
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';



/**
 * Shows a modal form dialog for a RatingBO in prop Rating. If the Rating is set, the dialog is configured
 * as an edit dialog and the text fields of the form are filled from the given CustomerBO object.
 * If the customer is null, the dialog is configured as a new customer dialog and the textfields are empty.
 * In dependency of the edit/new state, the respective backend calls are made to update or create a customer.
 * After that, the function of the onClose prop is called with the created/update CustomerBO object as parameter.
 * When the dialog is canceled, onClose is called with null.
 *
 * @see See Material-UIs [Dialog](https://material-ui.com/components/dialogs)
 * @see See Material-UIs [TextField](https://material-ui.com/components/text-fields//)
 *

 */
class RatingForm extends Component {

  constructor(props) {
    super(props);

    let pr = '', ev = '', tb = '', gr= '', pa= '';
    if (props.rating) {
      pr = props.rating.getProject();
      ev = props.rating.getEvaluator();
      tb = props.rating.getToBeAssessed();
      gr = props.rating.getGrade();
      pa = props.rating.getPassed();
    }

    // Init the state
    this.state = {
      project: pr,
      projectValidationFailed: false,
      projectEdited: false,
      evaluator: ev,
      evaluatorValidationFailed: false,
      evaluatorEdited: false,
      toBeAssessed: tb,
      toBeAssessedValidationFailed: false,
      toBeAssessedEdited: false,
      grade: gr,
      gradeValidationFailed: false,
      gradeEdited: false,
      passed: pa,
      passedValidationFailed: false,
      passedEdited: false,

      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null
    };
    // save this state for canceling
    this.baseState = this.state;
  }

  /** Adds the rating */
  addRating = () => {
    let newRating = new RatingBO();
    newRating.setProject(this.state.project)
    newRating.setEvaluator(this.state.evaluator)
    newRating.setToBeAssessed(this.state.toBeAssessed)
    newRating.setGrade(this.state.grade)
    newRating.setPassed(this.state.passed)
    ManagementAPI.getAPI().addRating(newRating).then(rating => {
      console.log(newRating);
      // Backend call sucessfull
      // reinit the dialogs state for a new empty projecttype
      this.setState(this.baseState);
      this.props.onClose(rating); // call the parent with the rating object from backend
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

  /** Updates the rating */
  updateRating = () => {
    // clone the original rating, in case the backend call fails
    let updatedRating = Object.assign(new RatingBO(), this.props.rating);
    // set the new attributes from our dialog
    updatedRating.setProject(this.state.project);
    updatedRating.setEvaluator(this.state.evaluator);
    updatedRating.setToBeAssessed(this.state.toBeAssessed);
    updatedRating.setGrade(this.state.grade);
    updatedRating.setPassed(this.state.passed);
    ManagementAPI.getAPI().updateRating(updatedRating).then(rating => {
      this.setState({
        updatingInProgress: false,              // disable loading indicator
        updatingError: null                     // no error message
      });
      // keep the new state as base state
      this.baseState.project = this.state.project;
      this.baseState.evaluator = this.state.evaluator;
      this.baseState.toBeAssessed = this.state.toBeAssessed;
      this.baseState.grade = this.state.grade;
      this.baseState.passed = this.state.passed;
      this.props.onClose(updatedRating);      // call the parent with the new projecttype
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
    const { classes, rating, show } = this.props;
    const { project, projectValidationFailed, projectEdited, evaluator, evaluatorValidationFailed, evaluatorEdited,
    toBeAssessed, toBeAssessedValidationFailed, toBeAssessedEdited, grade, gradeValidationFailed, gradeEdited,
    passed, passedValidationFailed, passedEdited, addingInProgress, addingError, updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    if (rating) {
      // customer defindet, so ist an edit dialog
      title = 'Update a rating';
      header = `Rating ID: ${rating.getID()}`;
    } else {
      title = 'Create a new rating';
      header = 'Enter rating data';
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
                helperText={projectValidationFailed ? 'The project must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='evaluator' label='Evaluator:' value={evaluator}
                onChange={this.textFieldValueChange} error={evaluatorValidationFailed}
                helperText={evaluatorValidationFailed ? 'The evaluator must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='toBeAssessed' label='To be assessed' value={toBeAssessed}
                onChange={this.textFieldValueChange} error={toBeAssessedValidationFailed}
                helperText={toBeAssessedValidationFailed ? 'To be assessed must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='grade' label='Grade' value={grade}
                onChange={this.textFieldValueChange} error={gradeValidationFailed}
                helperText={gradeValidationFailed ? 'The grade must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='passed' label='Passed' value={passed}
                onChange={this.textFieldValueChange} error={passedValidationFailed}
                helperText={passedValidationFailed ? 'Passed must contain at least one character' : ' '} />
            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Show error message in dependency of rating prop
              rating ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The rating ${rating.getID()} could not be updated.`} onReload={this.updateRating} />
                :
                <ContextErrorMessage error={addingError} contextErrorMsg={`The rating could not be added.`} onReload={this.addRating} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            {
              // If a rating is given, show an update button, else an add button
              rating ?
                <Button disabled={projectValidationFailed || evaluatorValidationFailed || toBeAssessedValidationFailed||
                gradeValidationFailed || passedValidationFailed} variant='contained' onClick={this.updateRating} color='primary'>
                  Update
              </Button>
                : <Button disabled={projectValidationFailed || !projectEdited || evaluatorValidationFailed || !evaluatorEdited ||
                toBeAssessedValidationFailed || !toBeAssessedEdited || gradeValidationFailed || !gradeEdited ||
                passedValidationFailed || !passedEdited} variant='contained' onClick={this.addRating} color='primary'>
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
RatingForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The RatingBO to be edited */
  rating: PropTypes.object,
  /** If true, the form is rendered */
  show: PropTypes.bool.isRequired,
  /**
   * Handler function which is called, when the dialog is closed.
   * Sends the edited or created ProjectTypeBO as parameter or null, if cancel was pressed.
   *
   * Signature: onClose(RatingBO rating);
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(RatingForm);