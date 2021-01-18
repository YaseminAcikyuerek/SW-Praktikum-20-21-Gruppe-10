import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import RatingDetails form '../components/RatingDetails';


class AllRatingList extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      ratings: [],
      loadingInProgress: false,
      loadingError: null,
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.loadRatings();
  }

  /** gets the rating list for this project */
  loadRatings = () => {
    ManagementAPI.getAPI().getAllRatings().then(ratings =>
      this.setState({
        ratings: ratings,
        loadingInProgress: false, // loading indicator
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch
          loadingInProgress: false,
          loadingError: e
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      loadingError: null
    });
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { ratings, loadingInProgress, loadingError } = this.state;

    return (
      <div className={classes.root}>
          {
            ratings.map(rating => <RatingDetails key={rating.getID()}
            personID={rating.getOwner().toString()} ratingID={rating.getID().toString()} />)
          }
          <LoadingProgress show={loadingInProgress} />
          <ContextErrorMessage error={loadingError} contextErrorMsg={`The list of all ratings of the project management system could not be loaded.`} onReload={this.loadRatings} />
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
AllRatingList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AllRatingList);
