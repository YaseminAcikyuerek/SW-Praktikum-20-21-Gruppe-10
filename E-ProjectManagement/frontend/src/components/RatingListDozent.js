import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, Accordion, AccordionSummary, AccordionDetails, InputAdornment, IconButton, Grid, Typography, ListItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import RatingListEntry from './RatingListEntry';
import Paper from '@material-ui/core/Paper';



class RatingListDozent extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      dozentRatings: [],
      error: null,
      loadingInProgress: false,
      currentUser: [],
      person: null,
    };
  }

  /** Fetches personBo from the backend with logged in e-mail*/
  getRatingsByDozent = async () => {

    // console.log("getPersonByMail loaded");

        await ManagementAPI.getAPI().getPersonByMail(this.props.currentUserMail).then(personBOs =>
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
    ManagementAPI.getAPI().getRatingsByDozent(this.state.currentUser[0].id).then(ratingBOs =>
        this.setState({               // Set new state when ProjectBOs have been fetched
          dozentRatings: ratingBOs,
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
           dozentRatings: [],
            loadingInProgress: false, // disable loading indicator
            error: e
          })
        );
  }



  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount () {
    this.getRatingsByDozent();
  }

  /** Renders the component */
  render() {

    const { classes } = this.props;
    const { loadingInProgress, error, dozentRatings, rating} = this.state;
    // console.log(this.props.currentUserMail);
    return (

      <div className={classes.root}>
        <Grid className={classes.projectFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <h1>Meine Beurteilungen</h1>
            <Paper className={classes.paper}> {
            dozentRatings.map(rating =>
            <RatingListEntry key={rating.getID()} rating={rating}
            />)
            }
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={error} contextErrorMsg={`The list of ratings could not be loaded.`} onReload={this.getRatingsByDozent} />
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
RatingListDozent.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(RatingListDozent));