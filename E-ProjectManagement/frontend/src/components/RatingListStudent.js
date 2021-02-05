import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, Accordion, AccordionSummary, AccordionDetails, InputAdornment, IconButton, Grid, Typography, ListItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import RatingListEntryStudent from './RatingListEntryStudent';
import Paper from '@material-ui/core/Paper';



class RatingListStudent extends Component {

  constructor(props) {
    super(props);

    // console.log(props);
    let expandedID = null;

    if (this.props.location.expandRating) {
      expandedID = this.props.location.expandRating.getID();
    }

    // Init an empty state
    this.state = {
      studentRatings: [],
      error: null,
      loadingInProgress: false,
      expandedProjectID: expandedID,
        student: null,
    };
  }

  getRatings = async () =>{
    let student = await ManagementAPI.getAPI().getStudentByMail(this.props.currentUserMail) //studentBO
    ManagementAPI.getAPI().getRatingsByStudent(student)
    this.setState({student: student})
  }
  /** Fetches all RatingBOs from student from the backend */
  getRatingsByStudent= (id) => {
    ManagementAPI.getAPI().getRatingsByStudent(id)
      .then(ratingBOs =>
        this.setState({               // Set new state when ProjectBOs have been fetched
          studentRatings: ratingBOs,
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
           studentRatings: [],
            loadingInProgress: false, // disable loading indicator
            error: e
          })
        );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }


  /**
   * Handles onExpandedStateChange events from the ProjectListStudent component. Toggels the expanded state of
   * the ProjectListStudentEntry of the given PersonBO.
   *
   *
   */
  onExpandedStateChange = student => {
    let newID = null;
    // If same person entry is clicked, collapse it else expand a new one
    if (student.getID() !== this.state.expandedStudentID) {
      // Expand the person entry with personID
      newID = student.getID();
    }
    this.setState({
      expandedStudentID: newID,
    });
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount () {
    this.getRatingsByStudent();
  }

  /** Renders the component */
  render() {

    const { classes } = this.props;
    const { expandedRatingID, loadingInProgress, error ,student, studentRatings, rating} = this.state;

    return (

      <div className={classes.root}>
        <Grid className={classes.projectFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <h1>Semesterbericht</h1>
            <Paper className={classes.paper}> {
            studentRatings.map(rating =>
            <RatingListEntryStudent key={rating.getID()} rating={rating} expandedState={expandedRatingID === rating.getID()}
              onExpandedStateChange={this.onExpandedStateChange} student = {student}
            />)
            }
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={error} contextErrorMsg={`The list of ratings could not be loaded.`} onReload={this.searchRatingsByStudent} />
            </Paper>
          </Grid>
         </Grid>
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
RatingListStudent.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(RatingListStudent));