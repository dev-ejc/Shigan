import React, { useState,useContext } from 'react'
import StockContext from '../../context/stocks/stockContext'
import AlertContext from '../../context/alerts/alertContext'

const Search = props => {
    const [keyWord,setKeyWord] = useState('')
    const stockContext = useContext(StockContext)
    const { searchKeyword, stocks, clearSearch } = stockContext
    const alertContext = useContext(AlertContext)
    const { setAlert } = alertContext
    const onChange = (e) => {
        setKeyWord(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(keyWord)
        if (keyWord === '') {
            setAlert('danger','Input a search')
        } else {
            searchKeyword(keyWord)
            setKeyWord('')
        }
    }

    return (
    <form onSubmit={onSubmit}>
        <div className="form-group mx-auto mt-3">
            <input onChange={onChange} type="text" className="form-control" htmlFor="keyWord" placeholder="Search"/>
        </div>
        <button type="submit" className="btn btn-primary form-control">Search</button>
        {stocks.length > 0 && (<button onClick={clearSearch} type="click" className="btn btn-secondary form-control">Clear</button>)}
    </form>
    )
}

export default Search