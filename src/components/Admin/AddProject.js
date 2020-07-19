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
import FormHelperText from '@material-ui/core/FormHelperText';
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
  reset,
} from '../../store/Slices/node';
import { usePost, usePut } from '../../hooks/useAsync';
import { updateNode, addNode } from '../../store/Slices/nodes';

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
  const [success, setSuccess] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [response, error, post] = usePost();
  const [resPut, errPut, put] = usePut();

  const submitHandler = (e) => {
    e.preventDefault();
    if (state.id !== '') {
      put('/admin/nodes', {
        id: state.id,
        name: state.name,
        description: state.description,
        img: state.img,
        video: state.video,
        markdown: state.markdown,
        resources: [...state.resources],
        quiz: state.quiz,
        exam: state.exam,
        assignment: state.assignment,
      });
      return;
    }
    post('/admin/nodes', {
      name: state.name,
      description: state.description,
      img: state.img,
      video: state.video,
      markdown: state.markdown,
      resources: [...state.resources],
      quiz: state.quiz,
      exam: state.exam,
      assignment: state.assignment,
    });
  };

  useEffect(() => {
    if (response) {
      setSuccess(true);
      dispatch(
        addNode({
          node: {
            _id: response.id,
            type: state.type,
            name: state.name,
            description: state.description,
            updated: new Date().toString(),
            img: state.img,
            video: state.video,
            creator: {
              _id: localStorage.getItem('_id'),
              name: localStorage.getItem('name'),
            },
          },
        })
      );
      window.setTimeout(() => {
        setSuccess(false);
        dispatch(reset());
        setResource({ name: '', uri: '' });
      }, 1000);
    }
  }, [response]);

  useEffect(() => {
    if (resPut) {
      setSuccess(true);
      dispatch(updateNode({ id: state.id, node: { ...state } }));

      window.setTimeout(() => {
        setSuccess(false);
        dispatch(reset());
        setResource({ name: '', uri: '' });
      }, 1000);
    }
  }, [resPut]);

  useEffect(() => {
    console.log('error', error);
  }, [error]);

  return (
    <Container component="main" maxWidth="md">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
            Add Project
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {success && (
            <Typography color="primary" align="center">
              {state.id === ''
                ? 'Project added successfully :)'
                : 'Project updated successfully :)'}
            </Typography>
          )}
          <form className={classes.form} noValidate={false} onSubmit={submitHandler}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="price"
                  label="Price"
                  variant="outlined"
                  required
                  fullWidth
                  value={state.name}
                  onChange={(event) => dispatch(setName(event.target.value))}
                  className={classes.formControl}
                  error={error?.name}
                  helperText={error?.name}
                />
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
                  error={error?.name}
                  helperText={error?.name}
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
                  error={error?.description}
                  helperText={error?.description}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl} variant="outlined" error={error?.img}>
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
                  {error?.img && <FormHelperText>{error?.img}</FormHelperText>}
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
              <Grid item xs={12}>
                <FormControl
                  className={classes.formControl}
                  variant="outlined"
                  error={error?.video}
                >
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
                  {error?.video && <FormHelperText>{error?.video}</FormHelperText>}
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
                {error?.resources && (
                  <Typography color="error" align="center">
                    {error?.resources}
                  </Typography>
                )}
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
                  id="node-chapter"
                  label="Chapter"
                  variant="outlined"
                  value={resource.name}
                  onChange={(e) => setResource({ ...resource, name: e.target.value })}
                  className={classes.formControl}
                />
              </Grid>
              <Grid item xs={10} sm={5}>
                <FormControl className={classes.formControl} variant="outlined">
                  <InputLabel htmlFor="resource-link">Node ID</InputLabel>
                  <OutlinedInput
                    id="node-id"
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
              <Grid item xs={12} sm={6}>
                <TextField
                  id="node-chapter"
                  label="Chapter"
                  variant="outlined"
                  value={resource.name}
                  onChange={(e) => setResource({ ...resource, name: e.target.value })}
                  className={classes.formControl}
                />
              </Grid>
              <Grid item xs={10} sm={5}>
                <FormControl className={classes.formControl} variant="outlined">
                  <InputLabel htmlFor="resource-link">Exam ID</InputLabel>
                  <OutlinedInput
                    id="node-id"
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
              <Grid item xs={12} sm={6}>
                <TextField
                  id="node-chapter"
                  label="Chapter"
                  variant="outlined"
                  value={resource.name}
                  onChange={(e) => setResource({ ...resource, name: e.target.value })}
                  className={classes.formControl}
                />
              </Grid>
              <Grid item xs={10} sm={5}>
                <FormControl className={classes.formControl} variant="outlined">
                  <InputLabel htmlFor="resource-link">Project ID</InputLabel>
                  <OutlinedInput
                    id="node-id"
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
              <Grid item xs={12} sm={6}>
                <TextField
                  id="node-chapter"
                  label="Chapter"
                  variant="outlined"
                  value={resource.name}
                  onChange={(e) => setResource({ ...resource, name: e.target.value })}
                  className={classes.formControl}
                />
              </Grid>
              <Grid item xs={10} sm={5}>
                <FormControl className={classes.formControl} variant="outlined">
                  <InputLabel htmlFor="resource-link">Assignment ID</InputLabel>
                  <OutlinedInput
                    id="node-id"
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

              <Grid item xs={12}>
                {error?.resources && (
                  <Typography color="error" align="center">
                    {error?.resources}
                  </Typography>
                )}
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

              <Grid item xs={10} sm={5}>
                <FormControl className={classes.formControl} variant="outlined">
                  <InputLabel htmlFor="resource-link">We will cover</InputLabel>
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
              <Grid item xs={10} sm={5}>
                <FormControl className={classes.formControl} variant="outlined">
                  <InputLabel htmlFor="resource-link">Requirments</InputLabel>
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
              <Grid item xs={10} sm={5}>
                <FormControl className={classes.formControl} variant="outlined">
                  <InputLabel htmlFor="resource-link">Projects for</InputLabel>
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
              <Grid item xs={12} sm={6}>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  className={classes.submit}
                  fullWidth
                >
                  {state.id === '' ? 'Add a new project' : 'Update the project'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};
