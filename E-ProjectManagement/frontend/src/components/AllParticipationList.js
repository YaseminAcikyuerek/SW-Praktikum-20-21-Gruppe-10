import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';

class AllParticipationList extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      participations: [],
      loadingInProgress: false,
      loadingError: null,
    };
  }

    /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
   componentDidMount() {
    this.loadParticipations();
  }

  /** gets the participation list for this participation */
  loadParticipations = () => {
    ManagementAPI.getAPI().getAllParticipations().then(participations =>
      this.setState({
        participations: participations,
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
    const { participations, loadingInProgress, loadingError } = this.state;

    return (
      <div className={classes.root}>
          {
            participations.map(participation => <ModuleDetail key={participation.getID()}
            personID={participation.getOwner().toString()} participationID={participation.getID().toString()} />)
          }
          <LoadingProgress show={loadingInProgress} />
          <ContextErrorMessage error={loadingError} contextErrorMsg={`The list of all participations of the project management system could not be loaded.`} onReload={this.loadParticipations} />
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
AllParticipationList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AllParticipationList);