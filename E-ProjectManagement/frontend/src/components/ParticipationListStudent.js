import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, ListItem } from '@material-ui/core';
import { Button, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {ManagementAPI} from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ParticipationListEntryStudent from './ParticipationListEntryStudent';


/**
 * Renders a list of ParticipationListEntry objects.
 *
 * @see See [ParticipationListEntry](#participationlistentry)
 *
 *
 */
class ParticipationListStudent extends Component {

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
    ManagementAPI.getAPI().getParticipationsForStudents(this.props.student.getID()).then(participationBOs =>
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
  componentDidUpdate(prevProps) {

  }

  /** Adds an account for the current customer */
  addParticipation = () => {
    ManagementAPI.getAPI().addParticipationForStudent(this.props.student.getID()).then(participationBO => {
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
    const { classes, student } = this.props;
    // Use the states student
    const { participations, loadingInProgress, loadingParticipationError, addingParticipationError } = this.state;

    // console.log(this.props);
    return (
      <div className={classes.root}>
        <List className={classes.participationList}>
          {
            participations.map(participation => <ParticipationListEntryStudent key={participation.getID()} student={student} participation={participation} onParticipationDeleted={this.deleteParticipationHandler}
              show={this.props.show} />)
          }
          <ListItem>
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={loadingParticipationError} contextErrorMsg={`List of participations for student ${student.getID()} could not be loaded.`} onReload={this.getParticipations} />
            <ContextErrorMessage error={addingParticipationError} contextErrorMsg={`Participation for student ${student.getID()} could not be added.`} onReload={this.addParticipation} />
          </ListItem>
        </List>
        <Button className={classes.addParticipationButton} variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addParticipation}>
          Add Participation
        </Button>
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
ParticipationListStudent.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The StudentBO of this ParticipationListStudent */
  student: PropTypes.object.isRequired,
  /** If true, participations are (re)loaded */
  show: PropTypes.bool.isRequired
}

export default withStyles(styles)(ParticipationListStudent);
