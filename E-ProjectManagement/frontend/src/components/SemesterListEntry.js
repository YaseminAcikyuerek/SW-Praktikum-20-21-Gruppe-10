import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SemesterForm from './dialogs/SemesterForm';
import SemesterDeleteDialog from './dialogs/SemesterDeleteDialog';


class SemesterListEntry extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      semester: props.semester,
      showSemesterForm: false,
      showSemesterDeleteDialog: false,
    };
  }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.semester);
  }



  /** Handles the onClick event of the edit Module button */
  editSemesterButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showSemesterForm: true
    });
  }

  /** Handles the onClose event of the SemesterForm */
  semesterFormClosed = (semester) => {
    // module is not null and there for changed
    if (semester) {
      this.setState({
        semester: semester,
        showSemesterForm: false
      });
    } else {
      this.setState({
        showSemesterForm: false
      });
    }
  }

  /** Handles the onClick event of the delete semester button */
  deleteSemesterButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showSemesterDeleteDialog: true
    });
  }

  /** Handles the onClose event of the SemesterDeleteDialog */
  deleteSemesterDialogClosed = (semester) => {
    // if semester is not null, delete it
    if (semester) {
      this.props.onSemesterDeleted(semester);
    }

    // Don´t show the dialog
    this.setState({
      showSemesterDeleteDialog: false
    });
  }

  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states customer
    const { semester, showSemesterForm, showSemesterDeleteDialog } = this.state;

    // console.log(this.state);
    return (
      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`semester${semester.getID()}semesterpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{semester.getName()}
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editSemesterButtonClicked}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={this.deleteSemesterButtonClicked}>
                    delete
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography variant='body2' color={'textSecondary'}>List of semester</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
        </Accordion>
        <SemesterForm show={showSemesterForm} semester={semester} onClose={this.semesterFormClosed} />
        <SemesterDeleteDialog show={showSemesterDeleteDialog} semester={semester} onClose={this.deleteSemesterDialogClosed} />
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
SemesterListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The SemesterBO to be rendered */
  module: PropTypes.object.isRequired,
  /** The state of this SemesterListEntry.
  expandedState: PropTypes.bool.isRequired,
  /** The handler responsible for handle expanded state changes (exanding/collapsing) of this SemesterListEntry
   *
   * Signature: onExpandedStateChange(SemesterBO semester)
   */
  onExpandedStateChange: PropTypes.func.isRequired,
  /**
   *  Event Handler function which is called after a sucessfull delete of this semester.
   *
   * Signature: onSemesterDelete(SemesterBO semester)
   */
  onModuleDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(SemesterListEntry);