/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
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
    background: '#cecece',
  },
  videoList: {
    margin: theme.spacing(0.7, 0, 0.7, 4),
    padding: theme.spacing(1.5),
    background: '#f5f5f5',
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
  secondaryText: {
    opacity: 0.75,
  },
  list: {
    margin: theme.spacing(0.5, 0),
    padding: theme.spacing(1),
    backgroundColor: '#eeeeee',
  },
}));

export default () => {
  const { id, type } = useParams();
  const classes = useStyles();

  const [res, err, get] = useGet();

  const arr = [0, 1, 2, 3, 4, 5, 6];

  const [expandContent, setExpandContent] = React.useState([...arr.map((n) => false)]);

  const handleExpandClick = (num) => {
    setExpandContent([...expandContent.map((val, idx) => (idx === num ? !val : val))]);
  };

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
          {/* TODO: change the name of the video or image and show the selected one */}
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
            <Grid item>
              <span className={classes.secondaryText}>
                <strong>569</strong> views
              </span>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.detailsSection}>
            {res?.course?.weWillCover?.length !== 0 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography component="h2" variant="h6" color="primary">
                    We will cover
                  </Typography>
                </Grid>
                {res?.course?.weWillCover.map((cover) => (
                  <Grid item xs={12} sm={6} key={cover}>
                    <Grid container justify="center">
                      <Grid item xs={1}>
                        <CheckCircleIcon color="primary" />
                      </Grid>
                      <Grid item xs={11} style={{ paddingLeft: 1 }}>
                        <Typography variant="body1">{cover}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
          {/* TODO: check the course content and list accordingly if paid then lock icon, video play icon, assignment, examination icon, quiz icon */}
          <Grid item xs={12} className={classes.detailsSection}>
            <Grid container>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6" color="primary">
                  Course content
                </Typography>
              </Grid>
              {arr.map((a) => (
                <Grid item xs={12} key={a} className={classes.list}>
                  <Grid container justify="space-between">
                    <Grid item onClick={() => handleExpandClick(a)}>
                      <Grid container spacing={1}>
                        <Grid item>
                          <InboxIcon color="secondary" />
                        </Grid>
                        <Grid item>111</Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <strong>12:17</strong>
                    </Grid>
                  </Grid>
                  <Grid item onClick={() => handleExpandClick(a)}>
                    <Grid container justify="space-between">
                      <Grid item>
                        <Grid container spacing={1}>
                          <Grid item>
                            {expandContent[a] ? (
                              <RemoveIcon color="secondary" />
                            ) : (
                              <AddIcon color="primary" />
                            )}
                          </Grid>
                          <Grid item>
                            <span className={classes.secondaryText}>
                              Lorem ipsum dolor sit amet.
                            </span>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <strong>6</strong> contain
                      </Grid>
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
          {res?.course?.requirements?.length !== 0 && (
            <Grid item xs={12} className={classes.detailsSection}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6" color="primary">
                  Requirements
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container grid spacing={2}>
                  {res?.course?.requirements?.map((requirement) => (
                    <Grid item xs={12} key={requirement} style={{ marginLeft: 10 }}>
                      {requirement}
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
          {res?.course?.courseFor?.length !== 0 && (
            <Grid item xs={12} className={classes.detailsSection}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6" color="primary">
                  The course for
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container grid spacing={2}>
                  {res?.course?.courseFor?.map((cFor) => (
                    <Grid item xs={12} key={cFor} style={{ marginLeft: 10 }}>
                      {cFor}
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
          {res?.course?.resources?.length !== 0 && (
            <Grid item xs={12} className={classes.detailsSection}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h6" color="primary">
                  Resources
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container grid spacing={2}>
                  {res?.course?.resources?.map((resource) => (
                    <Grid item xs={12} key={resource._id} style={{ marginLeft: 10 }}>
                      <Link href={resource.uri}>{resource.name}</Link>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      ) : (
        <CircleSpring />
      )}
    </Container>
  );
};
