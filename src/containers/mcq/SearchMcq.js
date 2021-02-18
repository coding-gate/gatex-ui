import React, {Component} from 'react';
import {connect} from 'react-redux'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';

import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

import * as actionType from '../../store/actions'
import * as Settings from '../../utils/SiteSettings'


class SearchMcq extends Component {

    state = {
        fields: {}
      }

    componentDidMount() {
        console.log(this.props.mcqSerchParam)
        this.setState({fields:this.props.mcqSerchParam})
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
        this.setState({fields},() => {
            console.log(this.state)

        }); 
    }

    makeURL= ()=>{
        
        let query="";
        for (var key in this.state.fields) {
            if(this.state.fields[key]){
                if(Array.isArray(this.state.fields[key])){
                    let tags=this.state.fields[key];
                    for (var entry in tags) {
                        query=query+key+"="+ tags[entry].value+"&";
                    }
                }else{
                    query=query+key+"="+ this.state.fields[key].value+"&";
                } 
            }
          }
          this.props.onSearchSaveParamState(this.state.fields)
          if(query.length){
            this.props.history.push('/mcqList?search='+encodeURIComponent(query));
          }else{
            this.props.history.push('/mcqList');
          }
    }

    render() {        
        return (
            <div> 
                <div className="row">
                    <Breadcrumb elements={[
                        { url: '/', level: 'Home' },
                        { url: '#', level: 'Search mcq' }
                    ]} />
                </div>   
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <h6>Language:</h6>
                        <Select
                            placeholder='Choose Language'
                            value={this.state.fields['lang']}
                            onChange={(val) => this.updateField("lang", val)}
                            options={Settings.langOptions}
                        />
                    </div>
                    <div className="col">
                        <h6>Estimated time to solve:</h6>
                        <Select
                            placeholder='Choose time'
                            value={this.state.fields['time']}
                            onChange={(val) => this.updateField("time", val)}
                            options={Settings.timeOption}
                        />
                    </div>
                    <div className="col">
                        <h6>Complexity:</h6>
                        <Select
                            placeholder='Choose Complexity'
                            value={this.state.fields['complexity']}
                            onChange={(val) => this.updateField('complexity', val)}
                            options={Settings.complexityOption}
                        />
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-9">
                        <h6>Add tags</h6>
                        <CreatableSelect isMulti
                            placeholder='Hashtagss...'
                            value={this.state.fields['tags']}
                            onChange={(val) => this.updateField("tags", val)}
                            options={Settings.tagsOptions} />
                    </div>
                    <div className="col-3">
                        <h6>Type</h6>
                        <Select 
                            placeholder='Choose Type'
                            value={this.state.fields['type']}
                            onChange={(val) => this.updateField("type", val)}
                            options={Settings.typeOption} />
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
        onSearchSaveParamState: (payload)=>dispatch({type: actionType.SAVE_MCQ_SEARCH_PARAM, payload: payload})
    }
}

const mapStateToProps = state =>{
    return {
        mcqSerchParam: state.mcqSerchParam
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchMcq);