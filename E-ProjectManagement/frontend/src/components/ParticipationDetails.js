import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';

/**
 * @author [Enes Tepeli]
 */
class ParticipationDetails extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      participation: null,
      loadingInProgress: false,
      loadingError: null,
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getParticipation();
  }

  /** gets the participationID for this participation*/
  getParticipation = () => {
    ManagementAPI.getAPI().getParticipation(this.props.participationID).then(participation =>
      this.setState({
        participation: participation,
        loadingInProgress: false,
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch
          participation: null,
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
    const { classes, participationID } = this.props;
    const { participation, loadingInProgress, loadingError } = this.state;

    return (
      <Paper variant='outlined' className={classes.root}>

        <Typography variant='h6'>
          Participation
        </Typography>
        <Typography className={classes.participationEntry}>
          ID: {participationID}
        </Typography>
        {
          participation ?
            <Typography>
              Participation: {participation.getProject()}, {participation.getStudent()}
            </Typography>
            : null
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={loadingError} contextErrorMsg={`The data of participation id ${participationID} could not be loaded.`} onReload={this.getParticipation} />
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
  participationEntry: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  }
});

/** PropTypes */
ParticipationDetails.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The participationID to be rendered */
  participationID: PropTypes.string.isRequired,
  /** The participationID to be rendered */

}

export default withStyles(styles)(ParticipationDetails);