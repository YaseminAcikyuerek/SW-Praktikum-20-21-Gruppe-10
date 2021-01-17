import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RatingForm from './dialogs/RatingForm';
import RatingDeleteDialog from './dialogs/RatingDeleteDialog';
import RatingList from './RatingList';


/**
 * Renders a CustomerBO object within a expandable/collapsible CustomerListEntry with the customer manipulation
 * functions. If expanded, it renders a AccountList.
 *
 * @see See [RatingList](#accountlist)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class RatingListEntry extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      rating: props.rating,
      showRatingForm: false,
      showRatingDeleteDialog: false,
    };
  }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.rating);
  }

  /** Handles onAccountDelete events from an AccountListEntry
  deleteAccountHandler = (deletedAccount) => {
    // console.log(deletedAccount.getID());
    this.setState({
      accounts: this.state.accounts.filter(account => account.getID() !== deletedAccount.getID())
    })
  }

  /** Handles the onClick event of the edit customer button */
  editRatingButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showRatingForm: true
    });
  }

  /** Handles the onClose event of the RatingForm */
  ratingFormClosed = (rating => {
    // customer is not null and therefor changed
    if (rating) {
      this.setState({
        rating: rating,
        showRatingForm: false
      });
    } else {
      this.setState({
        showRatingForm: false
      });
    }
  })

  /** Handles the onClick event of the delete rating button */
  deleteRatingButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showRatingDeleteDialog: true
    });
  }

  /** Handles the onClose event of the RatingDeleteDialog */
  deleteRatingDialogClosed = (rating) => {
    // if rating is not null, delete it
    if (rating) {
      this.props.onRatingDeleted(rating);
    };

    // Don´t show the dialog
    this.setState({
      showRatingDeleteDialog: false
    });
  }

  /** Renders the component */
  render() {
    const { classes, expandedState } = this.props;
    // Use the states rating
    const { rating, showRatingForm, showRatingDeleteDialog } = this.state;

    // console.log(this.state);
    return (
      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`rating${rating.getID()}accountpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{rating.getProject()}, {rating.getEvaluator()},{rating.getToBeAssessed()},{rating.getGrade()},{rating.getPassed()}
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editRatingButtonClicked}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={this.deleteRatingButtonClicked}>
                    delete
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography variant='body2' color={'textSecondary'}>List of accounts</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <AccountList show={expandedState} rating={rating} />
          </AccordionDetails>
        </Accordion>
        <RatingForm show={showRatingForm} rating={rating} onClose={this.ratingFormClosed} />
        <RatingDeleteDialog show={showRatingDeleteDialog} rating={crating} onClose={this.deleteRatingDialogClosed} />
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
RatingListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The RatingBO to be rendered */
  rating: PropTypes.object.isRequired,
  /** The state of this RatingListEntry. If true the rating is shown with its accounts */
  expandedState: PropTypes.bool.isRequired,
  /** The handler responsible for handle expanded state changes (exanding/collapsing) of this RatingListEntry
   *
   * Signature: onExpandedStateChange(RatingBO rating)
   */
  onExpandedStateChange: PropTypes.func.isRequired,
  /**
   *  Event Handler function which is called after a sucessfull delete of this rating.
   *
   * Signature: onRatingDelete(RatingBO rating)
   */
  onRatingDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(RatingListEntry);
