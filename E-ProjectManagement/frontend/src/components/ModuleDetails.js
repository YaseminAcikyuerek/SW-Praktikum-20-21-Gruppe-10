import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';


class ModuleDetails extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      person: null,
      loadingInProgress: false,
      loadingError: null,
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getPerson();
  }

  /** gets the balance for this module */
  getPerson = () => {
    ManagementAPI.getAPI().getPerson(this.props.personID).then(person =>
      this.setState({
        person: person,
        loadingInProgress: false,
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch
          person: null,
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
    const { classes, personID, moduleID } = this.props;
    const { person, loadingInProgress, loadingError } = this.state;

    return (
      <Paper variant='outlined' className={classes.root}>

        <Typography variant='h6'>
          Module
        </Typography>
        <Typography className={classes.moduleEntry}>
          ID: {moduleID}
        </Typography>
        {
          person ?
            <Typography>
              Person: {person.getLastName()}, {person.getFirstName()}
            </Typography>
            : null
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={loadingError} contextErrorMsg={`The data of person id ${personID} could not be loaded.`} onReload={this.getPerson} />
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
  moduleEntry: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  }
});

/** PropTypes */
ModuleDetails.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The personID to be rendered */
  personID: PropTypes.string.isRequired,
  /** The moduleID to be rendered */
  moduleID: PropTypes.string.isRequired,
}

export default withStyles(styles)(ModuleDetails);