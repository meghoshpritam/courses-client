/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { useDispatch } from 'react-redux';
import AddNode from '../components/Admin/AddNode';
import ViewNodes from '../components/Admin/ViewNodes';
import { useGet } from '../hooks/useAsync';
import {
  setSuccess as setNodes,
  setFetch as fetchNodes,
  setError as setErrNodes,
} from '../store/Slices/nodes';
import {
  setSuccess as setCourses,
  setFetch as fetchCourses,
  setError as setErrCourses,
} from '../store/Slices/courses';
import {
  setSuccess as setGoals,
  setFetch as fetchGoals,
  setError as setErrGoals,
} from '../store/Slices/goals';
import {
  setSuccess as setProjects,
  setFetch as fetchProjects,
  setError as setErrProjects,
} from '../store/Slices/projects';
import {
  setSuccess as setExams,
  setFetch as fetchExams,
  setError as setErrExams,
} from '../store/Slices/exams';
import {
  setSuccess as setAssignments,
  setFetch as fetchAssignments,
  setError as setErrAssignments,
} from '../store/Slices/assignments';
import {
  setSuccess as setInstructors,
  setFetch as fetchInstructors,
  setError as setErrInstructors,
} from '../store/Slices/instructors';

import ViewCourses from '../components/Admin/ViewCourses';
import ViewGoals from '../components/Admin/ViewGoals';
import ViewProjects from '../components/Admin/ViewProjects';
import AddCourse from '../components/Admin/AddCourse';
import AddProject from '../components/Admin/AddProject';
import AddGoal from '../components/Admin/AddGoal';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const dispatch = useDispatch();
  const [res, err, get] = useGet();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchNodes);
    dispatch(fetchGoals);
    dispatch(fetchProjects);
    dispatch(fetchCourses);
    dispatch(fetchAssignments);
    dispatch(fetchExams);
    dispatch(fetchInstructors);
    get('/admin/get-all');
  }, []);

  useEffect(() => {
    if (res) {
      dispatch(setNodes({ nodes: res.nodes || [] }));
      dispatch(setCourses({ courses: res.courses || [] }));
      dispatch(setProjects({ projects: res.projects || [] }));
      dispatch(setGoals({ goals: res.goals || [] }));
      dispatch(setAssignments({ assignments: res.assignments || [] }));
      dispatch(setExams({ exams: res.exams || [] }));
      dispatch(setInstructors({ instructors: res.instructors || [] }));
    }
  }, [res]);

  useEffect(() => {
    if (err) {
      dispatch(setErrCourses);
      dispatch(setErrGoals);
      dispatch(setErrNodes);
      dispatch(setErrProjects);
      dispatch(setErrAssignments);
      dispatch(setErrInstructors);
      dispatch(setErrExams);
    }
  }, [err]);

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="View Nodes" {...a11yProps(0)} />
        <Tab label="Add Node" {...a11yProps(1)} />
        <Tab label="View Courses" {...a11yProps(2)} />
        <Tab label="Add Course" {...a11yProps(3)} />
        <Tab label="View Projects" {...a11yProps(4)} />
        <Tab label="Add Project" {...a11yProps(5)} />
        <Tab label="View Goals" {...a11yProps(6)} />
        <Tab label="Add Goals" {...a11yProps(7)} />
        <Tab label="View Exams" {...a11yProps(8)} />
        <Tab label="View Assignments" {...a11yProps(9)} />
        <Tab label="View Teachers" {...a11yProps(10)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <ViewNodes switchToAddNode={() => setValue(1)} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddNode />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ViewCourses />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <AddCourse />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ViewProjects />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <AddProject />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <ViewGoals />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <AddGoal />
      </TabPanel>
      <TabPanel value={value} index={8}>
        No exams to show
      </TabPanel>
      <TabPanel value={value} index={9}>
        No assignments to show
      </TabPanel>
      <TabPanel value={value} index={10}>
        No teacher to show
      </TabPanel>
    </div>
  );
}
