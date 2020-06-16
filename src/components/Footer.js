import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4),
  },
  mainFooter: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <>
      <Divider />
      <footer className={classes.footer}>
        <div className={classes.mainFooter}>
          <Typography variant="subtitle1" align="left" color="textSecondary" component="p">
            Courses
          </Typography>
          <Typography variant="subtitle1" align="right" color="textSecondary" component="p">
            © {new Date().getFullYear()} Courses
          </Typography>
        </div>
        <Typography variant="body2" color="textSecondary" align="center">
          Design & Developed by
          <Link color="inherit" href="https://meghoshpritam.netlify.app/" target="_blank">
            meghoshpritam
          </Link>{' '}
        </Typography>
      </footer>
    </>
  );
}
