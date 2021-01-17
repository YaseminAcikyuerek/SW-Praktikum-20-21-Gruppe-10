import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ManagementAPI from '../../api/ManagementAPI';
import ProjectBO from  '../../api/ProjectBO';
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
class ProjectForm extends Component {

  constructor(props) {
    super(props);

    let n = '', se = '', mo= '', sd='', ep='', c='', bdep='', bblp='', bdlp='', bpdl='', la='', ro='', sr='', fl='',
    st='', pt='', ow='';
    if (props.project) {
      n = props.project.getName();
      se = props.project.getSemester();
      mo = props.project.getModule();
      sd = props.project.getShortDescription();
      ep = props.project.getExternalPartnerlist();
      c = props.project.getCapacity();
      bdep = props.project.getBdDuringExamPeriod();
      bblp = props.project.getBdBeforeLecturePeriod();
      bdlp = props.project.getBdDuringLecturePeriod();
      bpdl = props.project.getPreferredBdDuringLecturePeriod();
      la = props.project.getLanguage();
      ro = props.project.getRoom();
      sr = props.project.getSpecialRoom();
      fl = props.project.getFlag();
      st = props.project.getStatus();
      pt = props.project.getProjectType();
      ow = props.project.getOwner();
    }

    // Init the state
    this.state = {
      name: n,
      nameValidationFailed: false,
      nameEdited: false,
      semester: se,
      semesterValidationFailed: false,
      semesterEdited: false,
      module: mo,
      moduleValidationFailed: false,
      moduleEdited: false,
      shortDescription: sd,
      shortDescriptionValidationFailed: false,
      shortDescriptionEdited: false,
      externalPartnerlist: ep,
      externalPartnerlistValidationFailed: false,
      externalPartnerlistEdited: false,
      capacity: c,
      capacityValidationFailed: false,
      capacityEdited: false,
      BDEP: bdep,
      BDEPValidationFailed: false,
      BDEPEdited: false,
      BBLP: bblp,
      BBLPValidationFailed: false,
      BBLPEdited: false,
      BDLP: bdlp,
      BDLPValidationFailed: false,
      BDLPEdited: false,
      BPDL: bpdl,
      BPDLValidationFailed: false,
      BPDLEdited: false,
      language: la,
      languageValidationFailed: false,
      languageEdited: false,
      room: ro,
      roomValidationFailed: false,
      roomEdited: false,
      specialRoom: sr,
      specialRoomValidationFailed: false,
      specialRoomEdited: false,
      flag: fl,
      flagValidationFailed: false,
      flagEdited: false,
      status: st,
      statusValidationFailed: false,
      statusEdited: false,
      projectType: pt,
      projectTypeValidationFailed: false,
      projectTypeEdited: false,
      owner: ow,
      ownerValidationFailed: false,
      ownerEdited: false,

      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null

    };
    // save this state for canceling
    this.baseState = this.state;
  }

