import React from 'react';

function Loading(props) {
    return (
        <div  className={'d-flex justify-content-center align-items-center'}>
            <div className="spinner-border me-2" role="status">
            </div>
            <h4>Yuklanmoqda ...</h4>
        </div>
    );
}

export default Loading;