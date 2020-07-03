import React, { useEffect } from 'react';
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
// import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import Link from '@material-ui/core/Link';
import Collapse from '@material-ui/core/Collapse';
import ContentListItem from '../components/ContentListItem';
import useGet from '../hooks/useGet';
import CircleSpring from '../components/CircleSpring';
import { toDate } from '../assets/functions/util';
import Rating from '../components/Rating';

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
    // background: 'green',
  },
  videoList: {
    margin: theme.spacing(0.7, 0, 0.7, 4),
    padding: theme.spacing(1.5),
    // background: 'blue',
    // color: 'white',
  },
  heading: {
    margin: theme.spacing(1, 0),
  },
  description: {
    marginBottom: theme.spacing(1.5),
  },
  creatorDetails: {
    margin: theme.spacing(1, 0, 2, 0),
  },
  detailsSection: {
    margin: theme.spacing(1.6, 0),
  },
}));

export default () => {
  const { id, type } = useParams();
  const classes = useStyles();

  const [res, err, get] = useGet();

  const arr = [0, 1, 2, 3, 4, 5, 6];

  // const [open, setOpen] = React.useState(true);

  const [expandContent, setExpandContent] = React.useState([...arr.map((n) => false)]);

  const handleExpandClick = (num) => {
    setExpandContent([...expandContent.map((val, idx) => (idx === num ? !val : val))]);
  };

  // const handleClick = () => {
  //   setOpen(!open);
  // };

  useEffect(() => {
    get(`/${type}`, { id });
  }, []);

  useEffect(() => {
    console.log('res...', res);
  }, [res]);

  return (
    <Container
      maxWidth="md"
      // style={{ background: 'red' }}
    >
      {res ? (
        <Grid container>
          <Grid item xs={12}>
            <img src="https://source.unsplash.com/random" alt="img..." className={classes.img} />
          </Grid>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" className={classes.heading}>
              {res?.course?.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary" className={classes.description}>
              {res?.course?.description}
            </Typography>
          </Grid>
          <Grid container spacing={2} justify="space-between">
            <Grid item>
              Created by {/* eslint-disable-next-line no-underscore-dangle */}
              <Link href={`/profile/${res?.course?.creator?._id}`}>
                <strong>{res?.course?.creator?.name}</strong>
              </Link>
            </Grid>
            <Grid item>
              Last Updated <strong>{toDate(res?.course?.updated)}</strong>
            </Grid>
            <Grid item>
              <Rating rating={3.9} totalRating={2569} fontSize={19} />{' '}
            </Grid>
            {/* TODO: fetch the views from youtube api if video available */}
            <Grid item color="textSecondary">
              2569 views
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.detailsSection}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6" color="primary">
                  We will cover
                </Typography>
              </Grid>
              {arr.map((a) => (
                <Grid item xs={12} sm={6} key={a}>
                  <Grid container justify="center">
                    <Grid item xs={1}>
                      <CheckCircleIcon color="primary" />
                    </Grid>
                    <Grid item xs={11} style={{ paddingLeft: 1 }}>
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
          <Grid item xs={12} className={classes.detailsSection}>
            <Grid container>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6" color="primary">
                  Course content
                </Typography>
              </Grid>
              {arr.map((a) => (
                <Grid item xs={12} key={a}>
                  <Grid container justify="space-between">
                    <Grid item onClick={() => handleExpandClick(a)}>
                      <Grid container spacing={1}>
                        <Grid item>
                          <InboxIcon color="secondary" />
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
                    {arr.map((a1) => (
                      <Grid item key={a1} className={classes.videoList}>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ipsa error
              expedita possimus incidunt recusandae adipisci tempora similique nobis totam, labore
              quos tempore eveniet quibusdam alias excepturi accusamus quisquam? Officiis nesciunt
              inventore modi maxime eius dicta consectetur in eaque at, voluptatum, adipisci odit
              dolore, esse ut exercitationem veritatis illo sapiente.
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
      ) : (
        <CircleSpring />
      )}
    </Container>
  );
};
