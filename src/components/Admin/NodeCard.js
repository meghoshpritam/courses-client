import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import { getYTVideoThumbnail, toDate } from '../../assets/functions/util';
import { useDelete, useGet } from '../../hooks/useAsync';
import { setNode } from '../../store/Slices/node';
import { deleteNode } from '../../store/Slices/nodes';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  hover: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  instructorName: {
    fontWeight: 'bold',
    paddingTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  sectionContainer: {
    backgroundColor: 'red',
  },
  sectionTitle: {
    padding: theme.spacing(2, 0),
  },

  priceAction: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '100%',
  },
}));

const NodeCard = ({
  title,
  description,
  creator,
  lastUpdated,
  type,
  img,
  video,
  id,
  creatorId,
  switchToAddNode,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState({ open: false, type: '' });
  const [resDel, errDel, del] = useDelete();
  const [resGet, errGet, get] = useGet();
  const loading = useSelector((state) => state.apiCall.loading);

  useEffect(() => {
    if (resDel) {
      console.log('del', resDel);
      dispatch(deleteNode({ id }));
    }
  }, [resDel]);

  useEffect(() => {
    if (errDel) {
      console.log('del', errDel);
    }
  }, [errDel]);

  useEffect(() => {
    if (resGet) {
      console.log('res', resGet.nodes[0]);
      // eslint-disable-next-line no-underscore-dangle
      const node = resGet.nodes[0];
      dispatch(
        setNode({
          // eslint-disable-next-line no-underscore-dangle
          id: node._id,
          name: node.name,
          description: node.description,
          img: node.img || '',
          video: node.video || '',
          markdown: node.markdown || '',
          quiz: node.quiz || '',
          exam: node.exam || '',
          assignment: node.assignment || '',
          resources: node.resources || [],
          type: node.type,
        })
      );
      switchToAddNode();
    }
  }, [resGet]);

  return (
    <>
      <Card className={classes.card}>
        {(img || video) && (
          <CardMedia
            className={`${classes.cardMedia} ${classes.hover}`}
            image={video ? getYTVideoThumbnail(video) : img}
            title={`${title}-image`}
            onClick={() => {
              history.push(`/view/${type}/${id}`);
            }}
          />
        )}
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h6" component="h3" className={classes.hover}>
            {title}
          </Typography>
          <Typography variant="body2" className={classes.hover}>
            {description.substring(0, 100)}
            {description.length > 100 && `...`}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            className={`${classes.hover} ${classes.instructorName}`}
          >
            <Link color="inherit" href={`/profile/${creatorId}`} target="_blank">
              {creator}
            </Link>
          </Typography>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="caption" color="textSecondary">
                <strong>{toDate(lastUpdated)}</strong>
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <div className={classes.priceAction}>
                <Typography variant="body1">{type}</Typography>
                <Button
                  size="small"
                  color="secondary"
                  variant="outlined"
                  onClick={() => setDialog({ type: 'delete', open: true })}
                >
                  Delete
                </Button>
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={() => setDialog({ open: true, type: 'edit' })}
                >
                  Edit
                </Button>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Dialog
        open={dialog.open}
        onClose={() => setDialog({ open: false, type: '' })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {loading && <LinearProgress />}
        <DialogTitle id="alert-dialog-title">Do you want to {dialog.type}</DialogTitle>
        <DialogContent>
          <Card className={classes.card}>
            {(img || video) && (
              <CardMedia
                className={`${classes.cardMedia} ${classes.hover}`}
                image={video ? getYTVideoThumbnail(video) : img}
                title={`${title}-image`}
                onClick={() => {
                  history.push(`/view/${type}/${id}`);
                }}
              />
            )}
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h6" component="h3" className={classes.hover}>
                {title}
              </Typography>
              <Typography variant="body2" className={classes.hover}>
                {description.substring(0, 100)}
                {description.length > 100 && `...`}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                className={`${classes.hover} ${classes.instructorName}`}
              >
                <Link color="inherit" href={`/profile/${creatorId}`} target="_blank">
                  {creator}
                </Link>
              </Typography>
              <Grid container justify="space-between">
                <Grid item xs={6}>
                  <Typography variant="caption" color="textSecondary">
                    <strong>{toDate(lastUpdated)}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right">
                    {type}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog({ open: false, type: '', id: '' })} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => {
              if (dialog.type === 'edit') {
                get('/admin/nodes', { id });
              } else if (dialog.type === 'delete') {
                console.log('delete run');
                del('/admin/nodes', { id });
              }
            }}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

NodeCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired,
  img: PropTypes.string,
  video: PropTypes.string,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  creatorId: PropTypes.string.isRequired,
  switchToAddNode: PropTypes.func.isRequired,
};

NodeCard.defaultProps = {
  img: undefined,
  video: undefined,
};

export default NodeCard;
