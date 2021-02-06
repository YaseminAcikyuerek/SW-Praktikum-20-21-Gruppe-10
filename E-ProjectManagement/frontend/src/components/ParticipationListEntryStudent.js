import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ParticipationListStudent from './ParticipationListStudent';
import ParticipationForm from './dialogs/ParticipationForm';
import ParticipationDeleteDialog from './dialogs/ParticipationDeleteDialog';

/**
 * Renders a ParticipationBO object within a expandable/collapsible ParticipationListEntryStudent with the Participation manipulation
 * functions. If expanded, it renders a ParticipationList.
 *
 */
class ParticipationListEntryStudent extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      loadingInProgress: false,
      deletingInProgress: false,
      loadingError: null,
      deletingError: null,
      participation: props.participation,
      showParticipationForm: false,
      showParticipationDeleteDialog: false,
    };
  }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.participation);
  }



  /** Handles the onClick event of the edit Participation button */
  editParticipationButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showParticipationForm: true
    });
  }

  /** Handles the onClose event of the ParticipationForm */
  ParticipationFormClosed = (participation) => {
    // Participation is not null and there for changed
    if (participation) {
      this.setState({
        participation: participation,
        showParticipationForm: false
      });
    } else {
      this.setState({
        showParticipationForm: false
      });
    }
  }

  /** Handles the onClick event of the delete Participation button */
  deleteParticipationButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showParticipationDeleteDialog: true
    });
  }

  /** Handles the onClose event of the ParticipationDeleteDialog */
  deleteParticipationDialogClosed = (Participation) => {
    // if Participation is not null, delete it
    if (Participation) {
      this.props.onParticipationDeleted(Participation);
    };

    // Don´t show the dialog
    this.setState({
      showParticipationDeleteDialog: false
    });
  }

  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states customer
    const { participation, showParticipationForm, showParticipationDeleteDialog } = this.state;

     // console.log(this.state);
    return (
      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id={`participation${participation.getID()}participation-header`}>
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>
                  Projekt:  {participation.getProject()},<br></br>
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editParticipationButtonClicked}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={this.deleteParticipationButtonClicked}>
                    delete
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography variant='body2' color={'textSecondary'}>List of project</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <ParticipationListStudent show={expandedState} participation={participation} />
          </AccordionDetails>
        </Accordion>
        <ParticipationForm show={showParticipationForm} participation={participation} onClose={this.participationFormClosed} />
        <ParticipationDeleteDialog show={showParticipationDeleteDialog} participation={participation} onClose={this.deleteParticipationDialogClosed} />
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
ParticipationListEntryStudent.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ParticipationBO to be rendered */
  participation: PropTypes.object.isRequired,
  /** The state of this ParticipationListEntryStudent. If true the Participation is shown with its Participation */
  expandedState: PropTypes.bool.isRequired,
  /** The handler responsible for handle expanded state changes (exanding/collapsing) of this ParticipationListEntryStudent
   *
   * Signature: onExpandedStateChange(ParticipationBO Participation)
   */
  onExpandedStateChange: PropTypes.func.isRequired,
  /**
   *  Event Handler function which is called after a sucessfull delete of this Participation.
   *
   * Signature: onParticipationDelete(ParticipationBO Participation)
   */
  onParticipationDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(ParticipationListEntryStudent);
