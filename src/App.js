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
import ForgetPassword from './containers/ForgetPassword/ForgetPassword';
import mcqList from './containers/listMCQ/ListMcq';
import searchMcq from './containers/mcq/SearchMcq'

function App() {
          return (<div className="container-fluid">
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
                      <Route path="/mcqList" component={mcqList}/>
                      <Route path="/searchMcq" component={searchMcq}/>
                      <Route path="/error" component={ErrorPage}/>
                      <Route path="/forgotPassword" component={ForgetPassword}/>
                  </Switch>
            </div>   
              <Footer />
         
          </main>
        </div>)
}

export default withRouter(App);
