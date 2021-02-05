import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RatingListStudent from './RatingListStudent';



class RatingListEntryStudent extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      rating: props.rating,
    };
  }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.rating);
  }


  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states rating
    const { rating} = this.state;

    // console.log(this.state);
    return (
      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`rating${rating.getID()}ratingpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}> {rating.getProject()}, {rating.getEvaluator()},{rating.getToBeAssessed()},{rating.getGrade()},{rating.getPassed()}
                </Typography>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography variant='body2' color={'textSecondary'}>List of ratings</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <RatingListStudent show={expandedState} rating={rating} />
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
RatingListEntryStudent.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The RatingBO to be rendered */
  rating: PropTypes.object.isRequired,
  /** The state of this RatingListEntry. If true the rating is shown with its ratings */
  expandedState: PropTypes.bool.isRequired,
  /** The handler responsible for handle expanded state changes (exanding/collapsing) of this RatingListEntry
   *
   * Signature: onExpandedStateChange(RatingBO rating)
   */
  onExpandedStateChange: PropTypes.func.isRequired,
  /**
   *  Event Handler function which is called after a sucessfull delete of this rating.
   *
   * Signature: onRatingDelete(RatingBO rating)
   */
  onRatingDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(RatingListEntryStudent);
