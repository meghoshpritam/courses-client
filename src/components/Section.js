import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CourseCard from './CourseCard';

const useStyles = makeStyles((theme) => ({
  sectionTitle: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
    display: 'block',
    background: '#cecece',
    padding: theme.spacing(1),
    borderRadius: '50%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default ({ title, cards = [], viewAll = false }) => {
  const classes = useStyles();
  return (
    <div className={classes.sectionContainer}>
      <Typography variant="h5" component="h2" className={classes.sectionTitle}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4}>
            <CourseCard />
          </Grid>
        ))}
        {viewAll && (
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.viewAllCard}>
              <ArrowForwardIcon className={classes.arrowIcon} />
              <Typography variant="h6" component="h3" className={classes.sectionTitle}>
                View all {title}
              </Typography>
            </Card>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
