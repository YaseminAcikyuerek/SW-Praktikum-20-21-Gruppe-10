import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles, ListItem, Grid, Typography, TextField, InputAdornment, IconButton} from '@material-ui/core';
import { Button, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
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
      loadingInProgress: false,
      loadingParticipationError: null,
      addingParticipationError: null,
    };
  }

  /** Fetches AccountBOs for the current customer */
  getParticipations = () => {
    ManagementAPI.getAPI().getParticipations().then(participationBOs =>
      this.setState({  // Set new state when ParticipationBOs have been fetched
        participations: participationBOs,
        loadingInProgress: false, // loading indicator
        loadingParticipationError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch
          participations: [],
          loadingInProgress: false,
          loadingParticipationError: e
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      loadingParticipationError: null
    });
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getParticipations();
  }

  /** Lifecycle method, which is called when the component was updated */
  componentDidUpdate() {
    this.getParticipations();
  }

  addParticipation = () => {
    ManagementAPI.getAPI().addParticipation().then(participationBO => {
      // console.log(participationBO)
      this.setState({  // Set new state when AccountBOs have been fetched
        participations: [...this.state.participations, participationBO],
        loadingInProgress: false, // loading indicator
        addingParticipationError: null
      })
    }).catch(e =>
      this.setState({ // Reset state with error from catch
        participations: [],
        loadingInProgress: false,
        addingParticipationError: e
      })
    );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      addingParticipationError: null
    });
  }

  /** Handles onAccountDelete events from an AccountListEntry  */
  deleteParticipationHandler = (deletedParticipation) => {
    // console.log(deletedParticipation.getID());
    this.setState({
      participations: this.state.participations.filter(participation => participation.getID() !== deletedParticipation.getID())
    })
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { filteredParticipations, participationFilter, expandedParticipationID, loadingInProgress, error, showParticipationForm } = this.state;

    return (
      <div className={classes.root}>
        <Grid className={classes.participationFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
              Filter participation list by name:
              </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              id='participationFilter'
              type='text'
              value={participationFilter}
              onChange={this.filterFieldValueChange}
              InputProps={{
                endAdornment: <InputAdornment position='end'>
                  <IconButton onClick={this.clearFilterFieldButtonClicked}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs />
          <Grid item>
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addParticipationButtonClicked}>
              Add Participation
          </Button>
          </Grid>
        </Grid>
        {
          // Show the list of PersonListEntry components
          // Do not use strict comparison, since expandedPersonID maybe a string if given from the URL parameters
          filteredParticipations.map(participation =>
            <ParticipationListEntry key={participation.getID()} participation={participation} expandedState={expandedParticipationID === participation.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
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
  participation: PropTypes.object.isRequired,
  /** If true, participations are (re)loaded */
  show: PropTypes.bool.isRequired
}

export default withStyles(styles)(ParticipationList);