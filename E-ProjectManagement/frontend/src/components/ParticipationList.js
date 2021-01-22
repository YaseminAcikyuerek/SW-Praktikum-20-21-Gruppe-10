import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ParticipationForm from './dialogs/ParticipationForm';
import ParticipationListEntry from './ParticipationListEntry';

/**
 * Controlls a list of ParticipationListEntrys to create a accordion for each Participation.
 *
 * @see See [ParticipationListEntry](#Participationlistentry)
 * @author [Tom Schenk]
 */
class ParticipationList extends Component {

  constructor(props) {
    super(props);

     console.log(props);
    let expandedID = null;

    if (this.props.location.participation) {
      expandedID = this.props.location.participation.getID();
    }

    // Init an empty state
    this.state = {
      participation: [],
      filteredParticipations: [],
      ParticipationFilter: '',
      error: null,
      loadingInProgress: false,
      expandedParticipationID: expandedID,
      showParticipationForm: false
    };
  }

  /** Fetches all ParticipationBOs from the backend */

  getParticipations = () => {
    ManagementAPI.getAPI().getParticipations()
        .then(participationBOs =>
        this.setState({               // Set new state when ParticipationBOs have been fetched
          participation: participationBOs,
          filteredParticipations: [...participationBOs], // store a copy
          loadingInProgress: false,   // disable loading indicator
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch
            participation: [],
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
    this.getParticipations();
  }

  /**
   * Handles onExpandedStateChange events from the ParticipationListEntry component. Toggels the expanded state of
   * the ParticipationListEntry of the given ParticipationBO.
   *
   * @param {Participation} ParticipationBO of the ParticipationListEntry to be toggeled
   */
  onExpandedStateChange = participation => {
    // console.log(ParticipationID);
    // Set expandend Participation entry to null by default
    let newID = null;

    // If same Participation entry is clicked, collapse it else expand a new one
    if (participation.getID() !== this.state.expandedParticipationID) {
      // Expand the Participation entry with ParticipationID
      newID = participation.getID();
    }
    // console.log(newID);
    this.setState({
      expandedParticipationID: newID,
    });
  }

  /**
   * Handles onParticipationDeleted events from the ParticipationListEntry component
   *
   * @param {Participation} ParticipationBO of the ParticipationListEntry to be deleted
   */
  ParticipationDeleted = Participation => {
    const newParticipationList = this.state.participation.filter(ParticipationFromState => ParticipationFromState.getID() !== Participation.getID());
    this.setState({
      Participations: newParticipationList,
      filteredParticipations: [...newParticipationList],
      showParticipationForm: false
    });
  }

  /** Handles the onClick event of the add Participation button */
  addParticipationButtonClicked = event => {
    // Do not toggle the expanded state
    event.stopPropagation();
    //Show the CustmerForm
    this.setState({
      showParticipationForm: true
    });
  }

  /** Handles the onClose event of the ParticipationForm */
  ParticipationFormClosed = Participation => {
    // Participation is not null and therefore created
    if (Participation) {
      const newParticipationList = [...this.state.Participations, Participation];
      this.setState({
        Participations: newParticipationList,
        filteredParticipations: [...newParticipationList],
        showParticipationForm: false
      });
    } else {
      this.setState({
        showParticipationForm: false
      });
    }
  }

  /** Handels onChange events of the Participation filter text field */
  filterFieldValueChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredParticipations: this.state.Participations.filter(Participation => {
        let nameContainsValue = Participation.getName().toLowerCase().includes(value);

        return nameContainsValue
      }),
      ParticipationFilter: value
    });
  }

  /** Handles the onClose event of the clear filter button */
  clearFilterFieldButtonClicked = () => {
    // Reset the filter
    this.setState({
      filteredParticipations: [...this.state.Participations],
      ParticipationFilter: ''
    });
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { filteredParticipations, ParticipationFilter, expandedParticipationID, loadingInProgress, error, showParticipationForm } = this.state;

    return (
      <div className={classes.root}>
        <Grid className={classes.ParticipationFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
              Filter Participation list by name:
              </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              id='ParticipationFilter'
              type='text'
              value={ParticipationFilter}
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
          // Show the list of ParticipationListEntry components
          // Do not use strict comparison, since expandedParticipationID maybe a string if given from the URL parameters
          filteredParticipations.map(Participation =>
            <ParticipationListEntry key={Participation.getID()} Participation={Participation} expandedState={expandedParticipationID === Participation.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
              onParticipationDeleted={this.ParticipationDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        //<ContextErrorMessage error={error} contextErrorMsg={`The list of participation could not be loaded.`} onReload={this.getParticipations} />
        <ParticipationForm show={showParticipationForm} onClose={this.ParticipationFormClosed} />
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  ParticipationFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }
});

/** PropTypes */
ParticipationList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ParticipationList));