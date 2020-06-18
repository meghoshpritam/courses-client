import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import Link from '@material-ui/core/Link';
import Collapse from '@material-ui/core/Collapse';
import ContentListItem from '../components/ContentListItem';

const useStyles = makeStyles((theme) => ({
  img: { height: '40Vh', width: '100%' },
  starIcon: {
    fontSize: 18,
    color: '#ffc400',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  contentItem: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1.3, 1),
    background: 'green',
  },
  videoList: {
    margin: theme.spacing(0.7, 0, 0.7, 4),
    padding: theme.spacing(1.5),
    background: 'blue',
    color: 'white',
  },
}));

export default () => {
  const { id } = useParams();
  const classes = useStyles();

  const arr = [0, 1, 2, 3, 4, 5, 6];

  const [open, setOpen] = React.useState(true);

  const [expandContent, setExpandContent] = React.useState([...arr.map((n) => false)]);

  const handleExpandClick = (num) => {
    setExpandContent([...expandContent.map((val, idx) => (idx === num ? !val : val))]);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Container maxWidth="lg" style={{ background: 'red' }}>
      <Grid container>
        <Grid item xs={12}>
          <img src="https://source.unsplash.com/random" alt="img..." className={classes.img} />
        </Grid>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo quam illum enim!
            Veniam, eligendi magnam.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="body" variant="body1" color="textSecondary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo quam illum enim!
            Veniam, eligendi magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
            perferendis architecto quam! A eveniet ea vel accusamus modi nostrum aperiam saepe,
            nisi, maiores sit deserunt rerum vitae illo reiciendis sequi voluptates delectus commodi
            incidunt fugiat. Delectus maiores placeat quae sunt autem aspernatur sed adipisci
            dolorem, aut recusandae, rerum officia. Ullam.
          </Typography>
        </Grid>
        <Grid item>Created by Mister fezu</Grid>
        <Grid item>Created 25/04/2020</Grid>
        <Grid item>Last Updated 25/04/2020</Grid>
        <Grid item>
          <div style={{ display: 'flex' }} color="textPrimary">
            <div style={{ marginTop: 1, marginRight: 3 }}>
              <StarIcon className={classes.starIcon} />
              <StarIcon className={classes.starIcon} />
              <StarIcon className={classes.starIcon} />
              <StarHalfIcon className={classes.starIcon} />
              <StarBorderIcon className={classes.starIcon} />
            </div>
            <div>
              <strong> 4.3 </strong>(5646)
            </div>
          </div>
        </Grid>
        <Grid item>
          {' '}
          <Typography component="body" variant="body1" color="textSecondary">
            2569 views
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography component="h2" variant="h6">
                We will cover
              </Typography>
            </Grid>
            {arr.map((a) => (
              <Grid item xs={12} sm={6} key={a}>
                <Grid container justify="center">
                  <Grid item xs={1}>
                    <CheckCircleIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <Typography variant="body1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis possimus
                      dolorum laborum!
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography component="h2" variant="h6">
                Course content
              </Typography>
            </Grid>
            {arr.map((a) => (
              <Grid item xs={12} key={a} className={classes.contentItem}>
                <Grid container justify="space-between">
                  <Grid item onClick={() => handleExpandClick(a)}>
                    <Grid container spacing={1}>
                      <Grid item>
                        <InboxIcon />
                      </Grid>
                      <Grid item>111</Grid>
                    </Grid>
                  </Grid>
                  <Grid item>12:17</Grid>
                </Grid>
                <Grid item onClick={() => handleExpandClick(a)}>
                  <Grid container justify="space-between">
                    <Grid item>
                      <Grid container spacing={1}>
                        <Grid item>{expandContent[a] ? <RemoveIcon /> : <AddIcon />}</Grid>
                        <Grid item>sdsj djksjdkjsd s</Grid>
                      </Grid>
                    </Grid>
                    <Grid item>6 contain</Grid>
                  </Grid>
                </Grid>
                <Collapse in={expandContent[a]} timeout="auto" unmountOnExit>
                  {arr.map((a) => (
                    <Grid item key={a} className={classes.videoList}>
                      <ContentListItem />
                    </Grid>
                  ))}
                </Collapse>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Typography component="h2" variant="h6">
              Description
            </Typography>
          </Grid>
          <Grid item xs={12}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ipsa error expedita
            possimus incidunt recusandae adipisci tempora similique nobis totam, labore quos tempore
            eveniet quibusdam alias excepturi accusamus quisquam? Officiis nesciunt inventore modi
            maxime eius dicta consectetur in eaque at, voluptatum, adipisci odit dolore, esse ut
            exercitationem veritatis illo sapiente.
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Typography component="h2" variant="h6">
              Requirements
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ul>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
              <ul>
                <li>fhdfj jdfjdkfdkjfkdjfk fjdkjfd </li>
                <li>fhdfj jdfjdkfdkjfkdjfk fjdkjfd </li>
                <li>fhdfj jdfjdkfdkjfkdjfk fjdkjfd </li>
                <li>fhdfj jdfjdkfdkjfkdjfk fjdkjfd </li>
              </ul>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
            </ul>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Typography component="h2" variant="h6">
              The course if for
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ul>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
            </ul>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Typography component="h2" variant="h6">
              Resources
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ul>
              <li>
                <Link href="/">Lorem ipsum dolor sit amet.</Link>
              </li>
              <li>
                <Link href="/">Lorem ipsum dolor sit amet.</Link>
              </li>
              <li>
                <Link href="/">Lorem ipsum dolor sit amet.</Link>
              </li>
              <li>
                <Link href="/">Lorem ipsum dolor sit amet.</Link>
              </li>
              <li>
                <Link href="/">Lorem ipsum dolor sit amet.</Link>
              </li>
              <li>
                <Link href="/">Lorem ipsum dolor sit amet.</Link>
              </li>
              <li>
                <Link href="/">Lorem ipsum dolor sit amet.</Link>
              </li>
              <li>
                <Link href="/">Lorem ipsum dolor sit amet.</Link>
              </li>
              <li>
                <Link href="/">Lorem ipsum dolor sit amet.</Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
