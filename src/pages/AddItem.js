import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
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
import FileUpload from '../components/FileUpload';

const useStyles = makeStyles((theme) => ({
  // heroContent: {
  //   backgroundColor: theme.palette.background.paper,
  //   padding: theme.spacing(8, 0, 6),
  // },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  submit: {
    margin: theme.spacing(2, 1),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
}));

export default function AddItem() {
  const classes = useStyles();
  const types = ['Node', 'Course', 'Goal', 'Project'];
  const [type, setType] = useState('node');
  const [state, setState] = useState({ name: '', description: '', img: '', video: '' });
  const [contentUpload, setContentUpload] = useState({
    image: '',
    imgBtn: false,
    video: '',
    videoImg: false,
  });
  const stateHandler = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const state = useState
  return (
    <Container component="main" maxWidth="md">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
            Add new
          </Typography>
        </Grid>
        {/* <form> */}
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="type-label">Select Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              value={type}
              onChange={(event) => setType(event.target.value)}
              fullWidth
              label="Select Type"
            >
              {types.map((t) => (
                <MenuItem value={t.toLowerCase()}>{t}</MenuItem>
              ))}
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
            onChange={stateHandler('name')}
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
            value={state.name}
            onChange={stateHandler('description')}
            className={classes.formControl}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="image">Image Link</InputLabel>
            <OutlinedInput
              id="image"
              value={state.img}
              onChange={stateHandler('img')}
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
        <Collapse in={contentUpload.imgBtn} timeout="auto" unmountOnExit>
          <Grid item xs={12} sm={6}>
            <FileUpload />
          </Grid>
        </Collapse>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="video">Video Link</InputLabel>
            <OutlinedInput
              id="video"
              value={state.video}
              onChange={stateHandler('video')}
              endAdornment={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle video upload visibility"
                    onClick={() =>
                      setContentUpload({ ...contentUpload, videoBtn: !contentUpload.videoBtn })
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
        <Collapse in={contentUpload.videoBtn} timeout="auto" unmountOnExit>
          <Grid item xs={12} sm={6}>
            <FileUpload />
          </Grid>
        </Collapse>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="markdown">Detail Description Link</InputLabel>
            <OutlinedInput
              id="markdown"
              value={state.markdown}
              onChange={stateHandler('video')}
              endAdornment={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle video upload visibility"
                    onClick={() => {
                      // setContentUpload({ ...contentUpload, videoBtn: !contentUpload.videoBtn })
                    }}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    <EditIcon />
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={165}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="resources-name"
            label="Resources Name"
            variant="outlined"
            // value={state.resources}
            // onChange={stateHandler('resources')}
            className={classes.formControl}
          />
        </Grid>
        <Grid item xs={10} sm={5}>
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="resource-link">Resource Link</InputLabel>
            <OutlinedInput
              id="resource-link"
              value={state.video}
              onChange={stateHandler('resourceLink')}
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
        <Grid
          item
          xs={2}
          md={1}
          style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
        >
          <IconButton>
            <AddCircleIcon color="secondary" fontSize="large" />
          </IconButton>
        </Grid>
        <Collapse in={contentUpload.resourceBtn} timeout="auto" unmountOnExit>
          <Grid item xs={10} sm={6}>
            <FileUpload />
          </Grid>
        </Collapse>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            id="resources-link"
            label="Resources Link"
            variant="outlined"
            // value={state.resources}
            // onChange={stateHandler('resources')}
            className={classes.formControl}
          />
        </Grid> */}

        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="quiz">Quiz Link</InputLabel>
            <OutlinedInput
              id="quiz"
              value={state.exam}
              onChange={stateHandler('video')}
              endAdornment={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle video upload visibility"
                    onClick={() => {
                      // setContentUpload({ ...contentUpload, videoBtn: !contentUpload.videoBtn })
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
              onChange={stateHandler('video')}
              endAdornment={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle video upload visibility"
                    onClick={() => {
                      // setContentUpload({ ...contentUpload, videoBtn: !contentUpload.videoBtn })
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
            onChange={stateHandler('assignment')}
            className={classes.formControl}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button color="primary" variant="contained" className={classes.submit} fullWidth>
            Add a new Node
          </Button>
        </Grid>
        {/* </form> */}
      </Grid>
    </Container>
  );
}
