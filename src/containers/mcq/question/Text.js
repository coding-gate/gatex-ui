import React from 'react'
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6


import * as Settings from '../../../utils/SiteSettings';

function Text(props) {
    

    const proceed = () => {
        
        if (text.current.getEditor().getText().trim()==='') {
            props.setAlert({type:'warning',message:'Please Enter A Question Statement'})
            return
        }
        if (!props.state.lang) {
            props.setAlert({type:'warning',message:'Please Choose a lang'})
            return
        }
        if (!props.state.time) {
            props.setAlert({type:'warning',message:'Please Set a Time'})
            return
        }
        if (!props.state.complexity) {
            props.setAlert({type:'warning',message:'Please Choose a Complexity'})
            return
        }
        
        
        props.setAlert(null)
        props.updateField("step", 2)
    }

    const text = React.createRef()

    return (
        <div className='mt-3'>
            <div className="row">
                <div className="col-3">
                    <h5>Language:</h5>
                    <CreatableSelect
                        placeholder='Choose Language'
                        isClearable
                        value={props.state.lang}
                        onChange={(val) => props.updateField("lang", val)}
                        options={Settings.langOptions}
                    />
                </div>
                <div className="col">
                    <h5>Estimated time to solve:</h5>
                    <Select
                        placeholder='Choose Estimated time to solve'
                        value={props.state.time}
                        onChange={(val) => props.updateField("time", val)}
                        options={Settings.timeOption}
                    />
                </div>
                <div className="col">
                    <h5>Complexity:</h5>
                    <Select
                        placeholder='Choose Complexity'
                        value={props.state.complexity}
                        onChange={(val) => props.updateField('complexity', val)}
                        options={Settings.complexityOption}
                    />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                    <h5>Add tags</h5>
                    <CreatableSelect isMulti
                        placeholder='Hashtagss...'
                        value={props.state.tags}
                        onChange={(val) => props.updateField("tags", val)}
                        options={Settings.tagsOptions} />
                </div>
            </div>

            <div className="row mt-2">
                <div className="col">
                    <h5>Question Statement:</h5>
                    <ReactQuill 
                        ref={text}
                        onChange={(val) => props.updateField("text", val)}
                        value={props.state.text} />
                </div>
            </div>
            <div className="mt-3 float-right">
                <button className="btn btn-sm btn-primary"
                    onClick={proceed}>
                    Next
                </button>
            </div>
        </div>

    )
}

export default Text