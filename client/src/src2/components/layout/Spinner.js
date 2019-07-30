import React, {Fragment} from 'react'

const Spinner = props => {
    return (
        <Fragment>
            <div className="spinner-border text-primary mx-auto mt-3" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </Fragment>
    )
}

export default Spinner
