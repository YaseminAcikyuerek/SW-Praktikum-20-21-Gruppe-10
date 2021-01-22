import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProjectForm from './dialogs/ProjectForm';
import ProjectDeleteDialog from './dialogs/ProjectDeleteDialog';
//import ParticipationList from './ParticipationList';
import ProjectList from './ProjectList';


/**
 * Renders a ProjectBO object within a expandable/collapsible ProjectListEntry with the project manipulation
 * functions. If expanded, it renders a ParticipationList.
 *
 * @see See [AccountList](#participationlist)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class ProjectListEntry extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      project: props.project,
      //participations: props.participations,
      showProjectForm: false,
      showProjectDeleteDialog: false,
    };
  }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.project);
  }

  /** Handles onParticipationDelete events from an ParticipationListEntry  */
  //deleteParticipationHandler = (deletedParticipation) => {
    // console.log(deletedParticipation.getID());
    //this.setState({
      //participations: this.state.participations.filter(participation => participation.getID() !== deletedParticipation.getID())
    //})
  //}

  /** Handles the onClick event of the edit project button */
  editProjectButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showProjectForm: true
    });
  }

  /** Handles the onClose event of the ProjectForm */
  projectFormClosed = (project) => {
    // project is not null and therefor changed
    if (project) {
      this.setState({
        project: project,
        showProjectForm: false
      });
    } else {
      this.setState({
        showProjectForm: false
      });
    }
  }

  /** Handles the onClick event of the delete project button */
  deleteProjectButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showProjectDeleteDialog: true
    });
  }

  /** Handles the onClose event of the ProjectDeleteDialog */
  deleteProjectDialogClosed = (project) => {
    // if project is not null, delete it
    if (project) {
      this.props.onProjectDeleted(project);
    }

    // Don´t show the dialog
    this.setState({
      showProjectDeleteDialog: false
    });
  }

  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states project
    const { project, showProjectForm, showProjectDeleteDialog } = this.state;

    // console.log(this.state);
    return (
      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`project${project.getID()}projectpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{project.getName()}, {project.getOwner()}
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editProjectButtonClicked}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={this.deleteProjectButtonClicked}>
                    delete
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography variant='body2' color={'textSecondary'}>List of Participations</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
        </Accordion>
        <ProjectForm show={showProjectForm} project={project} onClose={this.projectFormClosed} />
        <ProjectDeleteDialog show={showProjectDeleteDialog} project={project} onClose={this.deleteProjectDialogClosed} />
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  }
});

/** PropTypes */
ProjectListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjectBO to be rendered */
  project: PropTypes.object.isRequired,
  /** The state of this ProjectListEntry. If true the customer is shown with its participations */
  expandedState: PropTypes.bool.isRequired,
  /** The handler responsible for handle expanded state changes (exanding/collapsing) of this ProjectListEntry
   *
   * Signature: onExpandedStateChange(ProjectBO project)
   */
  onExpandedStateChange: PropTypes.func.isRequired,
  /**
   *  Event Handler function which is called after a sucessfull delete of this project.
   *
   * Signature: onProjectDelete(ProjectBO project)
   */
  onProjectDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(ProjectListEntry);
