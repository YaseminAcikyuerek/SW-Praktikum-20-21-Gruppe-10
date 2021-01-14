import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './Dialogs/ContextErrorMessage';
import LoadingProgress from './Dialogs/LoadingProgress';
import PersonDetails from './PersonDetails';

/**
 * Shows all accounts of the bank.
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class AllPersonList extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      accounts: [],
      loadingInProgress: false,
      loadingError: null,
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.loadPersons();
  }

  /** gets the account list for this account */
  loadPersons = () => {
    ManagementAPI.getAPI().getAllPersons().then(persons =>
      this.setState({
        persons: persons,
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
    const { persons, loadingInProgress, loadingError } = this.state;

    return (
      <div className={classes.root}>
          {
            persons.map(person => <PersonDetails key={person.getID()}
            personID={person.getRole().toString()} personID={person.getID().toString()} />)
          }
          <LoadingProgress show={loadingInProgress} />
          <ContextErrorMessage error={loadingError} contextErrorMsg={`The list of all person of the bank could not be loaded.`} onReload={this.loadPersons} />
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
AllPersonList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AllPersonList);
