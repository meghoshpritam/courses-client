import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Collapse from '@material-ui/core/Collapse';
import FileUpload from '../components/FileUpload';
import MarkdownEditor from '../components/MarkdownEditor';

const useStyles = makeStyles((theme) => ({
  // heroContent: {
  //   backgroundColor: theme.palette.background.paper,
  //   padding: theme.spacing(8, 0, 6),
  // },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
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
            fullWidth
            variant="outlined"
            value={state.name}
            onChange={stateHandler('description')}
            className={classes.formControl}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="image">Image</InputLabel>
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
              labelWidth={50}
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
            <InputLabel htmlFor="video">Video</InputLabel>
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
                    {contentUpload.imgBtn ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={45}
            />
          </FormControl>
        </Grid>
        <Collapse in={contentUpload.videoBtn} timeout="auto" unmountOnExit>
          <Grid item xs={12} sm={6}>
            <FileUpload />
          </Grid>
        </Collapse>
        <Grid item xs={12} sm={6}>
          <TextField
            id="markdown"
            label="Markdown"
            variant="outlined"
            value={state.markdown}
            onChange={stateHandler('markdown')}
            className={classes.formControl}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MarkdownEditor />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="resources"
            label="Resources"
            variant="outlined"
            value={state.resources}
            onChange={stateHandler('resources')}
            className={classes.formControl}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="quiz"
            label="Quiz"
            variant="outlined"
            value={state.quiz}
            onChange={stateHandler('quiz')}
            className={classes.formControl}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="exam"
            label="Exam"
            variant="outlined"
            value={state.exam}
            onChange={stateHandler('exam')}
            className={classes.formControl}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="assignment"
            label="Assignment"
            variant="outlined"
            value={state.assignment}
            onChange={stateHandler('assignment')}
            className={classes.formControl}
          />
        </Grid>
        {/* </form> */}
      </Grid>
    </Container>
  );
}
