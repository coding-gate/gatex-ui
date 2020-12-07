import React from 'react';
import {Route, withRouter, Switch} from 'react-router-dom';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import home from './components/body/Home';
import ErrorPage from './components/error/ErrorPage';

import Login from './containers/login/Login';
import contactUs from './containers/contact/ContactUs';
import VeiwContacts from './containers/contact/ViewContacts';
import aboutUs from './containers/about/AboutUs';

function App() {
          return (<div className="container-fluid">
          <main className="bd-content" role="main">
            <Header/>
            <div id="body" >    
                  <Switch>            
                      <Route path="/" exact component={home}/>               
                      <Route path="/login" component={Login}/>       
                      <Route path="/contactUs" component={contactUs}/>   
                      <Route path="/viewContacts" component={VeiwContacts}/>
                      <Route path="/aboutUs" component={aboutUs}/>
                      <Route path="/error" component={ErrorPage}/>
                  </Switch>
            </div>            
            <Footer/>
          </main>
        </div>)
}

export default withRouter(App);
