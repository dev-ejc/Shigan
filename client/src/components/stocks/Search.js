import React, { useState } from 'react'
import { connect } from 'react-redux'
import { clearSearch, searchKeyword } from '../../state/stocks/stocksAction'
import { setAlert } from '../../state/alerts/alertsAction'
import PropTypes from 'prop-types'
import SearchItem from './SearchItem'

const Search = ({clearSearch,searchKeyword,stocks:{results,loading}}) => {
    const [keyWord, setKeyWord] = useState('')

    const onChange = e => {
        setKeyWord(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        if (keyWord === '') {
            setAlert('Input a search', 'danger')
        } else {
            searchKeyword(keyWord)
            setKeyWord('')
        }
    }

    return (
        <div className="container">
        <form onSubmit={onSubmit}>
            <div className="form-group mx-auto mt-3">
                <input onChange={onChange} type="text" className="form-control" htmlFor="keyWord" placeholder="Search"/>
            </div>
            <button type="submit" className="btn btn-primary form-control">Search</button>
            {results.length > 0 && (<button onClick={clearSearch} type="click" className="btn btn-secondary form-control">Clear</button>)}
        </form>
        <div className="container">
            {results.map(item => {
                return <SearchItem item={item}/>
            })}
        </div>
        </div>
    )
}

Search.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    searchKeyword: PropTypes.func.isRequired,
    stocks: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    stocks: state.stocks,
    alerts: state.alerts
})

export default connect(mapStateToProps, {clearSearch,searchKeyword,setAlert})(Search)
