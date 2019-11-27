import React from 'react';
import { Row, Col } from 'antd';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
//import PCNewsImageBlock from './pc_news_image_block';
import { BackTop } from 'antd';
import CommonComments from './common_comments'
export default class MpbileNewsDetails extends React.Component {
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
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey, myFetchOptions)
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
                <MobileHeader />
                <Row>
                    <Col span={24} className='container'>
                        <div className='articleContainer' dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <CommonComments uniquekey={this.props.match.params.uniquekey}/>
                    </Col>
                </Row>
                <MobileFooter/>
                <BackTop />
            </div>
        )
    }
}