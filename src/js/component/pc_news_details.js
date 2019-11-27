import React from 'react';
import { Row, Col } from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block';
import { BackTop } from 'antd';
import CommonComments from './common_comments'
export default class PCNewsDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            newsItem: ''
        }
    }
    //页面加载完再附进去
    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("https://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({ newsItem: json });
                document.title = this.state.newsItem.title + '-React News | React 驱动的新闻平台'
            });
    }
    createMarkup() {
        return { __html: this.state.newsItem.pagecontent }
    }
    render() {
        return (
            <div>
                <PCHeader />
                <Row className='pc_news_details'>
                    <Col span={2}></Col>
                    <Col span={14} className='container'>
                        <div className='articleContainer' dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <CommonComments uniquekey={this.props.match.params.uniquekey}/>
                    </Col>
                    <Col span={6}>
                        <PCNewsImageBlock count='20' type='top' cardtitle='相关新闻' width='100%' cardwidth='112px' />
                    </Col>
                    <Col span={2}></Col>
                </Row>
               
                <PCFooter />
                <BackTop />
            </div>
        )
    }
}