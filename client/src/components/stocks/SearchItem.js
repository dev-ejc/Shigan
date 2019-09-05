import React from 'react'

const SearchItem = ({ item }) => {
    return (
        <div className="card m-1">
             <div className="card-header">                    
                    {item["2. name"]}
                    </div>
            <div className="card-body">
                <h3 className="card-text"><span className="badge badge-info">{item["1. symbol"]}</span></h3>
                <button className="btn btn-primary">Add Stock</button>
            </div>
        </div>
    )
}

export default SearchItem
