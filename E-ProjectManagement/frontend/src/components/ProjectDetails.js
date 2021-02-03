import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper } from '@material-ui/core';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';

/**
 * Renders a AccountBO object within a ListEntry and provides a delete button to delete it.
 */
class ProjectDetail extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      customer: null,
      loadingInProgress: false,
      loadingError: null,
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getProject();
  }

  /** gets the balance for this account */
  getProject = () => {
    ManagementAPI.getAPI().getProject(this.props.projectID).then(project =>
      this.setState({
        project: project,
        loadingInProgress: false,
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch
          project: null,
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
    const { classes, projectID, ownerID } = this.props;
    const { project, loadingInProgress, loadingError } = this.state;

    return (
      <Paper variant='outlined' className={classes.root}>

        <Typography variant='h6'>
          Project
        </Typography>
        <Typography className={classes.ProjectEntry}>
          ID: {projectID}
        </Typography>
        {
          project ?
            <Typography>
              Project: {project.getName()}, {project.getSemester()},{project.getModule()},
              {project.getShortDescription()}, {project.getExternalPartnerlist()}, {project.getCapacity()},
              {project.getBDAP()}, {project.getBBLP()}, {project.getBDLP()}, {project.getPDL()}, {project.getLanguage()},
              {project.getRoom()}, {project.getSpecialRoom()}, {project.getFlag()}, {project.getStatus()},
              {project.getProjectType()}, {project.getOwner()}
            </Typography>
            : null
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={loadingError} contextErrorMsg={`The data of project id ${projectID} could not be loaded.`} onReload={this.getProject} />
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
  projectEntry: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  }
});

/** PropTypes */
ProjectDetail.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The projectID to be rendered */
  projectID: PropTypes.string.isRequired,

}

export default withStyles(styles)(ProjectDetail);