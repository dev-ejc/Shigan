import React , { useEffect }from 'react'
import NewsItem from './NewsItem'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getNews } from '../../state/news/newsActions'

//@TODO transition-groups are not functioning
//@TODO improve scope of loading to all stock items
const News = ({news:{ news, loading }, getNews}) => {
    useEffect(() => {
        getNews()
    }, //eslint-disable-next-line
    [])
    return (
        <div className='container'>
            {news !== null && !loading ? (
                 news.map(n => (
                     <NewsItem key={n._id} news={n} />
                     ))
            ) : <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
           </div>}      
        </div>
    )
}

News.propTypes = {
    news: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    news:state.news
});

export default connect(mapStateToProps, {getNews})(News)