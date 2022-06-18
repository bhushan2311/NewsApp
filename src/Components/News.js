import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
  article = [
    {
      "source": {
        "id": "bbc-sport",
        "name": "BBC Sport"
      },
      "author": "BBC Sport",
      "title": "Shane Warne memorial - watch & follow updates",
      "description": "Watch live coverage and follow text updates and tributes from the state memorial for Australian cricket legend Shane Warne at the Melbourne Cricket Ground.",
      "url": "http://www.bbc.co.uk/sport/live/cricket/60916236",
      "urlToImage": "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png",
      "publishedAt": "2022-03-30T08:22:26.498888Z",
      "content": "Former England bowler and BBC cricket presenter Isa Guha, who became a colleague of Warne's in the commentary box: \"It has been a strange few weeks - a lot of shock and then we did our own tribute at… [+396 chars]"
    },
    {
      "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
      },
      "author": null,
      "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      "publishedAt": "2020-04-27T11:41:47Z",
      "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    },
    {
      "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
      },
      "author": null,
      "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      "publishedAt": "2020-03-30T15:26:05Z",
      "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    }
  ]

  static defaultProps = {
    country: "in",
    pageSize: 8,
    category:'general'
  }
  
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string

  }
  constructor(props) {
    super(props);
    // console.log("This is constructor");
    this.state = {
      articles: this.article,
      loading: false,
      p: 1,
      results: 0
    }
    document.title = `NewsHunt - ${this.props.category}`;
  }

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&business&apiKey=09129f7be9234217b0a4f3bd012ed946&page=${this.state.p}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    // console.log(data);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState( 
      { articles: parsedData.articles,
        results:parsedData.totalResults,
        loading:false
       }
      );
  }

  async componentDidMount() {
    // console.log("cdm");
    this.updateNews();
  }

  prevFunction = async () => {
    // Use await with setstate and update news OR use call back function with setState

    this.setState({ p: this.state.p - 1 },()=>{this.updateNews()});   {/*setState is a asynchronous function, So we have to call the updateNews in the callback of setState
    So, after updating the page value, our updateNews function will run.*/}
  }
  
  nextFunction = async () => {
    this.setState({ p: this.state.p + 1 },()=>{this.updateNews()});   {/*setState is a asynchronous function, So we have to call the updateNews in the callback of setState
  So, after updating the page value, our updateNews function will run.*/}
  }

  render() {
    // console.log('hiiii');
    return (
      <>
      {/* {console.log(this.state.p)}; */}
        <div className="container my-3">
          <h2 className="text-center">Hunt any news - {this.props.category}</h2>

          {this.state.loading && <Spinner/>}  {/* if loading equals true then show spinner*/}

          <div className="row">
            {!this.state.loading && this.state.articles.map((elem) => {
                return <div className="col md-3" key={elem.url}>  {/*Each child in a list should have a unique "key" prop. here url is the unique key*/}
                  <NewsItem title={elem.title ? elem.title.slice(0, 40) : ""} description={elem.description ? elem.description.slice(0, 88) : ""} imgUrl={elem.urlToImage} newsUrl={elem.url} author={!elem.author? "unknown":elem.author} date={elem.publishedAt}/>
                </div>
              })
            }
          </div>

          <div className="container d-flex justify-content-evenly">
            <button disabled={this.state.p===1} type="button" onClick={this.prevFunction} className="btn btn-dark">&#8592; Previous</button>
            <button disabled={this.state.p>=Math.ceil(this.state.results/8)} type="button" onClick={this.nextFunction} className="btn btn-dark">&#8594; Next</button>
          </div>
        </div>

      </>
    )
  }
}
