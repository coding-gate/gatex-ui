import React from "react";
import ReactQuill from 'react-quill';
import {connect} from 'react-redux'
import axios from 'axios';

import * as webUtil from '../../utils/WebUtil'
import axiosWithToken from '../../utils/AxiosWithToken'


import EditorClass from '../../utils/EditorClass';
import ReactHtmlParser from 'react-html-parser';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import AlertMessage from '../../components/alert/AlertMessage';

import withAlert from '../../hoc/withAlert'




class AboutUs extends EditorClass {

    pageName = "AboutUs"
   

    submitHandeler = () => {
          let data = {'name': this.pageName,
                  'para': this.state.para}
      axiosWithToken.put(webUtil.URL+'/page/secure', data).then(response=> {
        this.props.setAlert({type:'success',message:'Saved successfully'});
      }).catch(error=>{
        webUtil.handleError(error, this.props);
      })
    }
   
    componentDidMount() {
      let para={...this.state.para}
        axios.get(webUtil.URL+'/page?name='+this.pageName).then(response=> {
          para=response.data.para
          this.setState({para})
         }).catch(error=>{
          webUtil.handleError(error, this.props);
        })
    }
    

    render() {   
      
      let optionText=(this.state.isViewMode)? 'Edit' : 'View'
      
        return (
          <div>                
              <div className="row mt-2">
                    <Breadcrumb elements={[
                        { url: '/', level: 'Home' },
                        { url: '#', level: 'about us' }
                    ]} />
                    {this.props.roles.includes("ADMIN")?
                  <div className="col-md-2">
                    <div className="d-flex flex-row-reverse">       
                      <button className="btn btn-light btn-sm" onClick = {this.submitHandeler}>Save</button>                      
                       &nbsp; 
                      <button className="btn btn-light btn-sm" onClick={() => this.toggleVisibilityMode()}>{optionText}</button>    
                    </div> 
              </div>
              :null      
               }   
              </div>    
              
              <div className="row">               
                  <div className="col-md-8 offset-2">
                        <div ><h5 align="center">{this.pageName}</h5></div>  
                  </div>
              </div>
              <div className="row">               
                  <div className="col-md-8 offset-2">
                  <AlertMessage alert={this.props.alert} reSetAlert={this.props.setAlert}/> 
                  </div>              
              </div>
              <div className="row">               
                  <div className="col-md-8 offset-2">
                    {this.state.isViewMode
                    ?<div className="ql-editor">
                        <div className="display-html">
                          {ReactHtmlParser(this.state.para['one'])}
                        </div>
                     </div>
                    :<ReactQuill  modules={this.modules} formats={this.formats} theme='snow' 
                      value={this.state.para['one']} onChange = {(content)=>this.onChange(content, 'one')}/>
                    }
                  </div>
              </div>             
          </div>
        );

    }
}

const mapStateToProps = state =>{
  return {roles:state.oauth.userRole}
}

export default connect(mapStateToProps)(withAlert(AboutUs));