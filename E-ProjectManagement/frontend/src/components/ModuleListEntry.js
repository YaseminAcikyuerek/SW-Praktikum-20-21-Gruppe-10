import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ModuleForm from './dialogs/ModuleForm';
import ModuleDeleteDialog from './dialogs/ModuleDeleteDialog';


class ModuleListEntry extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      module: props.module,
      showModuleForm: false,
      showModuleDeleteDialog: false,
    };
  }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.module);
  }



  /** Handles the onClick event of the edit Module button */
  editModuleButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showModuleForm: true
    });
  }

  /** Handles the onClose event of the ModuleForm */
  moduleFormClosed = (module) => {
    // module is not null and there for changed
    if (module) {
      this.setState({
        module: module,
        showModuleForm: false
      });
    } else {
      this.setState({
        showModuleForm: false
      });
    }
  }

  /** Handles the onClick event of the delete module button */
  deleteModuleButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showModuleDeleteDialog: true
    });
  }

  /** Handles the onClose event of the ModuleDeleteDialog */
  deleteModuleDialogClosed = (module) => {
    // if module is not null, delete it
    if (module) {
      this.props.onModuleDeleted(module);
    }

    // Don´t show the dialog
    this.setState({
      showModuleDeleteDialog: false
    });
  }

  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states customer
    const { module, showModuleForm, showModuleDeleteDialog } = this.state;

    // console.log(this.state);
    return (
      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`module${module.getID()}accountpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>
                  Modulname:  {module.getName()},<br></br>
                  EdV-Nr:     {module.getEdvNr()},<br></br>
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editModuleButtonClicked}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={this.deleteModuleButtonClicked}>
                    delete
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography variant='body2' color={'textSecondary'}>List of module</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
        </Accordion>
        <ModuleForm show={showModuleForm} module={module} onClose={this.moduleFormClosed} />
        <ModuleDeleteDialog show={showModuleDeleteDialog} module={module} onClose={this.deleteModuleDialogClosed} />
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
ModuleListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ModuleBO to be rendered */
  module: PropTypes.object.isRequired,
  /** The state of this ModuleListEntry. If true the module is shown with its accounts */
  expandedState: PropTypes.bool.isRequired,
  /** The handler responsible for handle expanded state changes (exanding/collapsing) of this ModuleListEntry
   *
   * Signature: onExpandedStateChange(ModuleBO module)
   */
  onExpandedStateChange: PropTypes.func.isRequired,
  /**
   *  Event Handler function which is called after a sucessfull delete of this module.
   *
   * Signature: onModuleDelete(ModuleBO module)
   */
  onModuleDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(ModuleListEntry);
