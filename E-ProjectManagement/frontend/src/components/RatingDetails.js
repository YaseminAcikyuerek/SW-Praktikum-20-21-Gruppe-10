import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper } from '@material-ui/core';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';

/**
 * Renders a RatingBO object within a ListEntry and provides a delete button to delete it.
 *
 * @see See Material-UIs [Lists](https://material-ui.com/components/lists/)
 * @see See Material-UIs [ListItem](https://material-ui.com/api/list-item/)
 *

 */
class RatingDetails extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      rating: null,
      loadingInProgress: false,
      loadingError: null,
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getRating();
  }

  /** gets the balance for this account */
  getRating = () => {
    ManagementAPI.getAPI().getRating(this.props.ratingID).then(rating =>
      this.setState({
        rating: rating,
        loadingInProgress: false,
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch
          rating: null,
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
    const { classes, ratingID } = this.props;
    const { rating, loadingInProgress, loadingError } = this.state;

    return (
      <Paper variant='outlined' className={classes.root}>

        <Typography variant='h6'>
          Rating
        </Typography>
        <Typography className={classes.ratingEntry}>
          ID: {ratingID}
        </Typography>
        {
          rating?
            <Typography>
              rating: {rating.getName()},{rating.getProject()}, {rating.getEvaluator()},{rating.getToBeAssessed()},{rating.getGrade()},{rating.getPassed()}
            </Typography>
            : null
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={loadingError} contextErrorMsg={`The data of rating id ${ratingID} could not be loaded.`} onReload={this.getRating} />
      </Paper>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  ratingEntry: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  }
});

/** PropTypes */
RatingDetails.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ratingID to be rendered */
  ratingID: PropTypes.string.isRequired

}

export default withStyles(styles)(RatingDetails);
