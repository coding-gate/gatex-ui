import React from 'react'
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

export default function Text(props) {
    const subjectOptions = [
        { value: 'java', label: 'java' },
        { value: 'python', label: 'python' },
        { value: 'javascript', label: 'javascript' }
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
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' }
    ]

    const tagOptions = [
        { value: 'array', label: 'array' },
        { value: 'function', label: 'function' },
        { value: 'es6', label: 'es6' }
    ];

    return (
        <div className='mt-3'>
            <div className="row">
                <div className="col-3">
                    <h5>Subject:</h5>
                    <CreatableSelect
                        isClearable
                        value={props.state.subject}
                        onChange={(val) => props.updateField("subject", val)}
                        options={subjectOptions}
                    />
                </div>
                <div className="col">
                    <h5>Estimated time to solve:</h5>
                    <Select
                        value={props.state.time}
                        onChange={(val) => props.updateField("time", val)}
                        options={timeOption}
                    />
                </div>
                <div className="col">
                    <h5>Complexity:</h5>
                    <Select
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
                        value={props.state.tag}
                        onChange={(val) => props.updateField("tag", val)}
                        options={tagOptions} />
                </div>
            </div>

            <div className="row mt-2">
                <div className="col">
                    <h5>Question Statement:</h5>
                    <textarea style={{ height: '120px' }} className='form-control'
                        onChange={(e) => props.updateField("text",e.target.value)}
                        value={props.state.text}>
                    </textarea>
                </div>
            </div>
            <div className="mt-3 float-right">
                <button className="btn btn-light btn-outline-primary"
                    onClick={() => { props.updateField("step", 2) }}>
                    Next
                </button>
            </div>
        </div>

    )
}
