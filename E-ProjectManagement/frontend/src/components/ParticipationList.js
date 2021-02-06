import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles, ListItem, Grid, Typography, TextField, InputAdornment, IconButton} from '@material-ui/core';
import { Button, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import {ManagementAPI} from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ParticipationListEntry from './ParticipationListEntry';
import ClearIcon from "@material-ui/icons/Clear";
import ParticipationForm from "./dialogs/ParticipationForm";


/**
 * Renders a list of ParticipationListEntry objects.
 *
 * @see See [ParticipationListEntry](#participationlistentry)
 *
 *
 */
class ParticipationList extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      participations: [],
      error: null,
      loadingInProgress: false,
      loadingParticipationError: null,
      showParticipationForm: false,
    };
  }

  /** Fetches all ParticipationBOs  */
  getParticipations = () => {
    ManagementAPI.getAPI().getParticipations().then(participationBOs =>
      this.setState({  // Set new state when ParticipationBOs have been fetched
        participations: participationBOs,
        loadingInProgress: false, // loading indicator
        error: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch
          participations: [],
          loadingInProgress: false,
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
    this.getParticipations();
  }



  /**
   * Handles onExpandedStateChange events from the PersonListEntry component. Toggels the expanded state of
   * the PersonListEntry of the given PersonBO.
   *
   * @param {person} ParticipationBO of the PersonListEntry to be toggeled
   */

  participationDeleted = participation => {
    const newParticipationList = this.state.participations.filter(participationFromState => participationFromState.getID() !== participation.getID());
    this.setState({
      participations: newParticipationList,
      filteredParticipations: [...newParticipationList],
      showParticipationForm: false
    });
  }

   /** Handles the onClick event of the add person button */
  addParticipationButtonClicked = event => {
    // Do not toggle the expanded state
    event.stopPropagation();
    //Show the PersonForm
    this.setState({
      showParticipationForm: true
    });
  }

  /** Handles the onClose event of the PersonForm */
  participationFormClosed = participation => {
    // person is not null and therefore created
    if (participation) {
      const newParticipationList = [...this.state.participations, participation];
      this.setState({
        persons: newParticipationList,
        filteredParticipations: [...newParticipationList],
        showParticipationForm: false
      });
    } else {
      this.setState({
        showParticipationForm: false
      });
    }
  }



  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { participations, loadingInProgress, error, showParticipationForm } = this.state;

    return (
      <div className={classes.root}>
          <Grid item xs />
          <Grid item>
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addParticipationButtonClicked}>
              Add Participation
          </Button>
          </Grid>
        {
          participations.map(participation =>
            <ParticipationListEntry key={participation.getID()} participation={participation}
              onParticipationDeleted={this.participationDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of participations could not be loaded.`} onReload={this.getParticipations} />
        <ParticipationForm show={showParticipationForm} onClose={this.participationFormClosed} />
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  participationList: {
    marginBottom: theme.spacing(2),
  },
  addParticipationButton: {
    position: 'absolute',
    right: theme.spacing(3),
    bottom: theme.spacing(1),
  }
});

/** PropTypes */
ParticipationList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The StudentBO of this ParticipationListStudent */
  location: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(ParticipationList));