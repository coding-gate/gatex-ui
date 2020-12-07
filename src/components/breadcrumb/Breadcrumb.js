import React from 'react';
import { Link } from 'react-router-dom';

const Brdcrumb = (props) => {

    let brcItems = props.elements.map((item, index) => {
        if (index < props.elements.length - 1) {
            return (<Link key={index} className="breadcrumb-item" to={item.url}>
                {item.level}
            </Link>);
        } else {
            return (<span key={index} className="breadcrumb-item active">
                {item.level}
            </span>);
        }
      }
    )

    return (
        <div className="col-md-10">
            <div className="breadcrumb bg-white my-0">
                {brcItems}
            </div>
        </div>
    );
};

export default Brdcrumb;