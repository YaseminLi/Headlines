import React from 'react'; 
import { Row, Col,BackTop  } from 'antd';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from './common_comments'
import newsData from '../../../newsData/newsBlock'
import newsDetails from '../../../newsData/newsDetails'
export default class PCNewsDetails extends React.Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         newsItem: ''
    //     }
    // }
    //页面加载完再附进去
    componentDidMount() {
        document.title = newsDetails.title + '-React News | React 驱动的新闻平台'
           
    }
    createMarkup() {
        // return { __html: this.state.newsItem.pagecontent }
        return { __html: newsDetails.pagecontent}
    }
    render() {
        const topNews=newsData.top
        return (
            <div>
                <Row className='pc_news_details'>
                    <Col span={2}></Col>
                    <Col span={14} className='container'>
                        <div className='articleContainer' dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <CommonComments uniquekey={this.props.match.params.uniquekey} title={newsDetails.title}/>
                    </Col>
                    <Col span={6}>
                        <PCNewsImageBlock count='18' type='guonei' cardtitle='相关新闻' width='100%' cardwidth='112px' news={topNews}/>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <BackTop />
            </div>
        )
    }
}