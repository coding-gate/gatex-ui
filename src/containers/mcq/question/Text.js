import React from 'react'
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

function Text(props) {
    const subjectOptions = [
        { value: 'java', label: 'Java' },
        { value: 'python', label: 'Python' },
        { value: 'javascript', label: 'Javascript' }
    ];

    const complexityOption = [
        { value: 'easy', label: 'easy' },
        { value: 'medium', label: 'medium' },
        { value: 'complex', label: 'complex' }
    ]

    const timeOption = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
    ]

    const tagOptions = [
        { value: 'array', label: 'Array' },
        { value: 'function', label: 'Function' },
        { value: 'es6', label: 'ES6' }
    ];
    const submit = () => {

        if (props.state.text === '') {
            props.updateField('alertObj', { message: 'Please Enter a Valid Text', type: 'warning' })
            return
        }
        if (!props.state.subject) {
            props.updateField('alertObj', { message: 'Please Choose a Subject', type: 'warning' })
            return
        }
        if (!props.state.complexity) {
            props.updateField('alertObj', { message: 'Please Choose a Complexity', type: 'warning' })
            return
        }
        if (!props.state.time) {
            props.updateField('alertObj', { message: 'Please Set a Time', type: 'warning' })
            return
        }
        props.updateField("alertObj", null)

        props.updateField("step", 2)
    }

    return (
        <div className='mt-3'>
            <div className="row">
                <div className="col-3">
                    <h5>Subject:</h5>
                    <CreatableSelect
                        placeholder='Choose Subject'
                        isClearable
                        value={props.state.subject}
                        onChange={(val) => props.updateField("subject", val)}
                        options={subjectOptions}
                    />
                </div>
                <div className="col">
                    <h5>Estimated time to solve:</h5>
                    <Select
                        placeholder='Choose Estimated time to solve'
                        value={props.state.time}
                        onChange={(val) => props.updateField("time", val)}
                        options={timeOption}
                    />
                </div>
                <div className="col">
                    <h5>Complexity:</h5>
                    <Select
                        placeholder='Choose Complexity'
                        value={props.state.complexity}
                        onChange={(val) => props.updateField('complexity', val)}
                        options={complexityOption}
                    />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                    <h5>Add Tag</h5>
                    <CreatableSelect isMulti
                        placeholder='Hashtags...'
                        value={props.state.tag}
                        onChange={(val) => props.updateField("tag", val)}
                        options={tagOptions} />
                </div>
            </div>

            <div className="row mt-2">
                <div className="col">
                    <h5>Question Statement:</h5>
                    <textarea style={{ height: '120px' }} className='form-control'
                        onChange={(e) => props.updateField("text", e.target.value)}
                        value={props.state.text}>
                    </textarea>
                </div>
            </div>
            <div className="mt-3 float-right">
                <button className="btn btn-info"
                    onClick={submit}>
                    Proceed
                </button>
            </div>
        </div>

    )
}

export default Text