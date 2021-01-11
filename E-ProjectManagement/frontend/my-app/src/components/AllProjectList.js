import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { ManagementAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ProjectDetail from './ProjectDetail';

/**
 * Shows all accounts of the bank.
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class AllProjectList extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      projects: [],
      loadingInProgress: false,
      loadingError: null,
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.loadProjects();
  }

  /** gets the account list for this account */
  loadProjects = () => {
    ManagementAPI.getAPI().getAllProjects().then(projects =>
      this.setState({
        projects: projects,
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
    const { projects, loadingInProgress, loadingError } = this.state;

    return (
      <div className={classes.root}>
          {
            projects.map(project => <ProjectDetail key={project.getID()}
            projectID={project.getOwner().toString()} ProjectID={project.getID().toString()} />)
          }
          <LoadingProgress show={loadingInProgress} />
          <ContextErrorMessage error={loadingError} contextErrorMsg={`The list of all accounts of the bank could not be loaded.`} onReload={this.loadAccounts} />
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
AllProjectListList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AllProjectListList);