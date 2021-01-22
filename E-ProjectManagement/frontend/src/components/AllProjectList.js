import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ProjectDetails from './ProjectDetails';


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

  /** gets the project list */
  loadProjects = () => {
    ManagementAPI.getAPI().getProjects().then(projects =>
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
            projects.map(project => <ProjectDetails key={project.getID()}
            projectID={project.getOwner().toString()} ProjectID={project.getID().toString()} />)
          }
          <LoadingProgress show={loadingInProgress} />
          <ContextErrorMessage error={loadingError} contextErrorMsg={`The list of all projects could not be loaded.`} onReload={this.loadProjects} />
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
AllProjectList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AllProjectList);