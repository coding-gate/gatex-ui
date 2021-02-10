import CreatableSelect from 'react-select/creatable';
import ReactQuill from 'react-quill';
import Select from 'react-select';

import axios from '../../../utils/AxiosWithToken'
import * as webUtil from '../../../utils/WebUtil'
import * as Settings from '../../../utils/SiteSettings';

function GeneralField(props) {

    const errorMessages={lang:'Please select language',
        time:'Please select time',
        complexity:'Please select complexity',
        tags:'Please select tags',
        text:'Please enter question statement'
        };


   function fetchData(lang) {
    if (lang) {
        props.updateStateField('isLoading', true)
        axios.get(webUtil.URL + '/gatexapi/tags/' + lang.value)
            .then(response => {
                props.updateStateField('tagOptions', response.data.tagEntries)
            }).catch(error => {
                webUtil.handleError(error, props);
            })

            axios.get(webUtil.URL + '/gatexapi/codeTemplate/' + lang.value)
            .then(response => {
                props.updateFromField('answerTemplate', response.data.answerTemplate)
                props.updateFromField('unittestTemplate', response.data.unittestTemplate)
                props.updateStateField('isLoading', false)
            }).catch(error => {
                webUtil.handleError(error, props);
                props.updateStateField('isLoading', false)
            })
    }

    props.updateFromField('lang', lang)

   }


    return (
        <div className='mt-3'>
            <div className="row">
                <div className="col-3">
                    <h6>Language:</h6>
                    <CreatableSelect
                        placeholder='Choose Language'
                        isClearable
                        value={props.state.fields['lang']}
                        onChange={(val) => fetchData(val)}
                        options={Settings.langOptions}
                    />
                </div>
                <div className="col">
                    <h6>Estimated time to solve:</h6>
                    <Select
                        placeholder='Choose Estimated time to solve'
                        value={props.state.fields['time']}
                        onChange={(val) => props.updateFromField("time", val)}
                        options={Settings.timeOption}
                    />
                </div>
                <div className="col">
                    <h6>Complexity:</h6>
                    <Select
                        placeholder='Choose Complexity'
                        value={props.state.fields['complexity']}
                        onChange={(val) => props.updateFromField('complexity', val)}
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
                        onChange={(val) => props.updateFromField("tags", val)}
                        options={props.state.tagOptions} />
                </div>
            </div>

            <div className="row mt-2">
                <div className="col">
                    <h6>Question Statement:</h6>
                    <ReactQuill  modules={Settings.modules} formats={Settings.formats} theme='snow' 
                      value={props.state.fields['text']?props.state.fields['text']:null} 
                      onChange = {(content)=>props.updateFromField('text',content)}/>                    
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