  /** Adds the project */
  addProject = () => {
    let newProject = new ProjectBO(this.state.name, this.state.semester, this.state.module, this.state.shortDescription,
    this.state.externalPartnerlist, this.state.capacity, this.state.BDEP, this.state.BBLP, this.state.BDLP,
    this.state.BPDL, this.state.language, this.state.room, this.state.specialRoom, this.state.status,
    this.state.projectType, this.state.owner);
    ManagementAPI.getAPI().addProject(newProject).then(project => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty project
      this.setState(this.baseState);
      this.props.onClose(project); // call the parent with the customer object from backend
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

  /** Updates the project */
  updateProject = () => {
    // clone the original project, in case the backend call fails
    let updatedProject = Object.assign(new ProjectBO(), this.props.project);
    // set the new attributes from our dialog
    updatedProject.setName(this.state.name);
    updatedProject.setSemester(this.state.semester);
    updatedProject.setModule(this.state.module);
    updatedProject.setShortDescription(this.state.shortDescription);
    updatedProject.setExternalPartnerlist(this.state.externalPartnerlist);
    updatedProject.setCapacity(this.state.capacity);
    updatedProject.setBDEP(this.state.BDEP);
    updatedProject.setBBLP(this.state.BBLP);
    updatedProject.setBDLP (this.state.BDLP);
    updatedProject.setBPDL (this.state.BPDL);
    updatedProject.setLanguage (this.state.language);
    updatedProject.setRoom (this.state.room);
    updatedProject.setSpecialRoom (this.state.specialRoom);
    updatedProject.setStatus (this.state.status);
    updatedProject.setProjectType (this.state.projectType);
    updatedProject.setOwner (this.state.owner);
    updateFlag.setFlag (this.state.flag)

    ManagementAPI.getAPI().updateProject(updatedProject).then(project => {
      this.setState({
        updatingInProgress: false,              // disable loading indicator
        updatingError: null                     // no error message
      });
      // keep the new state as base state
      this.baseState.name = this.state.name;
      this.baseState.semester = this.state.semester;
      this.baseState.module = this.state.module;
      this.baseState.shortDescription = this.state.shortDescription;
      this.baseState.externalPartnerlist = this.state.externalPartnerlist;
      this.baseState.capacity = this.state.capacity;
      this.baseState.bdep = this.state.bdep;
      this.baseState.bblp = this.state.bblp;
      this.baseState.bdlp = this.state.bdlp;
      this.baseState.bpdl = this.state.bpdl;
      this.baseState.language = this.state.language;
      this.baseState.room = this.state.room;
      this.baseState.specialRoom = this.state.specialRoom;
      this.baseState.status = this.state.status;
      this.baseState.projectType = this.state.projectType;
      this.baseState.owner = this.state.owner;
      this.baseState.flag = this.state.flag;
      this.props.onClose(updatedProject); // call the parent with the new project
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
    const { classes, project, show } = this.props;
    const { name, nameValidationFailed, nameEdited, semester,semesterValidationFailed, semesterEdited,module,
    moduleValidationFailed,moduleEdited, shortDescription, shortDescriptionValidationFailed, shortDescriptionEdited,
    externalPartnerlist, externalPartnerlistValidationFailed, externalPartnerlistEdited, capacity,
    capacityValidationFailed, capacityEdited, BDEP, BDAPValidationFailed, BDAPEdited, BBLP, BBLPValidationFailed,
    BBLPEdited, BDLP, BDLPValidationFailed, BDLPEdited, BPDL, PDLValidationFailed, PDLEdited, language,
    languageValidationFailed, languageEdited, room, roomValidationFailed, roomEdited, specialRoom,
    specialRoomValidationFailed, specialRoomEdited, status, statusValidationFailed, statusEdited, projectType,
    projectTypeValidationFailed, projectTypeEdited, owner, ownerValidationFailed, ownerEdited, addingInProgress,
      addingError, updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    if (project) {
      // project defindet, so ist an edit dialog
      title = 'Update a project';
      header = `Project ID: ${project.getID()}`;
    } else {
      title = 'Create a new project';
      header = 'Enter project data';
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
              <TextField type='text' required fullWidth margin='normal' id='semester' label='Semester:' value={semester}
                onChange={this.textFieldValueChange} error={semesterValidationFailed}
                helperText={semesterValidationFailed ? 'The semester must contain at least one character' : ' '} />
              <TextField autoFocus type='text' required fullWidth margin='normal' id='module' label='Module:' value={module}
                onChange={this.textFieldValueChange} error={moduleValidationFailed}
                helperText={moduleValidationFailed ? 'The Module must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='shortDescription' label='Short Description:' value={shortDescription}
                onChange={this.textFieldValueChange} error={shortDescriptionValidationFailed}
                helperText={shortDescriptionValidationFailed ? 'The short description must contain at least one character' : ' '} />
              <TextField autoFocus type='text' required fullWidth margin='normal' id='externalPartnerlist' label='External Partnerlist:' value={externalPartnerlist}
                onChange={this.textFieldValueChange} error={externalPartnerlistValidationFailed}
                helperText={externalPartnerlistValidationFailed ? 'The external Partnerlist must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='capacity' label='Capacity:' value={capacity}
                onChange={this.textFieldValueChange} error={capacityValidationFailed}
                helperText={capacityValidationFailed ? 'The capacity must contain at least one character' : ' '} />
              <TextField autoFocus type='text' required fullWidth margin='normal' id='bdap' label='Blockdays during exam period :' value={bdep}
                onChange={this.textFieldValueChange} error={bdepValidationFailed}
                helperText={bdapValidationFailed ? 'You must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='bblp' label='Blockdays before lecture period:' value={bblp}
                onChange={this.textFieldValueChange} error={bblpValidationFailed}
                helperText={bblpValidationFailed ? 'You must contain at least one character' : ' '} />
              <TextField autoFocus type='text' required fullWidth margin='normal' id='bdlp' label='Blockdays during lecture period:' value={bdlp}
                onChange={this.textFieldValueChange} error={bdlpValidationFailed}
                helperText={bdlpValidationFailed ? 'You must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='pdl' label='Preferred blockdays during lecture period:' value={bpdl}
                onChange={this.textFieldValueChange} error={bpdlValidationFailed}
                helperText={pdlValidationFailed ? 'You must contain at least one character' : ' '} />
              <TextField autoFocus type='text' required fullWidth margin='normal' id='language' label='Language:' value={language}
                onChange={this.textFieldValueChange} error={languageValidationFailed}
                helperText={languageValidationFailed ? 'The language must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='room' label='Room:' value={room}
                onChange={this.textFieldValueChange} error={roomValidationFailed}
                helperText={roomValidationFailed ? 'The room must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='room' label='Room:' value={room}
                onChange={this.textFieldValueChange} error={roomValidationFailed}
                helperText={roomValidationFailed ? 'The room must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='specialRoom' label='Special room:' value={specialRoom}
                onChange={this.textFieldValueChange} error={specialRoomValidationFailed}
                helperText={specialRoomValidationFailed ? 'The special room must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='status' label='Status:' value={status}
                onChange={this.textFieldValueChange} error={statusValidationFailed}
                helperText={statusValidationFailed ? 'The status must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='projectType' label='Project Type:' value={projectType}
                onChange={this.textFieldValueChange} error={projectTypeValidationFailed}
                helperText={projectTypeValidationFailed ? 'The project type must contain at least one character' : ' '} />
              <TextField type='text' required fullWidth margin='normal' id='owner' label='Owner:' value={owner}
                onChange={this.textFieldValueChange} error={ownerValidationFailed}
                helperText={ownerValidationFailed ? 'The owner must contain at least one character' : ' '} />
            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Show error message in dependency of project prop
              project ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The project ${project.getID()} could not be updated.`} onReload={this.updateProject} />
                :
                <ContextErrorMessage error={addingError} contextErrorMsg={`The project could not be added.`} onReload={this.addProject} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            {
              // If a project is given, show an update button, else an add button
              customer ?
                <Button disabled={nameValidationFailed || semesterValidationFailed || moduleValidationFailed ||
                shortDescriptionValidationFailed || externalPartnerListValidationFailed || capacityValidationFailed ||
                BDEPValidationFailed || BBLPValidationFailed || BDLPValidationFailed || BPDLValidationFailed ||
                languageValidationFailed || roomValidationFailed || specialRoomValidationFailed || statusValidationFailed ||
                projectTypeValidationFailed || ownerValidationFailed} variant='contained' onClick={this.updateProject} color='primary'>
                  Update
              </Button>
                : <Button disabled={nameValidationFailed || !nameEdited || semesterValidationFailed || !semesterEdited ||
                moduleValidationFailed || !moduleEdited || shortDescriptionValidationFailed || !shortDescriptionEdited ||
                externalPartnerlistValidationFailed || !externalPartnerlistEdited || capacityValidationFailed ||
                !capacityEdited || BDEPValidationFailed || !BDEPEdited || BBLPValidationFailed || !BBLPEdited ||
                BDLPValidationFailed || !BDLPEdited || BPDLValidationFailed || !BPDLEdited || languageValidationFailed ||
                !languageEdited || roomValidationFailed || !roomEdited || specialRoomValidationFailed || !specialRoomEdited ||
                statusValidationFailed || !statusEdited || projectTypeValidationFailed || !projectTypeEdited ||
                ownerValidationFailed || !ownerEdited} variant='contained' onClick={this.addCustomer} color='primary'>
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
ProjectForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjectBO to be edited */
  project: PropTypes.object,
  /** If true, the form is rendered */
  show: PropTypes.bool.isRequired,
  /**
   * Handler function which is called, when the dialog is closed.
   * Sends the edited or created CustomerBO as parameter or null, if cancel was pressed.
   *
   * Signature: onClose(ProjectBO project);
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProjectForm);