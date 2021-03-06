//首页每个新闻块
import React from 'react';
import { Card } from 'antd';
import { BrowserRouter as Router, Link } from 'react-router-dom'

export default class PCNewsBlock extends React.Component {
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
        //一：从api获取数据
        // fetch("https://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions)
        //     .then(response => response.json())
        //     .then(json => {
        //         this.setState({ news: json });
        //     });

        //二：本地mock数据
        this.setState({news:this.props.news.slice(0,this.props.count)})
    }
    render() {
        const { news } = this.state;
        const newList = news.length
            ? <Router>{news.map((newsItem, index) =>
                (<li key={index}>
                    <Link to={`details/${newsItem.uniquekey}`} target='_blank'>
                        {newsItem.title}
                    </Link></li>))}</Router>
            : '没有加载到任何新闻';
        return (
            <div className='topNewsList'>
                <Card>
                    <ul>
                        {newList}
                    </ul>
                </Card>
            </div>
        )
    }
}