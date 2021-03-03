import React from 'react'
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6


import * as Settings from '../../../utils/SiteSettings';

function Text(props) {

    const errorMessages={lang:'Please select language',
        time:'Please select time',
        complexity:'Please select complexity',
        tags:'Please select tags',
        text:'Please enter question statement'
        };

    return (
        <div className='mt-3'>
            <div className="row">
                <div className="col-3">
                    <h5>Language:</h5>
                    <CreatableSelect
                        placeholder='Choose Language'
                        isClearable
                        value={props.state.fields.lang}
                        onChange={(val) => props.updateField("lang", val)}
                        options={Settings.langOptions}
                    />
                </div>
                <div className="col">
                    <h5>Estimated time to solve:</h5>
                    <Select
                        placeholder='Choose Estimated time to solve'
                        value={props.state.fields.time}
                        onChange={(val) => props.updateField("time", val)}
                        options={Settings.timeOption}
                    />
                </div>
                <div className="col">
                    <h5>Complexity:</h5>
                    <Select
                        placeholder='Choose Complexity'
                        value={props.state.fields.complexity}
                        onChange={(val) => props.updateField('complexity', val)}
                        options={Settings.complexityOption}
                    />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                    <h5>Add tags</h5>
                    <CreatableSelect isMulti
                        placeholder='Hashtags...'
                        value={props.state.fields['tags']}
                        onChange={(val) => props.updateField("tags", val)}
                        options={Settings.tagsOptions} />
                </div>
            </div>

            <div className="row mt-2">
                <div className="col">
                    <h5>Question Statement:</h5>
                    <ReactQuill 
                        onChange={(val) => props.updateField("text", val)}
                        value={props.state.fields['text']?props.state.fields['text']:null} 
                        />
                </div>
            </div>
            <div className="mt-3 float-right">
                <button className="btn btn-sm btn-primary"
                    onClick={() => props.handleNext(errorMessages,2)}>
                    Next
                </button>
            </div>
        </div>

    )
}

export default Text