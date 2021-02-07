import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, Accordion, AccordionSummary, AccordionDetails, InputAdornment, IconButton, Grid, Typography, ListItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import ManagementAPI from '../api/ManagementAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ProjectListEntryStudent from './ProjectListEntryStudent';
import Paper from '@material-ui/core/Paper';
import ProjectListEntryAccepted from "./ProjectListEntryAccepted";



class ProjectListStudent extends Component {

    constructor(props) {
        super(props);


        // Init an empty state
        this.state = {
            projectStudents: [],
            acceptedProjects: [],
            error: null,
            loadingInProgress: false,
            currentUser: [],
            student: null,
        };
    }


    getProjectsByStudent = async () => {
        console.log(this.props.currentUserMail)
        await ManagementAPI.getAPI().getStudentByMail(this.props.currentUserMail).then(studentBOs =>
            this.setState({                     // Set new state when ProjectBOs have been fetched
                currentUser: studentBOs,
                loadingInProgress: false,   // disable loading indicator
                error: null
            })).catch(e =>
            this.setState({             // Reset state with error from catch
                currentUser: [],
                loadingInProgress: false, // disable loading indicator
                error: e
            })
        );

        // set loading to true
        this.setState({
            loadingInProgress: true,
            error: null
        });

        ManagementAPI.getAPI().getProjectsByStudent(this.state.currentUser.id).then(projectBOs =>
            this.setState({               // Set new state when ProjectBOs have been fetched
                projectStudents: projectBOs,
                loadingInProgress: false,   // disable loading indicator
                error: null
            })).catch(e =>
            this.setState({             // Reset state with error from catch
                projectStudents: [],
                loadingInProgress: false, // disable loading indicator
                error: e

            })
        );
        console.log(this.state);
    }

    getProjectsByAccepted = () => {
        ManagementAPI.getAPI().getProjectsByAccepted().then(projectBOs =>
            this.setState({  // Set new state when ParticipationBOs have been fetched
                acceptedProjects: projectBOs,
                loadingInProgress: false, // loading indicator
                error: null
            })).catch(e =>
            this.setState({ // Reset state with error from catch
                acceptedProjects: [],
                loadingInProgress: false,
                error: e
            })
        );
    }
        /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
        componentDidMount()
        {
            this.getProjectsByStudent();
            this.getProjectsByAccepted();
        }


        render()
        {
            const {classes} = this.props;
            const {projectStudents, loadingInProgress, error, acceptedProjects} = this.state;

            return (
                <div>
                    <Grid item xs/>
                    <Grid item>
                        <h1>Meine Projekte</h1>
                        {
                            projectStudents.map(project =>
                                <ProjectListEntryStudent key={project.getID()} project={project}/>)
                        }
                    </Grid>
                        <Typography variant='body1' className={classes.bottom}>
                            <Grid>
                        <h1>Verfügbare Projekte</h1>
                        {
                            acceptedProjects.map(project =>
                                <ProjectListEntryAccepted key={project.getID()} project={project}/>)
                        }

                        <LoadingProgress show={loadingInProgress}/>
                        <ContextErrorMessage error={error} contextErrorMsg={`The list of projects could not be loaded.`}
                                             onReload={this.getProjectsByStudent}/>
                    </Grid>
                    </Typography>
                </div>
            );
        }


    }

    /** Component specific styles */
    const
    styles = theme => ({
        root: {
            width: '100%',
        }
    })

    /** PropTypes */
ProjectListStudent.propTypes =
        {
    /** @ignore */
   classes: PropTypes.object.isRequired,
   /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ProjectListStudent));