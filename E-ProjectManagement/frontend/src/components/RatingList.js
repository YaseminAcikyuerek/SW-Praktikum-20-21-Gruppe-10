import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import RatingForm from './dialogs/RatingForm';
import RatingListEntry from './RatingListEntry';

/**
 * Controlls a list of RatingListEntrys to create a accordion for each person.
 *
 * @see See [RatingListEntry](#ratinglistentry)
 *

 */
class RatingList extends Component {

  constructor(props) {
    super(props);

    // console.log(props);
    let expandedID = null;

    if (this.props.location.expandRating) {
      expandedID = this.props.location.expandRating.getID();
    }

    // Init an empty state
    this.state = {
      rating: [],
      filteredRating: [],
      error: null,
      loadingInProgress: false,
      expandedRatingID: expandedID,
      showRatingForm: false
    };
  }

  /** Fetches all RatingBOs from the backend */
  getRatings = () => {
    ManagementAPI.getAPI().getRatings()
      .then(ratingBOs =>
        this.setState({               // Set new state when RatingBOs have been fetched
          rating: ratingBOs,
          filteredRating: [...ratingBOs], // store a copy
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
            rating: [],
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

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getRatings();
  }

  /**
   * Handles onExpandedStateChange events from the PersonListEntry component. Toggels the expanded state of
   * the PersonListEntry of the given PersonBO.
   *
   * @param {person} PersonBO of the PersonListEntry to be toggeled
   */
  onExpandedStateChange = rating => {   //TODO: EVTL FEHLER, bei Übergabe von Daten weil nicht Init
    // console.log(personID);
    // Set expandend person entry to null by default
    let newID = null;

    // If same person entry is clicked, collapse it else expand a new one
    if (rating.getID() !== this.state.expandedRatingID) {
      // Expand the person entry with personID
      newID = rating.getID();
    }
    // console.log(newID);
    this.setState({
      expandedRatingID: newID,
    });
  }

  /**
   * Handles onPersonDeleted events from the PersonListEntry component
   *
   * @param {rating} RatingBO of the RAtingListEntry to be deleted
   */
  ratingDeleted = rating => {
    const newRatingList = this.state.rating.filter(ratingFromState => ratingFromState.getID() !== rating.getID());
    this.setState({
      rating: newRatingList,
      filteredRating: [...newRatingList],
      showRatingForm: false
    });
  }

  /** Handles the onClick event of the add person button */
  addRatingButtonClicked = event => {     //TODO: ANPASSEN FÜR KORREKTE ÜBERGABE DER DATEN
    // Do not toggle the expanded state
    event.stopPropagation();
    //Show the RatingForm
    this.setState({
      showRatingForm: true
    });
  }

  /** Handles the onClose event of the RatingForm */
  ratingFormClosed = rating => {
    // rating is not null and therefore created
    if (rating) {
      const newRatingList = [...this.state.rating, rating];
      this.setState({
        rating: newRatingList,
        filteredRating: [...newRatingList],
        showRatingForm: false
      });
    } else {
      this.setState({
        showRatingForm: false
      });
    }
  }

  /** Handels onChange events of the rating filter text field */
  filterFieldValueChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredRating: this.state.rating.filter(rating => {
        let nameContainsValue = rating.getName().toLowerCase().includes(value);
        let projectContainsValue = rating.getProject().toLowerCase().includes(value);
        let evaluatorContainsValue = rating.getEvaluator().toLowerCase().includes(value);
        let toBeAssessedContainsValue = rating.getToBeAssessed().toLowerCase().includes(value);
        let gradeContainsValue = rating.getGrade().toLowerCase().includes(value);
        let passedContainsValue = rating.getPassed().toLowerCase().includes(value);

        return nameContainsValue || projectContainsValue || evaluatorContainsValue || toBeAssessedContainsValue
               || gradeContainsValue || passedContainsValue
      }),
      ratingFilter: value
    });
  }

  /** Handles the onClose event of the clear filter button */
  clearFilterFieldButtonClicked = () => {
    // Reset the filter
    this.setState({
      filteredRating: [...this.state.rating],
      ratingFilter: ''
    });
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { filteredRating, expandedRatingID, loadingInProgress, error, showRatingForm } = this.state;

    return (
      <div className={classes.root}>
        <Grid className={classes.ratingFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
              Filter rating list by name:
              </Typography>
          </Grid>
          <Grid item xs />
          <Grid item>
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addRatingButtonClicked}>
              Add Ratings
          </Button>
          </Grid>
        </Grid>
        {
          // Show the list of RatingListEntry components
          // Do not use strict comparison, since expandedRatingID maybe a string if given from the URL parameters
          filteredRating.map(rating =>
            <RatingListEntry key={rating.getID()} rating={rating} expandedState={expandedRatingID === rating.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
              onRatingDeleted={this.ratingDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of ratings could not be loaded.`} onReload={this.getRatings} /> //TODO: ÜBERPRÜFEN OB INITIALISIERT
        <RatingForm show={showRatingForm} onClose={this.ratingFormClosed} />
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  RatingFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }
});

/** PropTypes */
RatingList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(RatingList));