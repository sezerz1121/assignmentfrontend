import React from 'react';

const Links = (props) => {
    return (
        <div>
            <a href={props.link}>{props.link}</a>
        </div>
    );
}

export default Links;
