import React from 'react'
import PropTypes from 'prop-types'

const NewsItem = ({ news }) => {
    const { title, urlToImage, publishedAt, author, source} = news
    return (
        <div className="card bg-secondary mt-1">
            <div className="card-body">
            <img className="card-img-top" src={urlToImage}/>
            <h3 className="card-title text-dark text-left">
                {title}
            </h3>
            <h7 className="card-title text-dark text-left">
                {source.name}
            </h7>
            <h7 className="card-title text-dark text-left">
                {author}
            </h7>
            <h7 className="card-title text-dark text-left">
                {publishedAt}
            </h7>
            {/* <div className="container text-center mx-auto">
                <button onClick={() => setCurrentNews(news)} className="btn btn-dark  btn-block">More</button>
            </div> */}
            </div>
        </div>
    )       
}

NewsItem.propTypes = {
    news : PropTypes.object.isRequired
}

export default NewsItem