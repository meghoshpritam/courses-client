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
  const courses = useSelector((state) => state.courses);

  return (
    <>
      {courses.success && (
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
                Courses
              </Typography>
            </Grid>
          </Grid>
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              {courses.courses?.map((course) => (
                <Grid item key={course._id} xs={12} sm={6} md={4} lg={3}>
                  <CourseCard
                    title={course.name}
                    description={course.description}
                    creator={course.creator.name}
                    lastUpdated={course.updated}
                    rating={Number(course.rating) || 0}
                    totalRating={Number(course.totalRating) || 0}
                    price={course.price}
                    img={course.img}
                    vide={course.video}
                    type="course"
                    id={course._id}
                    creatorId={course.creator._id}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      )}
      {courses.fetch && <CircleSpring />}
    </>
  );
};

ViewNodes.propTypes = {};

ViewNodes.defaultProps = {};

export default ViewNodes;
