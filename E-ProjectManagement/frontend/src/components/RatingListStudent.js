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

    // Init an empty state
    this.state = {
      ratingStudents: [],
      error: null,
      loadingInProgress: false,
        student: null,
      currentUser: []
    };
  }


  /** Fetches all RatingBOs from student from the backend */

    getRatingsByStudent = async () => {
        await ManagementAPI.getAPI().getStudentByMail(this.props.currentUserMail).then(studentBOs =>
            this.setState({                     // Set new state when ProjectBOs have been fetched
                currentUser: studentBOs,
                loadingInProgress: false,   // disable loading indicator
                error: null
            })).catch(e =>
            this.setState({             // Reset state with error from catch
                currentUser: [],
                loadingInProgress: false, // disable loading indicator
                error: e
            })
        );

        // set loading to true
        this.setState({
            loadingInProgress: true,
            error: null
        });

        ManagementAPI.getAPI().getRatingsByStudent(this.state.currentUser.id).then(ratingBOs =>
            this.setState({               // Set new state when ProjectBOs have been fetched
                ratingStudents: ratingBOs,
                loadingInProgress: false,   // disable loading indicator
                error: null
            })).catch(e =>
            this.setState({             // Reset state with error from catch
                ratingStudents: [],
                loadingInProgress: false, // disable loading indicator
                error: e

            })
        );
        console.log(this.state);
    }



  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount () {
    this.getRatingsByStudent();
  }

  /** Renders the component */
  render() {

    const { classes } = this.props;
    const { loadingInProgress, error ,student, ratingStudents} = this.state;

    return (

      <div className={classes.root}>
        <Grid className={classes.projectFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <h1>Semesterbericht</h1>
            <Paper className={classes.paper}> {
            ratingStudents.map(rating =>
            <RatingListEntryStudent key={rating.getID()} rating={rating}
            />)
            }
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={error} contextErrorMsg={`The list of ratings could not be loaded.`} onReload={this.getRatingsByStudent} />
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