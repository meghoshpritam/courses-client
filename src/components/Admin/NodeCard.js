import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import { getYTVideoThumbnail, toDate } from '../../assets/functions/util';
import { useDelete } from '../../hooks/useAsync';

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
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [res, err, post] = useDelete();

  const deleteNode = () => {
    post('/admin/nodes', { id });
  };

  return (
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
              <Button size="small" color="secondary" variant="outlined" onClick={deleteNode}>
                Delete
              </Button>
              <Button size="small" color="primary" variant="outlined">
                Edit
              </Button>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
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
};

NodeCard.defaultProps = {
  img: undefined,
  video: undefined,
};

export default NodeCard;
