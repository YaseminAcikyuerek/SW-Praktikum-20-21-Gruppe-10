import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import SemesterDetails from '../components/SemesterDetails';


/**
 */
class AllSemesterList extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      semesters: [],
      loadingInProgress: false,
      loadingError: null,
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.loadSemesters();
  }

  /** gets the module list for this module */
  loadSemesters = () => {
    ManagementAPI.getAPI().getSemesters().then(semesters =>
      this.setState({
        semesters: semesters,
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
    const { semesters, loadingInProgress, loadingError } = this.state;

    return (
      <div className={classes.root}>
          {
            semesters.map(semester => <SemesterDetails key={semester.getID()}
            personID={semester.getName().toString()} semesterID={semester.getID().toString()} />)
          }
          <LoadingProgress show={loadingInProgress} />
          <ContextErrorMessage error={loadingError} contextErrorMsg={`The list of all semesters of the project management system could not be loaded.`} onReload={this.loadSemesters} />
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
AllSemesterList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AllSemesterList);
