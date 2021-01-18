import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';


class AllModuleList extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      modules: [],
      loadingInProgress: false,
      loadingError: null,
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.loadModules();
  }

  /** gets the module list for this module */
  loadModules = () => {
    ManagementAPI.getAPI().getAllModules().then(modules =>
      this.setState({
        modules: modules,
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
    const { modules, loadingInProgress, loadingError } = this.state;

    return (
      <div className={classes.root}>
          {
            modules.map(module => <ModuleDetail key={module.getID()}
            personID={module.getOwner().toString()} moduleID={module.getID().toString()} />)
          }
          <LoadingProgress show={loadingInProgress} />
          <ContextErrorMessage error={loadingError} contextErrorMsg={`The list of all modules of the project management system could not be loaded.`} onReload={this.loadModules} />
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
AllModuleList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AllModuleList);
