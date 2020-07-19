/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import CircleSpring from '../CircleSpring';
import NodeCard from './NodeCard';

const ViewNodes = ({ switchToAddNode }) => {
  const nodes = useSelector((state) => state.nodes);

  return (
    <>
      {nodes.success && (
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
                Nodes
              </Typography>
            </Grid>
          </Grid>
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              {nodes.nodes?.map((node) => (
                <Grid item key={node._id} xs={12} sm={6} md={4} lg={3}>
                  <NodeCard
                    switchToAddNode={switchToAddNode}
                    title={node.name}
                    description={node.description}
                    img={node.img}
                    video={node.video}
                    type={node.type}
                    creator={node.creator?.name}
                    creatorId={node.creator._id}
                    id={node._id}
                    lastUpdated={node.updated}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      )}
      {nodes.fetch && <CircleSpring />}
    </>
  );
};

ViewNodes.propTypes = { switchToAddNode: PropTypes.func.isRequired };

ViewNodes.defaultProps = {};

export default ViewNodes;
