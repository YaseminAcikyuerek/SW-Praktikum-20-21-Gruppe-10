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




  /** Renders the component */
  render() {
    const { classes } = this.props;
    // Use the states rating
    const { rating} = this.state;

    // console.log(this.state);
    return (
      <div>
        <Accordion >
          <AccordionSummary
            id={`rating${rating.getID()}ratingpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>
                  Projekt:  {rating.getProject()},<br></br>
                  Prüfer:   {rating.getEvaluator()},<br></br>
                  Note:     {rating.getGrade()},<br></br>
                  Bestanden:{rating.getPassed()}<br></br>
                </Typography>
              </Grid>
              <Grid item xs />
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <RatingListStudent rating={rating} />
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

  onRatingDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(RatingListEntryStudent);
