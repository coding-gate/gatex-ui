export const langOptions = [
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'Javascript' },
    { value: 'csharp', label: 'C#' }
];

export const complexityOption = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'complex', label: 'Complex' }
]


export const timeOption = [
    { value: '1', label: '1 Min' },
    { value: '2', label: '2 Mins' },
    { value: '3', label: '3 Mins' },
]

export const typeOption = [
    { value: 'mcq', label: 'MCQ' },
    { value: 'mmcq', label: 'MMCQ' },
    { value: 'tf', label: 'TRUE/FALSE' },
]


export const tagsOptions = [
    { value: 'array', label: 'Array' },
    { value: 'function', label: 'Function' },
    { value: 'es6', label: 'ES6' }
];


export const modules = {
    toolbar: [
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{ 'align': [] }],
      ['link'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ]
};

export const formats = [
    'size',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'align',
    'link',
    'color', 'background'
  ];