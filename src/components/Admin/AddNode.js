/* eslint-disable react/jsx-curly-newline */
import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Collapse from '@material-ui/core/Collapse';
import EditIcon from '@material-ui/icons/Edit';
import LaunchIcon from '@material-ui/icons/Launch';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from '@material-ui/core/Link';
import FileUpload from '../FileUpload';
import {
  setName,
  setDescription,
  setType,
  setImg,
  setVideo,
  setMarkdown,
  setQuiz,
  setExam,
  setAssignment,
  addResource,
  deleteResource,
} from '../../store/Slices/node';
import usePost from '../../hooks/usePost';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 1),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
}));

export default () => {
  const classes = useStyles();
  const state = useSelector((s) => s.node);
  const dispatch = useDispatch();
  const [resource, setResource] = useState({ name: '', uri: '' });
  const [contentUpload, setContentUpload] = useState({
    image: '',
    imgBtn: false,
    video: '',
    videoImg: false,
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [response, error, post] = usePost();

  const submitHandler = (e) => {
    e.preventDefault();
    post('/admin/nodes', {
      name: state.name,
      description: state.description,
      img: state.img,
      video: state.video,
      markdown: state.markdown,
      resources: state.resources,
      quiz: state.quiz,
      exam: state.exam,
      assignment: state.assignment,
    });
  };

  useEffect(() => {
    console.log('res...', response);
  }, [response]);

  useEffect(() => {
    console.log('error', error);
  }, [error]);
  return (
    <Container component="main" maxWidth="md">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
            Add Node
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form className={classes.form} noValidate={false} onSubmit={submitHandler}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="type-label">Select Type</InputLabel>
                  <Select
                    labelId="type-label"
                    id="type"
                    value={state.type}
                    required
                    onChange={(event) => dispatch(setType(event.target.value))}
                    fullWidth
                    label="Select Type"
                  >
                    <MenuItem value="free">Free</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  required
                  fullWidth
                  value={state.name}
                  onChange={(event) => dispatch(setName(event.target.value))}
                  className={classes.formControl}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="description"
                  label="Description"
                  required
                  fullWidth
                  variant="outlined"
                  value={state.description}
                  onChange={(event) => dispatch(setDescription(event.target.value))}
                  className={classes.formControl}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl} variant="outlined">
                  <InputLabel htmlFor="image">Image Link</InputLabel>
                  <OutlinedInput
                    id="image"
                    value={state.img}
                    onChange={(event) => dispatch(setImg(event.target.value))}
                    endAdornment={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle image upload visibility"
                          onClick={() =>
                            setContentUpload({ ...contentUpload, imgBtn: !contentUpload.imgBtn })
                          }
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {contentUpload.imgBtn ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={85}
                  />
                </FormControl>
              </Grid>
              <Collapse
                in={contentUpload.imgBtn}
                timeout="auto"
                unmountOnExit
                style={{ width: '100%' }}
              >
                <Grid item xs={12}>
                  <FileUpload type="image" />
                </Grid>
              </Collapse>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl} variant="outlined">
                  <InputLabel htmlFor="markdown">Detail Description Link</InputLabel>
                  <OutlinedInput
                    id="markdown"
                    value={state.markdown}
                    onChange={(event) => dispatch(setMarkdown(event.target.value))}
                    endAdornment={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle video upload visibility"
                          onClick={() => {
                            window.open('/editor', '_blank');
                          }}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          <LaunchIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={165}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl} variant="outlined">
                  <InputLabel htmlFor="video">Video Link</InputLabel>
                  <OutlinedInput
                    id="video"
                    value={state.video}
                    onChange={(event) => dispatch(setVideo(event.target.value))}
                    endAdornment={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle video upload visibility"
                          onClick={() =>
                            setContentUpload({
                              ...contentUpload,
                              videoBtn: !contentUpload.videoBtn,
                            })
                          }
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {contentUpload.videoBtn ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={85}
                  />
                </FormControl>
              </Grid>
              <Collapse
                in={contentUpload.videoBtn}
                timeout="auto"
                unmountOnExit
                style={{ width: '100%' }}
              >
                <Grid item xs={12}>
                  <FileUpload type="video" />
                </Grid>
              </Collapse>
              <Grid item xs={12}>
                <Grid container spacing={2} style={{ paddingLeft: '5', paddingRight: '5' }}>
                  {state.resources.map((res) => (
                    <Grid item xs={12} sm={6} key={res.id}>
                      <Grid container spacing={2}>
                        <Grid item xs={1}>
                          <IconButton
                            onClick={() => {
                              for (let idx = 0; idx < state.resources.length; idx += 1) {
                                if (res.id === state.resources[idx].id) {
                                  setResource({
                                    name: state.resources[idx].name,
                                    uri: state.resources[idx].uri,
                                  });
                                  dispatch(deleteResource({ id: res.id }));
                                  break;
                                }
                              }
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          style={{
                            paddingTop: 20,
                            paddingLeft: 20,
                            wordWrap: 'break-word',
                          }}
                        >
                          <Link href={res.uri}>{res.name}</Link>
                        </Grid>
                        <Grid item xs={1}>
                          <IconButton onClick={() => dispatch(deleteResource({ id: res.id }))}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="resources-name"
                  label="Resources Name"
                  variant="outlined"
                  value={resource.name}
                  onChange={(e) => setResource({ ...resource, name: e.target.value })}
                  className={classes.formControl}
                />
              </Grid>
              <Grid item xs={10} sm={5}>
                <FormControl className={classes.formControl} variant="outlined">
                  <InputLabel htmlFor="resource-link">Resource Link</InputLabel>
                  <OutlinedInput
                    id="resource-link"
                    value={resource.uri}
                    onChange={(e) => setResource({ ...resource, uri: e.target.value })}
                    endAdornment={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle video upload visibility"
                          onClick={() =>
                            setContentUpload({
                              ...contentUpload,
                              resourceBtn: !contentUpload.resourceBtn,
                            })
                          }
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {contentUpload.resourceBtn ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={105}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={2} sm={1}>
                <IconButton
                  onClick={() => {
                    dispatch(addResource({ name: resource.name, uri: resource.uri }));
                    setResource({ name: '', uri: '' });
                  }}
                >
                  <AddCircleIcon color="secondary" fontSize="large" />
                </IconButton>
              </Grid>
              <Collapse
                in={contentUpload.resourceBtn}
                timeout="auto"
                unmountOnExit
                style={{ width: '100%' }}
              >
                <Grid item xs={12}>
                  <FileUpload type="any file" />
                </Grid>
              </Collapse>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl} variant="outlined">
                  <InputLabel htmlFor="quiz">Quiz Link</InputLabel>
                  <OutlinedInput
                    id="quiz"
                    value={state.quiz}
                    onChange={(event) => dispatch(setQuiz(event.target.value))}
                    endAdornment={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle video upload visibility"
                          onClick={() => {
                            window.open('https://forms.google.com', '_blank');
                          }}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          <LaunchIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl} variant="outlined">
                  <InputLabel htmlFor="exam">Exam Link</InputLabel>
                  <OutlinedInput
                    id="exam"
                    value={state.exam}
                    onChange={(event) => dispatch(setExam(event.target.value))}
                    endAdornment={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle video upload visibility"
                          onClick={() => {
                            window.open('https://forms.google.com', '_blank');
                          }}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          <LaunchIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={80}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="assignment"
                  label="Assignment Link"
                  variant="outlined"
                  value={state.assignment}
                  onChange={(event) => dispatch(setAssignment(event.target.value))}
                  className={classes.formControl}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  className={classes.submit}
                  fullWidth
                >
                  Add a new Node
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};
