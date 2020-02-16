//news共用的部分
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Carousel, Col, Tabs, List, Card, Row } from 'antd';
const TabPane = Tabs.TabPane;
import PCNewsImageBlock from './pc_news_image_block';
import PCProduct from './pc_product'
import newsData from '../../../newsData/newsBlock'

export default class PCNewsContainer extends React.Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 100,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true
        };
        const guojiNews = newsData.guoji.slice(0, 8)
        const topNews = newsData.top
        const guoneiNews = newsData.guonei
        const yuleNews = newsData.yule
        const guojiNewsList = guojiNews.length ? guojiNews.map((item, index) => (
            <div className='guojiItem'>
                <img src={item.thumbnail_pic_s} />
                <div className='content'>
                    <p className='title'>{item.title}</p>
                    <p>{item.author_name}</p>
                </div>
            </div>
        )) : '没有加载到新闻'
        return (
            <div className='newsContainer'>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className='container'>
                        <div className='leftContainer'>
                            <div className='carousel' >
                                <Carousel {...settings}>
                                    <div className='item'><img src='http://nimg.ws.126.net/?url=http://pic-bucket.ws.126.net/photo/0001/2020-02-16/F5H4NFRT00AN0001NOS.jpg&thumbnail=600x2147483647&quality=75&type=jpg' /><h3>
                                        <a href="http://news.163.com/photoview/00AN0001/2306856.html">疫情之下 普通人的“超级变身”记</a>
                                    </h3></div>
                                    <div className='item'><img src='http://nimg.ws.126.net/?url=http://pic-bucket.ws.126.net/photo/0001/2020-02-15/F5DNODA200AN0001NOS.jpg&thumbnail=600x2147483647&quality=75&type=jpg' /><h3>
                                        <a href="http://news.163.com/photoview/00AN0001/2306824.html">内蒙古50余吨牛羊肉援助武汉</a>
                                    </h3></div>
                                    <div className='item'><img src='http://nimg.ws.126.net/?url=http://pic-bucket.ws.126.net/photo/0001/2020-02-16/F5GDVL6Q00AN0001NOS.jpg&thumbnail=600x2147483647&quality=75&type=jpg' /><h3>
                                        <a href="http://news.163.com/photoview/00AN0001/2306847.html">香港101名隔离居民病毒检测呈阴性 返回居所</a>
                                    </h3></div>
                                    <div className='item'><img src='http://nimg.ws.126.net/?url=http://pic-bucket.ws.126.net/photo/0001/2020-02-15/F5ESMRVF00AN0001NOS.jpg&thumbnail=600x2147483647&quality=75&type=jpg' /><h3>
                                        <a href="http://news.163.com/photoview/00AN0001/2306841.html">探访口罩生产线:24小时不停工 开足马力供应</a>
                                    </h3></div>
                                </Carousel>
                            </div>
                            <Card
                                title='国际新闻'
                                className='guojiNewsList'
                            >
                                {guojiNewsList}
                            </Card>
                            {/* <PCNewsImageBlock count='6' type='guoji' cardtitle='国际新闻' cardwidth='112px' news={guojiNews} /> */}
                        </div>
                        <div className='centerContainer'>
                            <div className='top'>
                                <div className='tabs_news'>
                                    <div className='header'>
                                        <p className='chinese'>今日推荐</p><p className='En'>HOT</p>
                                    </div>
                                    <List
                                        bordered={false}
                                        split={false}
                                        dataSource={topNews.slice(0, 6)}
                                        renderItem={item => (
                                            <Router><Link to={`details`} target="_blank">
                                                <List.Item>
                                                    {/* <Typography.Text mark>[ITEM]</Typography.Text>  */}
                                                    {item.title}
                                                </List.Item>
                                            </Link></Router>
                                        )}
                                    />
                                </div>
                                <Tabs className='pc_prodcuct'>
                                    <TabPane tab='媒体合作' key='1'>
                                        <PCProduct />
                                    </TabPane>
                                </Tabs>
                            </div>
                            <PCNewsImageBlock count='10' type='guonei' cardtitle='国内新闻' width='100%' cardwidth='114px' news={guoneiNews} />
                            <PCNewsImageBlock count='15' type='yule' cardtitle='娱乐新闻' width='100%' cardwidth='114px' news={yuleNews} />
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}