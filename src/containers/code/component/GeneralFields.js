import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

import * as Settings from '../../../utils/SiteSettings';

function GeneralField(props) {

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
                    <h6>Language:</h6>
                    <CreatableSelect
                        placeholder='Choose Language'
                        isClearable
                        value={props.state.fields['lang']}
                        onChange={(val) => props.updateField("lang", val)}
                        options={Settings.langOptions}
                    />
                </div>
                <div className="col">
                    <h6>Estimated time to solve:</h6>
                    <Select
                        placeholder='Choose Estimated time to solve'
                        value={props.state.fields['time']}
                        onChange={(val) => props.updateField("time", val)}
                        options={Settings.timeOption}
                    />
                </div>
                <div className="col">
                    <h6>Complexity:</h6>
                    <Select
                        placeholder='Choose Complexity'
                        value={props.state.fields['complexity']}
                        onChange={(val) => props.updateField('complexity', val)}
                        options={Settings.complexityOption}
                    />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                    <h6>Add tags</h6>
                    <CreatableSelect isMulti
                        placeholder='Hashtagss...'
                        value={props.state.fields['tags']}
                        onChange={(val) => props.updateField("tags", val)}
                        options={props.state.tagOptions} />
                </div>
            </div>

            <div className="row mt-2">
                <div className="col">
                    <h6>Question Statement:</h6>
                    <textarea style={{ height: '120px' }} className='form-control'
                        onChange={(e) => props.updateField("text", e.target.value)}
                        value={props.state.fields['text']?props.state.fields['text']:''}>
                    </textarea>
                </div>
            </div>
            <div className="mt-3 float-right">
                <button className="btn btn-sm btn-primary"
                    onClick={()=>props.handleNext(errorMessages, 2)}>
                    Next
                </button>
            </div>
        </div>

    )
}

export default GeneralField