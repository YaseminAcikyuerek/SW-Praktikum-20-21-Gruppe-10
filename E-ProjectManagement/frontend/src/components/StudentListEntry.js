import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StudentForm from './dialogs/StudentForm';
import StudentDeleteDialog from './dialogs/StudentDeleteDialog';
import ProjectList from './ProjectList';


/**
 * Renders a CustomerBO object within a expandable/collapsible CustomerListEntry with the customer manipulation
 * functions. If expanded, it renders a AccountList.
 *
 * @see See [AccountList](#accountlist)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class StudentListEntry extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      student: props.student,
      showStudentForm: false,
      showStudentDeleteDialog: false,
    };
  }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.student);
  }

  /** Handles onAccountDelete events from an AccountListEntry
  deleteProjectHandler = (deletedProject) => {
    // console.log(deletedProject.getID());
    this.setState({
      accounts: this.state.project.filter(project => project.getID() !== deletedProject.getID())
    })
  }

  /** Handles the onClick event of the edit customer button */
  editStudentButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showStudentForm: true
    });
  }

  /** Handles the onClose event of the CustomerForm */
  studentFormClosed = (student) => {
    // student is not null and therefor changed
    if (student) {
      this.setState({
        student: student,
        showStudentForm: false
      });
    } else {
      this.setState({
        showStudentForm: false
      });
    }
  }

  /** Handles the onClick event of the delete customer button */
  deleteStudentButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showStudentDeleteDialog: true
    });
  }

  /** Handles the onClose event of the StudentDeleteDialog */
  deleteStudentDialogClosed = (student) => {
    // if student is not null, delete it
    if (student) {
      this.props.onStudentDeleted(student);
    };

    // Don´t show the dialog
    this.setState({
      showStudentDeleteDialog: false
    });
  }

  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states student
    const { student, showStudentForm, showStudentDeleteDialog } = this.state;

    // console.log(this.state);
    return (
      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`student${student.getID()}studentpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{student.getCourseAbbr()}, {student.getMatriculationNr()}
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editStudentButtonClicked}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={this.deleteStudentButtonClicked}>
                    delete
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography variant='body2' color={'textSecondary'}>List of projects</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <ProjectList show={expandedState} student={student} />
          </AccordionDetails>
        </Accordion>
        <StudentForm show={showStudentForm} student={student} onClose={this.studentFormClosed} />
        <StudentDeleteDialog show={showStudentDeleteDialog} student={student} onClose={this.deleteStudentDialogClosed} />
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
StudentListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO to be rendered */
  student: PropTypes.object.isRequired,
  /** The state of this CustomerListEntry. If true the customer is shown with its accounts */
  expandedState: PropTypes.bool.isRequired,
  /** The handler responsible for handle expanded state changes (exanding/collapsing) of this CustomerListEntry
   *
   * Signature: onExpandedStateChange(CustomerBO customer)
   */
  onExpandedStateChange: PropTypes.func.isRequired,
  /**
   *  Event Handler function which is called after a sucessfull delete of this customer.
   *
   * Signature: onCustomerDelete(CustomerBO customer)
   */
  onStudentDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(StudentListEntry);
