import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ParticipationListStudent from './ParticipationListStudent';
import ParticipationForm from './dialogs/ParticipationForm';
import ParticipationDeleteDialog from './dialogs/ParticipationDeleteDialog';
import RatingListStudent from "./RatingListStudent";

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
    participation: props.participation
    };
  }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.participation);
  }



  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states rating
    const { participation} = this.state;

    // console.log(this.state);
    return (
        <div>
          <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id={`participation${participation.getID()}participationpanel-header`}
            >
              <Grid container spacing={1} justify='flex-start' alignItems='center'>
                <Grid item>
                  <Typography variant='body1' className={classes.heading}>
                    Student:  {participation.getProject()},<br></br>
                    Projekt:   {participation.getStudent()},<br></br>

                  </Typography>
                </Grid>
                <Grid item xs />
                <Grid item>
                  <Typography variant='body2' color={'textSecondary'}>List of participations</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <RatingListStudent show={expandedState} participation={participation} />
            </AccordionDetails>
          </Accordion>
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
