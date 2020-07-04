import React from 'react';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from './App.module.scss';
import AppBar from './components/AppBar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import UnAuthorized from './pages/UnAuthorized';
import Footer from './components/Footer';
import Course from './pages/Course';
import Profile from './pages/Profile';
import About from './pages/About';
import ViewAll from './pages/ViewAll';
import AddItem from './pages/AddItem';
import Help from './pages/Help';

function App() {
  const loading = useSelector((state) => state.apiCall.loading);
  return (
    <div className={style.app}>
      <header>
        <AppBar />
      </header>
      <div className={style.main}>
        {loading && <LinearProgress />}
        <Grid container>
          {/* <div>sidebar left</div> */}
          <Grid item xs={12}>
            <div className={style.mainContent}>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/sign-in">
                  <SignIn />
                </Route>
                <Route path="/sign-up">
                  <SignUp />
                </Route>
                <Route path="/view/:type/:id">
                  <Course />
                </Route>
                <Route path="/profile/:id">
                  <Profile />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/help">
                  <Help />
                </Route>
                <Route path="/view-all/:type">
                  <ViewAll />
                </Route>
                {localStorage.getItem('role') === 'admin' && (
                  <Route path="/add-course">
                    <AddItem />
                  </Route>
                )}
                <Route path="/unauthorized">
                  <UnAuthorized />
                </Route>
                <Route path="/404">
                  <NotFound />
                </Route>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </div>
          </Grid>
          {/* <div>sidebar right</div> */}

          <Grid item xs={12}>
            <Footer />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
