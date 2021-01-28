import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';

/**
 * @author [Enes Tepeli]
 */
class ParticipationDetails extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      student: null,
      loadingInProgress: false,
      loadingError: null,
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getStudent();
  }

  /** gets the participationID for this participation*/
  getStudent = () => {
    ManagementAPI.getAPI().getStudent(this.props.studentID).then(student =>
      this.setState({
        student: student,
        loadingInProgress: false,
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch
          student: null,
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
    const { classes, studentID, participationID } = this.props;
    const { student, loadingInProgress, loadingError } = this.state;

    return (
      <Paper variant='outlined' className={classes.root}>

        <Typography variant='h6'>
          Participation
        </Typography>
        <Typography className={classes.participationEntry}>
          ID: {participationID}
        </Typography>
        {
          student ?
            <Typography>
              Student: {student.getCourseAbbr()}, {student.getMatriculationNr()}
            </Typography>
            : null
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={loadingError} contextErrorMsg={`The data of student id ${studentID} could not be loaded.`} onReload={this.getStudent} />
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
  participationEntry: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  }
});

/** PropTypes */
ParticipationDetails.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The participationID to be rendered */
  studentID: PropTypes.string.isRequired,
  /** The participationID to be rendered */
  participationID: PropTypes.string.isRequired,
}

export default withStyles(styles)(ParticipationDetails);