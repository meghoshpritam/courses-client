import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Switch, Route } from 'react-router-dom';
import style from './App.module.scss';
import AppBar from './components/AppBar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import UnAuthorized from './pages/UnAuthorized';
import Footer from './components/Footer';

function App() {
  return (
    <div className={style.app}>
      <header>
        <AppBar />
      </header>
      <div className={style.main}>
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
