import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ParticipationList from './ParticipationList';
import ParticipationForm from './dialogs/ParticipationForm';
import ParticipationDeleteDialog from './dialogs/ParticipationDeleteDialog';

/**
 * Renders a ParticipationBO object within a expandable/collapsible ParticipationListEntry with the Participation manipulation
 * functions. If expanded, it renders a ParticipationList.
 *
 */
class ParticipationListEntry extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      Participation: props.Participation,
      showParticipationForm: false,
      showParticipationDeleteDialog: false,
    };
  }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.Participation);
  }



  /** Handles the onClick event of the edit Participation button */
  editParticipationButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showParticipationForm: true
    });
  }

  /** Handles the onClose event of the ParticipationForm */
  ParticipationFormClosed = (Participation) => {
    // Participation is not null and there for changed
    if (Participation) {
      this.setState({
        Participation: Participation,
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
    const { Participation, showParticipationForm, showParticipationDeleteDialog } = this.state;

    // console.log(this.state);
    return (
      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`Participation${Participation.getID()}participationpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{Participation.getRole()}
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
            <ParticipationList show={expandedState} Participation={Participation} />
          </AccordionDetails>
        </Accordion>
        <ParticipationForm show={showParticipationForm} Participation={Participation} onClose={this.ParticipationFormClosed} />
        <ParticipationDeleteDialog show={showParticipationDeleteDialog} Participation={Participation} onClose={this.deleteParticipationDialogClosed} />
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
ParticipationListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ParticipationBO to be rendered */
  Participation: PropTypes.object.isRequired,
  /** The state of this ParticipationListEntry. If true the Participation is shown with its Participation */
  expandedState: PropTypes.bool.isRequired,
  /** The handler responsible for handle expanded state changes (exanding/collapsing) of this ParticipationListEntry
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

export default withStyles(styles)(ParticipationListEntry);
