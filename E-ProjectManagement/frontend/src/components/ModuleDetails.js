import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Paper, Typography, withStyles} from '@material-ui/core';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';


class ModuleDetails extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      module: null,
      loadingInProgress: false,
      loadingError: null,
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getModule();
  }

  /** gets the balance for this module */
  getModule = () => {
    ManagementAPI.getAPI().getModule(this.props.moduleID).then(module =>
      this.setState({
        module: module,
        loadingInProgress: false,
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch
          module: null,
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
    const { classes, moduleID } = this.props;
    const { module, loadingInProgress, loadingError } = this.state;

    return (
      <Paper variant='outlined' className={classes.root}>

        <Typography variant='h6'>
          Module
        </Typography>
        <Typography className={classes.moduleEntry}>
          ID: {moduleID}
        </Typography>
        {
          module ?
            <Typography>
              module: {module.getName()}, {module.getEdvNr()}
            </Typography>
            : null
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={loadingError} contextErrorMsg={`The data of module id ${moduleID} could not be loaded.`} onReload={this.getModule} />
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
  /** The moduleID to be rendered */
  moduleID: PropTypes.string.isRequired,


}

export default withStyles(styles)(ModuleDetails);