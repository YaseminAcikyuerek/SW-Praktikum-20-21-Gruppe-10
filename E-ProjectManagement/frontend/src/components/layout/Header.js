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
class Header extends Component {

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
        {
          user ?
            <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.handleTabChange} >
              <Tab label=' Persons' component={RouterLink} to={`/persons`} />
              <Tab label='Students' component={RouterLink} to={`/students`} />
              <Tab label='Projects' component={RouterLink} to={`/projects`} />
              <Tab label='Modules' component={RouterLink} to={`/modules`} />
              <Tab label='Project Types' component={RouterLink} to={`/projectTypes`} />
              <Tab label='Semesters' component={RouterLink} to={`/semester`} />
              <Tab label='Ratings' component={RouterLink} to={`/ratings`} />
              <Tab label='About' component={RouterLink} to={`/about`} />
            </Tabs>
            : null
        }
      </Paper>
    )
  }
}

/** PropTypes */
Header.propTypes = {
  /** The logged in firesbase user */
  user: PropTypes.object,
}

export default Header;