import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, Accordion, AccordionSummary, AccordionDetails, InputAdornment, IconButton, Grid, Typography, ListItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import Paper from '@material-ui/core/Paper';
import ParticipationListEntryStudent from "./ParticipationListEntryStudent";



class ParticipationListStudent extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      studentParticipations: [],
      error: null,
      loadingInProgress: false,
      currentUser: [],
      person: null,
    };
  }

  /** Fetches participationBo from the backend with logged in e-mail*/
  getParticipationsByStudent = async () => {
    let personID = 0;
    // console.log("getPersonByMail loaded");

        await ManagementAPI.getAPI().getParticipationsByStudent(this.props.currentUserMail).then(personBOs =>
        this.setState({               // Set new state when ProjectBOs have been fetched
          currentUser: personBOs,
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
        this.setState({             // Reset state with error from catch
          currentUser: 0,
          loadingInProgress: false, // disable loading indicator
          error: e
        })
    );
    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });

    /** Fetches all RatingBOs from person from the backend */
    ManagementAPI.getAPI().getParticipationsByStudent(this.state.currentUser.id).then(participationBOs =>
        this.setState({               // Set new state when ProjectBOs have been fetched
          studentParticipations: participationBOs,
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
        this.setState({             // Reset state with error from catch
          studentParticipations: [],
          loadingInProgress: false, // disable loading indicator
          error: e
        })
    );
  }



  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount () {
    this.getParticipationsByStudent();
  }

  /** Renders the component */
  render() {

    const { classes } = this.props;
    const { loadingInProgress, error,  studentParticipations, participation} = this.state;
    // console.log(this.props.currentUserMail);
    return (

        <div className={classes.root}>
          <Grid className={classes.projectFilter} container spacing={1} justify='flex-start' alignItems='center'>
            <Grid item>
              <h1>Meine Teilnahmen</h1>
              <Paper className={classes.paper}> {
                studentParticipations.map(participation =>
                    <ParticipationListEntryStudent key={participation.getID()} rating={participation}
                    />)
              }
                <LoadingProgress show={loadingInProgress} />
                <ContextErrorMessage error={error} contextErrorMsg={`The list of ratings could not be loaded.`} onReload={this.getParticipationsByStudent} />
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
ParticipationListStudent.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ParticipationListStudent));