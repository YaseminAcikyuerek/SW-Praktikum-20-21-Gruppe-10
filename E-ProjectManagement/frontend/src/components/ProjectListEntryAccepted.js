import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckIcon from "@material-ui/icons/Check";




/**
 * Renders a ProjectBO object within a expandable/collapsible ProjectListEntry with the project manipulation
 * functions. If expanded, it renders a ParticipationList.
 */
class ProjectListEntryAccepted extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      project: props.project,
      //participations: props.participations,
      showProjectForm: false,
      showProjectDeleteDialog: false,
    };
  }


  /** Renders the component */
  render() {
    const { classes } = this.props;
    // Use the states project
    const { project} = this.state;

    // console.log(this.state);
    return (
      <div>
        <Accordion >
          <AccordionSummary
            id={`project${project.getID()}projectpanel-header`}>
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>
                  Projet-ID:      {project.getID()}, <br></br>
                  Projektname:    {project.getName()}, <br></br>
                  Modul:          {project.getOwner()}<br></br>
                  Projekt-Typ:    {project.getProjectType()}<br></br>
                  Semester:       {project.getSemester()}<br></br>
                  Projektinhaber: {project.getOwner()}<br></br>
                  Partner:        {project.getExternalPartnerList()}<br></br>
                  Beschreibung:   {project.getShortDescription()}<br></br>
                <Button
                        color="secondary"
                        className={classes.buttonAnmelden}
                        startIcon={<CheckIcon/>}
                        variant="contained" color='primary' size='small'  onClick={this.addParticipationButtonClicked}>
                Anmelden
                </Button>
                <Button variant="contained"
                        color="secondary"
                        className={classes.buttonAbmelden}
                        startIcon={<HighlightOffIcon/>}
                        variant='outlined' color='primary' size='small' onClick={() => this.deleteParticipation}>
                Abmelden
                </Button>
              </Typography>
              <Typography variant='body1' className={classes.heading}>
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
      </Accordion>
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
ProjectListEntryAccepted.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjectBO to be rendered */
  project: PropTypes.object.isRequired,

  onProjectDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(ProjectListEntryAccepted);