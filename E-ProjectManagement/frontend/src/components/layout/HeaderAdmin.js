import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Tabs, Tab } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import ProfileDropDown from '../dialogs/ProfileDropDown';

/**
 * Shows the header with the main navigation Tabs within a Paper.
 *
 * @see See Material-UIs [Tabs](https://material-ui.com/components/tabs/)
 * @see See Material-UIs [Paper](https://material-ui.com/components/paper/)
 */
class HeaderAdmin extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      tabindex: 0
    };
  }

  /** Handles onChange events of the Tabs component */
  handleTabChange = (e, newIndex) => {
    // console.log(newValue)
    this.setState({
      tabindex: newIndex
    })
  };

  /** Renders the component */
  render() {
    const { user } = this.props;

    return (
      <Paper variant='outlined' >
        <ProfileDropDown user={user} />
        <Typography variant='h3' component='h1' align='center'>

        </Typography>
        <Typography variant='h4' component='h2' align='center'>
          <img width="700" alt="logo" src="projectonomy-logo.png" /> <br /> Home
        </Typography>
            <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.handleTabChange} >
              <Tab label='Persons' component={RouterLink} to={`/admin/person`} />
              <Tab label='Students' component={RouterLink} to={`/admin/students`} />
              <Tab label='Projects' component={RouterLink} to={`/admin/projects`} />
              <Tab label='Modules' component={RouterLink} to={`/admin/modules`} />
              <Tab label='Project Types' component={RouterLink} to={`/admin/projectTypes`} />
              <Tab label='Semesters' component={RouterLink} to={`/admin/semester`} />
              <Tab label='Ratings' component={RouterLink} to={`/admin/ratings`} />
              <Tab label='Participations' component={RouterLink} to={`/admin/participation`} />
              <Tab label='About' component={RouterLink} to={`/about`} />

            </Tabs>
      </Paper>
    )
  }
}

/** PropTypes */
HeaderAdmin.propTypes = {
  /** The logged in firesbase user */
  user: PropTypes.object,
}

export default HeaderAdmin;