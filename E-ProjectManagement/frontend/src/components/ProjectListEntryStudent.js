import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, Accordion, AccordionSummary, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ProjectForm from './dialogs/ProjectForm';
import ParticipationBO from '../api/ParticipationBO';
import Paper from '@material-ui/core/Paper';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import CheckIcon from '@material-ui/icons/Check';


/**
 * Renders a ProjectBO object within a expandable/collapsible ProjectListEntryNew with the project manipulation
 * functions. If expanded, it renders a AccountList.
 *
 *
 */
class ProjectListEntryStudent extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      project: this.props.project,
      showProjectForm: false,
      showProjectDeleteDialog: false,
        participationDeleted: false,
      participation: null,
      participations: [],
    };
  }


  /** Adds an participation for the current studentBO */
  addParticipation = () => {
    let newParticipation = new ParticipationBO();
    newParticipation.setProject(this.state.project)
    newParticipation.setStudent(this.state.student)
    ManagementAPI.getAPI().addParticipation(newParticipation).then(participation => {
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

  /** Handles the onClick event of the delete participation button */
  deleteParticipationButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showParticipationDeleteDialog: true
    });
  }

  /** Handles the onClose event of the PersonDeleteDialog */
  deleteParticipationDialogClosed = (participation) => {
    // if participation is not null, delete it
    if (participation) {
      this.props.onParticipationDeleted(participation);
    }

    // Don´t show the dialog
    this.setState({
      showParticipationDeleteDialog: false
    });
  }

/** Fetches ParticipationBOs for the current user studentBO */
  getParticipationsByProjectURL = (student) => {
    ManagementAPI.getAPI().getParticipationsByProjectURL(student)
      .then(participationBOs =>
        this.setState({               // Set new state when ParticipationBOs have been fetched
          participations: participationBOs,
          loadingInProgress: false,   // disable loading indicator
          error: null,

        }

        )).catch(e =>
          this.setState({             // Reset state with error from catch
            participations: [],
            loadingInProgress: false, // disable loading indicator
            error: e
          })
        );

    this.setState({
      loadingInProgress: true,
      error: null,
    },
   );
  }

   /** Deletes this participation */
   deleteParticipation = () => {
       // console.log(this.state.participation)
    ManagementAPI.getAPI().deleteParticipation(this.state.participation.getID()).then(() => {
      this.setState({  // Set new state when ParticipationBOs have been fetched
        deletingInProgress: false, // loading indicator
        deletingError: null
      })
      // console.log(participation);
    }).catch(e =>
      this.setState({ // Reset state with error from catch
        deletingInProgress: false,
        deletingError: e
      })
    );
    // set loading to true
    this.setState({
      deletingInProgress: true,
      deletingError: null
    });
  }
  /** Handles the onClick event of the add person button */
  addParticipationButtonClicked = event => {
    // Do not toggle the expanded state
    event.stopPropagation();
    //Show the PersonForm
    this.setState({
      showParticipationForm: true
    });
  }


/** Handles click events from the transfer money button */

  /** Renders the component */
  render() {
    const { classes} = this.props;
    // Use the states project
    const { project, showProjectForm, showParticipationDeleteDialog, participations, participation } = this.state;

    return (
      <div className={classes.root} >
        <Accordion>
          <AccordionSummary
            id={`project${project.getID()}accountpanel-header`}>
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>
                    Projekt-ID:     {project.getID()}, <br></br>
                    Projektname:    {project.getName()}, <br></br>
                    Modul:          {project.getOwner()}<br></br>
                    Projekt-Typ:    {project.getProjectType()}<br></br>
                    Semester:       {project.getSemester()}<br></br>
                    Projektinhaber: {project.getOwner()}<br></br>
                  <Button variant="contained"
                          color="secondary"
                          className={classes.buttonAblehnen}
                          variant='outlined' color='primary' size='small' onClick={this.deleteParticipationButtonClicked}>
                  Abmelden
                  </Button>
                </Typography>
              </Grid>
            </Grid>
        </AccordionSummary>
      </Accordion>
    </div>

    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
});



/** PropTypes */
ProjectListEntryStudent.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjectBO to be rendered */
  project: PropTypes.object.isRequired,
  /** The state of this ProjectListEntryStudent. If true the project is shown with its accounts */
  expandedState: PropTypes.bool.isRequired,
  /** The handler responsible for handle expanded state changes (exanding/collapsing) of this ProjectListEntryNew
   */
  onExpandedStateChange: PropTypes.func.isRequired,
  /**
   *  Event Handler function which is called after a sucessfull delete of this project.
   */
  onProjectDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(ProjectListEntryStudent);