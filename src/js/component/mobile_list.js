//每个板块的新闻页面
import React from 'react';
import { List } from 'antd';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Tloader from 'react-touch-loader';


export default class MobileList extends React.Component {
    constructor() {
        super();
        this.state = {
            news: '',
            count: 5,//初始加载5个
            hasMore: 0,//加载完后下面还有没有，是否显示加载更多
            initializing: 1,//加载进度条
            refreshedAt: Date.now(),
        }
    }
    componentWillMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.state.count, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({ news: json });
            })
    }
    loadMore(resolve) {
        setTimeout(() => {
            let count = this.state.count;
            this.setState({
                count: count + 5,
                hasMore: count > 0 && count < 20,
            });
            var myFetchOptions = {
                method: 'GET'
            };
            fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.state.count, myFetchOptions).then(response => response.json()).then(json => this.setState({ news: json }));
            resolve();
        }, 2e3)//2e3为转圈圈时间
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                hasMore: 1,
                initializing: 2, // initialized
            });
        }, 2e3);
    }
    render() {
        const { news } = this.state;
        const { hasMore, initializing } = this.state;
        const newList = news.length
            ?
            <List
                itemLayout="horizontal"
                dataSource={news}
                renderItem={item => (
                    <Router><Link to={`details/${item.uniquekey}`} target="_blank">
                        <List.Item>
                            <img src={item.thumbnail_pic_s} />
                            <List.Item.Meta
                                // avatar={<Avatar src={item.thumbnail_pic_s} shape= "square" size={100}/>}
                                title={item.title}
                                description={<p><span className='moble_list_realtype'>{item.realtype}</span>{'\u0020' + item.date}</p>
                                }
                            />
                        </List.Item>
                    </Link>
                    </Router>
                )}
            />
            : '没有加载到任何新闻';
        return (
            <div>
                <Tloader
                    className="tloader some class"
                    hasMore={hasMore}
                    initializing={initializing}
                    onLoadMore={this.loadMore.bind(this)}
                >
                    {newList}
                </Tloader></div>
        )
    }
}