import React, {Component} from 'react';
import {connect} from 'react-redux'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';

import Select from 'react-select';

import * as actionType from '../../store/actions'
import * as Settings from '../../utils/SiteSettings'


class SearchMcq extends Component {

    state = {
        fields: {}
      }

    componentDidMount() {
        //console.log(this.props.mcqSerchParam)
        this.setState({fields:this.props.testSerchParam})
    }

    clear = ()=>{
        let fields={...this.state.fields};
        for (var key in fields) {
            fields[key]=null;   
        }
            this.setState({fields});
    }


    updateField = (name, value)=>{
        let fields={...this.state.fields};
        fields[name]=value;      
        this.setState({fields}); 
    }

    makeURL= ()=>{
        
        let query="";
        for (var key in this.state.fields) {
            if(this.state.fields[key]){
                if(typeof this.state.fields[key]==='object'){
                    query=query+key+"="+ this.state.fields[key].value+'&';
                }else{
                    query=query+key+"="+ this.state.fields[key]+"&";
                } 
            }
          }
          this.props.onSearchSaveParamState(this.state.fields)
          if(query.length){
            this.props.history.push('/testList?search='+encodeURIComponent(query));
          }else{
            this.props.history.push('/testList');
          }
    }

    render() {        
        return (
            <div> 
                <div className="row">
                    <Breadcrumb elements={[
                        { url: '/', level: 'Home' },
                        { url: '/testList', level: 'List All' },
                        { url: '#', level: 'Search Test' }
                    ]} />
                </div>   
            <div className="container">

                <div className="row mb-3">
                    <div className="col-5">
                        <h5>Title:</h5>
                        <input 
                            value={this.state.fields['title'] ? this.state.fields['title'] : '' }
                            placeholder='Enter Title'
                            onChange={e => this.updateField('title', e.target.value)}
                            type="text" 
                            className='form-control' />

                    </div>
                
                    <div className="col-4">
                        <h5>Language:</h5>
                        <Select
                            isClearable
                            placeholder='Choose Language'
                            value={this.state.fields['language']}
                            onChange={(val) => this.updateField("language", val)}
                            options={Settings.langOptions}
                        />
                    </div>
                    <div className="col-3">
                        <h5>TimeLimit</h5>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='TimeLimit'
                            value={this.state.fields['timeLimit'] ? this.state.fields['timeLimit'] : '' }
                            onChange={(e) => this.updateField("timeLimit", e.target.value)}
                        />
                    </div>
                </div>

                
                <div className="row mt-2">
                    <div className="col text-right">
                        <button className="btn btn-sm btn-outline-primary mx-2" onClick={this.clear}> Clear</button>
                        <button className="btn btn-sm btn-primary mx-2" onClick={this.makeURL}> Search</button>
                    </div>
                </div>
             </div>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch =>{
    return {
        onSearchSaveParamState: (payload)=>dispatch({type: actionType.SAVE_TEST_SEARCH_PARAM, payload: payload})
    }
}

const mapStateToProps = state =>{
    return {
        testSerchParam: state.testSerchParam
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchMcq);