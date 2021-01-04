import React from 'react';
import {Route, withRouter, Switch} from 'react-router-dom';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import ErrorPage from './components/error/ErrorPage';


import Home from './containers/home/HomePage';
import Login from './containers/user/Login';
import Register from './containers/user/Register';
import contactUs from './containers/contact/ContactUs';
import VeiwContacts from './containers/contact/ViewContacts';
import aboutUs from './containers/about/AboutUs';
import AddMCQ from './containers/mcq/AddMCQ'

function App() {
          return (<div style={{minHeight:'100vh'}} className="container-fluid">
          <main className="bd-content" role="main">
            <Header/>
            <div id="body" >    
                  <Switch>            
                      <Route path="/" exact component={Home}/>               
                      <Route path="/login" component={Login}/> 
                      <Route path="/register" component={Register}/>      
                      <Route path="/contactUs" component={contactUs}/>   
                      <Route path="/viewContacts" component={VeiwContacts}/>
                      <Route path="/aboutUs" component={aboutUs}/>
                      <Route path="/addMcq" component={AddMCQ}/>
                      <Route path="/error" component={ErrorPage}/>
                  </Switch>
            </div>            
            <Footer/>
          </main>
        </div>)
}

export default withRouter(App);
