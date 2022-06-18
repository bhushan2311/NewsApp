import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let {title, description, imgUrl, newsUrl, author, date} = this.props;
        return (
            <>
                <div className="card" style={{width: "20rem", margin:"1rem 0"}}>
                    <img src={imgUrl} className="card-img-top" alt="img" />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">by {!author? "unknown":author}, {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} className="btn btn-primary">Read More</a>
                    </div>
                </div>
            </>
        )
    }
}
