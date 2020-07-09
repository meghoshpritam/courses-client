/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useGet from '../../hooks/useGet';
import CircleSpring from '../CircleSpring';
import NodeCard from './NodeCard';

const ViewNodes = () => {
  const [res, err, get] = useGet();

  useEffect(() => {
    get('/admin/nodes');
  }, []);

  useEffect(() => {
    console.log('err ', err);
  }, [err]);
  useEffect(() => {
    console.log('res ', res);
  }, [res]);

  return (
    <>
      {res && (
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
                Add Node
              </Typography>
            </Grid>
          </Grid>
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              {res?.nodes.map((node) => (
                <Grid item key={node._id} xs={12} sm={6} md={4} lg={3}>
                  <NodeCard
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
      {!res && !err && <CircleSpring />}
    </>
  );
};

ViewNodes.propTypes = {};

ViewNodes.defaultProps = {};

export default ViewNodes;
