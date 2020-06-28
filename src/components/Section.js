import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import CourseCard from './CourseCard';

const useStyles = makeStyles((theme) => ({
  sectionTitle: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    '&:hover': {
      cursor: 'pointer',
    },
  },
  viewAllCard: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  arrowIcon: {
    marginTop: theme.spacing(4),
    display: 'block',
    background: '#cecece',
    padding: theme.spacing(1),
    borderRadius: '50%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const Section = ({ title, cards, viewAll }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.sectionContainer}>
      <Typography variant="h5" component="h2" className={classes.sectionTitle}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4} lg={3}>
            <CourseCard />
          </Grid>
        ))}
        {viewAll && (
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.viewAllCard}>
              <ArrowForwardIcon
                className={classes.arrowIcon}
                onClick={() => {
                  history.push(viewAll);
                }}
              />
              <Typography
                variant="h6"
                component="h3"
                className={classes.sectionTitle}
                onClick={() => {
                  history.push(viewAll);
                }}
              >
                View all {title}
              </Typography>
            </Card>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  cards: PropTypes.array,
  viewAll: PropTypes.string,
};

Section.defaultProps = {
  cards: [],
  viewAll: undefined,
};

export default Section;
