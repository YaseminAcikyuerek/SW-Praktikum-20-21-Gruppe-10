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
      filteredParticipations:[],
      participationFilter:'',
      error: null,
      loadingInProgress: false,
      loadingParticipationError: null,
      showParticipationError: null,
    };
  }

  /** Fetches AccountBOs for the current customer */
  getParticipations = () => {
    ManagementAPI.getAPI().getParticipations().then(participationBOs =>
      this.setState({  // Set new state when ParticipationBOs have been fetched
        participations: participationBOs,
        filteredParticipations:[...participationBOs],
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
  onExpandedStateChange = participation => {
    // console.log(personID);
    // Set expandend person entry to null by default
    let newID = null;

    // If same person entry is clicked, collapse it else expand a new one
    if (participation.getID() !== this.state.expandedParticipationID) {
      // Expand the person entry with personID
      newID = participation.getID();
    }
    // console.log(newID);
    this.setState({
      expandedParticipationID: newID,
    });
  }

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
  /** Handels onChange events of the person filter text field */
  filterFieldValueChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredParticipations: this.state.participations.filter(participation => {
        let projectContainsValue = participation.getProject().toLowerCase().includes(value);
        let studentContainsValue = participation.getStudent().toLowerCase().includes(value);


        return projectContainsValue || studentContainsValue ;
      }),
      participationFilter: value
    });
  }

  /** Handles the onClose event of the clear filter button */
  clearFilterFieldButtonClicked = () => {
    // Reset the filter
    this.setState({
      filteredParticipations: [...this.state.participations],
      participationFilter: ''
    });
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