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
      participation: null,
      participations: [],
      participationsCounter: 0,
    };
  }


  /** Adds an participation for the current studentBO */
  addParticipation = () => {
      const participation = new ParticipationBO
      participation.setStudent(this.props.student.id)
      participation.setProject(this.state.project.id)
    ManagementAPI.getAPI().addParticipation(participation).then(participationBO => {
      this.setState({  // Set new state when ParticipationBOs have been fetched
        participation: participationBO,
        loadingInProgress: false, // loading indicator
        addingParticipationError: null
      })
    }).catch(e =>
      this.setState({ // Reset state with error from catch
        participation: null,
        loadingInProgress: false,
        addingParticipationError: e
      })
    );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      addingParticipationError: null
    });
  }

/** Fetches ParticipationBOs for the current user studentBO */
  getParticipationsByProject = () => {
    ManagementAPI.getAPI().getParticipationsByProject(this.state.project.getID())
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
   deleteParticipation = () => { console.log(this.state.participation)
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


  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getParticipationsByProject();


  }


/** Handles click events from the transfer money button */

  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states project
    const { project, showProjectForm, showProjectDeleteDialog, participations, participation } = this.state;

    return (
      participation !==null?
      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            id={`project${project.getID()}accountpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>
                    Projet-ID:      {project.getID()}, <br></br>
                    Projektname:    {project.getName()}, <br></br>
                    Modul:          {project.getOwner()}<br></br>
                    Projekt-Typ:    {project.getProjectType()}<br></br>
                    Semester:       {project.getSemester()}<br></br>
                    Projektinhaber: {project.getOwner()}<br></br>
                }
                  <Button variant="contained"
                          color="secondary"
                          className={classes.buttonAblehnen}
                          startIcon={<HighlightOffIcon/>}
                          variant='outlined' color='primary' size='small' onClick={this.deleteParticipation}>
                  Abmelden
                  </Button>
                </Typography>
                <Typography variant='body1' className={classes.heading}>{"Beschreibung:"+ " "+ project.getShortDescription()}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
        </Accordion>
      </div>
      :
      <div>
      <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          id={`project${project.getID()}accountpanel-header`}
        >

          <Grid container spacing={1} justify='flex-start' alignItems='center'>
            <Grid item>
              <Typography variant='body1' className={classes.heading}>{"Projekt:" + " " + project.getName()}
                <Button
                        color="secondary"
                        className={classes.buttonAnmelden}
                        startIcon={<CheckIcon/>}
                        variant="contained" color='primary' size='small'  onClick={this.addParticipation}>
                Anmelden
                </Button>
                <Button variant="contained"
                        color="secondary"
                        className={classes.buttonAbmelden}
                        startIcon={<HighlightOffIcon/>}
                        variant='outlined' color='primary' size='small' onClick={() => this.deleteParticipation}>
                Abmelden
                </Button> */}
              </Typography>
              <Typography variant='body1' className={classes.heading}>{"Beschreibung:"+ " "+ project.getShortDescription()}
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