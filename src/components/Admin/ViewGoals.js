/* eslint-disable no-underscore-dangle */
import React from 'react';
// import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import CircleSpring from '../CircleSpring';
import CourseCard from '../CourseCard';

const ViewNodes = () => {
  const goals = useSelector((state) => state.goals);

  return (
    <>
      {goals.success && (
        <>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography
                component="h1"
                variant="h4"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Goals
              </Typography>
            </Grid>
          </Grid>
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              {goals.goals?.map((goal) => (
                <Grid item key={goal._id} xs={12} sm={6} md={4} lg={3}>
                  <CourseCard
                    title={goal.name}
                    description={goal.description}
                    creator={goal.creator.name}
                    lastUpdated={goal.updated}
                    rating={Number(goal.rating) || 0}
                    totalRating={Number(goal.totalRating) || 0}
                    price={goal.price}
                    img={goal.img}
                    vide={goal.video}
                    type="goal"
                    id={goal._id}
                    creatorId={goal.creator._id}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      )}
      {goals.fetch && <CircleSpring />}
    </>
  );
};

ViewNodes.propTypes = {};

ViewNodes.defaultProps = {};

export default ViewNodes;
