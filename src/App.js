import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './assets/main.css'
import './assets/style/main.scss'
import { AppHeader } from './cmps/AppHeader';
import { Favorites } from './pages/Favorites';
import { WeatherDetails } from './pages/WeatherDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="content-wrapper">
      <AppHeader />
      <Switch>
        <Route path="/favorites" component={Favorites} />
        <Route path="/" component={WeatherDetails} />
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default App;
