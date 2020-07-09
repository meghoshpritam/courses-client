/* eslint-disable no-unused-expressions */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { DropzoneArea } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const FileUpload = ({ type }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" align="center">
          Add {type}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box p={2}>
          <DropzoneArea
            acceptedFiles={(() => {
              switch (type) {
                case 'image':
                  return ['image/*'];
                case 'video':
                  return ['video/*'];
                default:
                  return ['*'];
              }
            })()}
            filesLimit={1}
            dropzoneText={`Drag and drop an ${type} here or click`}
            onChange={(files) => console.log('Files:', files)}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Button variant="outlined" fullWidth>
          Upload {type}
        </Button>
      </Grid>
    </Grid>
  );
};

FileUpload.propTypes = { type: PropTypes.string.isRequired };

FileUpload.defaultProps = {};

export default FileUpload;
