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
  const projects = useSelector((state) => state.projects);

  return (
    <>
      {projects.success && (
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
                Projects
              </Typography>
            </Grid>
          </Grid>
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              {projects.projects?.map((project) => (
                <Grid item key={project._id} xs={12} sm={6} md={4} lg={3}>
                  <CourseCard
                    title={project.name}
                    description={project.description}
                    creator={project.creator.name}
                    lastUpdated={project.updated}
                    rating={Number(project.rating) || 0}
                    totalRating={Number(project.totalRating) || 0}
                    price={project.price}
                    img={project.img}
                    vide={project.video}
                    type="project"
                    id={project._id}
                    creatorId={project.creator._id}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      )}
      {projects.fetch && <CircleSpring />}
    </>
  );
};

ViewNodes.propTypes = {};

ViewNodes.defaultProps = {};

export default ViewNodes;
