import React from 'react'

export default function Loader(props) {
    const { classname } = props;
    return (
        <>
            <div className={classname}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </>
    )
}
