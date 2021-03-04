import React from 'react';
import {Route, withRouter, Switch} from 'react-router-dom';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import ErrorPage from './components/error/ErrorPage';


import Home from './containers/home/HomePage';
import Login from './containers/user/Login';
import Register from './containers/user/Register';
import AddMCQ from './containers/mcq/AddMCQ'
import ChangePassword from './containers/changePassword/ChangePassword'
import mcqList from './containers/listMCQ/ListMcq';
import searchMcq from './containers/mcq/SearchMcq'
import AddCodeQuestion from './containers/code/AddCodeQuestion'

function App() {
          return (<div className="container-fluid">
          <main className="bd-content" role="main">
            <Header/>
            <div id="body" >    
                  <Switch>            
                      <Route path="/" exact component={Home}/>               
                      <Route path="/login" component={Login}/> 
                      <Route path="/register" component={Register}/>      
                      <Route path="/addMcq" component={AddMCQ}/>
                      <Route path="/mcqList" component={mcqList}/>
                      <Route path="/searchMcq" component={searchMcq}/>
                      <Route path="/addCodeQuestion" component={AddCodeQuestion}/>
                      <Route path="/error" component={ErrorPage}/>
                      <Route path="/ChangePassword" component={ChangePassword}/>
                  </Switch>
            </div>   
              <Footer />
         
          </main>
        </div>)
}

export default withRouter(App);
