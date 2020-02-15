//news共用的部分
import React from 'react';
import { Carousel, Col, Tabs, List, Avatar, Icon } from 'antd';
const TabPane = Tabs.TabPane;
import PCNewsClock from './pc_news_block';
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
        const guojiNews = newsData.guoji
        const topNews = newsData.top
        const guoneiNews = newsData.guonei
        const yuleNews = newsData.yule
        return (
            <div>
                <Col span={2}></Col>
                <Col span={20} className='container'>
                    <div className='leftContainer'>
                        <div className='carousel' >
                            <Carousel {...settings}>
                                <div><img src='./src/images/carousel_1.jpg' /></div>
                                <div><img src='./src/images/carousel_2.jpg' /></div>
                                <div><img src='./src/images/carousel_3.jpg' /></div>
                                <div><img src='./src/images/carousel_4.jpg' /></div>
                            </Carousel>
                        </div>
                        {/* <PCNewsImageBlock count='6' type='guoji' cardtitle='国际新闻' cardwidth='112px' news={guojiNews} /> */}
                        <List
                            itemLayout="vertical"
                            size="large"
                            dataSource={guojiNews.slice(0,6)}
                            renderItem={item => (
                                <List.Item
                                    key={item.title} 
                                    extra={
                                        <img
                                            width={200}
                                            alt="logo"
                                            src={item.thumbnail_pic_s}
                                        />
                                    }
                                >
                                    {/* <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<a href={item.href}>{item.title}</a>}
                                        description={item.description}
                                    /> */}
                                    {item.title}
                                </List.Item>
                            )}
                        />
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
                                        <List.Item>
                                            {/* <Typography.Text mark>[ITEM]</Typography.Text>  */}
                                            {item.title}
                                        </List.Item>
                                    )}
                                />
                            </div>
                            <Tabs className='pc_prodcuct'>
                                <TabPane tab='媒体合作' key='1'>
                                    <PCProduct />
                                </TabPane>
                            </Tabs>
                        </div>
                        <PCNewsImageBlock count='9' type='guonei' cardtitle='国内新闻' width='100%' cardwidth='112px' news={guoneiNews} />
                        <PCNewsImageBlock count='18' type='yule' cardtitle='娱乐新闻' width='100%' cardwidth='112px' news={yuleNews} />
                    </div>
                </Col>
                <Col span={2}></Col>
            </div>
        )
    }
}