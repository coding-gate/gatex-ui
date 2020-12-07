import { Component } from 'react';

class FormClass extends Component {

    state = {   
        isViewMode:true, 
        para: {}  
      }
  
      modules = {
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
  
          formats = [
              'size',
              'bold', 'italic', 'underline',
              'list', 'bullet',
              'align',
              'link',
              'color', 'background'
            ];
  
      onChange = (content, key) => {
          let para={...this.state.para}
          para[key]=content
          this.setState({para})
      }
  
      toggleVisibilityMode = () =>{
        this.setState({isViewMode:!this.state.isViewMode})
      }

}

export default FormClass;