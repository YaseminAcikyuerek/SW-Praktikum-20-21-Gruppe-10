import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProjectTypeForm from './dialogs/ProjectTypeForm';
import ProjectTypeDeleteDialog from './dialogs/ProjectTypeDeleteDialog';


class ProjectTypeListEntry extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      projectType: props.projectType,
      showProjectTypeForm: false,
      showProjectTypeDeleteDialog: false,
    };
  }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.projectType);
  }



  /** Handles the onClick event of the edit ProjectType button */
  editProjectTypeButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showProjectTypeForm: true
    });
  }

  /** Handles the onClose event of the ProjectTypeForm */
  projectTypeFormClosed = (projectType) => {
    // projectType is not null and there for changed
    if (projectType) {
      this.setState({
        projectType: projectType,
        showProjectTypeForm: false
      });
    } else {
      this.setState({
        showProjectTypeForm: false
      });
    }
  }

  /** Handles the onClick event of the delete projectType button */
  deleteProjectTypeButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showProjectTypeDeleteDialog: true
    });
  }

  /** Handles the onClose event of the ProjectTypeDeleteDialog */
  deleteProjectTypeDialogClosed = (projectType) => {
    // if projectType is not null, delete it
    if (projectType) {
      this.props.onProjectTypeDeleted(projectType);
    }

    // Don´t show the dialog
    this.setState({
      showProjectTypeDeleteDialog: false
    });
  }

  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states customer
    const { projectType, showProjectTypeForm, showProjectTypeDeleteDialog } = this.state;

    // console.log(this.state);
    return (
      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`projectType${projectType.getID()}panel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{projectType.getName()}
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editProjectTypeButtonClicked}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={this.deleteProjectTypeButtonClicked}>
                    delete
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography variant='body2' color={'textSecondary'}>List of projectType</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
        </Accordion>
        <ProjectTypeForm show={showProjectTypeForm} projectType={projectType} onClose={this.projectTypeFormClosed} />
        <ProjectTypeDeleteDialog show={showProjectTypeDeleteDialog} projectType={projectType} onClose={this.deleteProjectTypeDialogClosed} />
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
ProjectTypeListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ModuleBO to be rendered */
  projectType: PropTypes.object.isRequired,
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
  onProjectTypeDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(ProjectTypeListEntry);
