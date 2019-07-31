import React , { useEffect }from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import NewsItem from './NewsItem'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getNews } from '../../actions/newsActions'

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
                 <TransitionGroup>
                 {news.map(n => (
                 <CSSTransition key={n._id} timeout={500} className="item">
                     <NewsItem news={n} />
                 </CSSTransition>))}
             </TransitionGroup>
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