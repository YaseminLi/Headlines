//页面左下角图片新闻板块
import React from 'react';
import { Card } from 'antd';
import { BrowserRouter as Router, Link } from 'react-router-dom';
const { Meta } = Card;

export default class PCNewsImageBlock extends React.Component {
    constructor() {
        super();
        this.state = {
            news: ''
        }
    }
    componentWillMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        //数据获取：
        //一：api
        // fetch("https://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions)
        //     .then(response => response.json())
        //     .then(json => {
        //         this.setState({ news: json });
        //     });

        //本地mock数据
        this.setState({ news: this.props.news.slice(0,this.props.count) });
    }
    render() {
        const { news } = this.state;

        const newList = news.length
            ?
            news.map((newsItem, index) =>
                (<div key={newsItem.uniquekey} className='pc-news-image-block'>
                    {/* <Router><Link to={`details/${newsItem.uniquekey}`} targt="_blank"> */}
                    {/* <Router><Link to={`details/1`} targt="_blank"> */}
                    <Router><Link to={`details`} target="_blank">
                        <Card
                            style={{ width: this.props.cardwidth}}
                            bordered={false}
                            className='image_block'
                            cover={<img alt="pc_news_image_block" src={newsItem.thumbnail_pic_s} />}
                        >

                            <Meta
                                title={newsItem.title}
                                description={newsItem.author_name}
                            />
                        </Card>
                    </Link></Router>
                </div>))
            : '没有加载到任何新闻';
        return (
            <div className='imageNewsList'>
                <Card
                    title={this.props.cardtitle}
                >
                    {newList}
                </Card>
            </div>
        )
    }
}
