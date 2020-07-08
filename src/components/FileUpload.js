import React from 'react';
import Grid from '@material-ui/core/Grid';
import { DropzoneArea } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const FileUpload = () => {
  return (
    <Grid container>
      <Grid item>
        <DropzoneArea
          acceptedFiles={['image/*']}
          dropzoneText="Drag and drop an image here or click"
          onChange={(files) => console.log('Files:', files)}
        />
      </Grid>
      <Grid item>
        <Button variant="outlined">Submit</Button>
      </Grid>
    </Grid>
  );
};

FileUpload.propTypes = {};

FileUpload.defaultProps = {};

export default FileUpload;
