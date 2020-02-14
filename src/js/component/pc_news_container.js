//news共用的部分
import React from 'react';
import { Carousel, Row, Col, Tabs } from 'antd';
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
        const guojiNews=newsData.guoji
        const topNews=newsData.top
        const guoneiNews=newsData.guonei
        const yuleNews=newsData.yule
        return (
            <div>
                <Row>
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
                            <PCNewsImageBlock count='6' type='guoji' cardtitle='国际新闻' cardwidth='112px' news={guojiNews}/>
                        </div>
                        <Tabs className='tabs_news' style={{ width: 600 }}>
                            <TabPane tab='头条新闻' key='1'>
                                <PCNewsClock count='25' type='top' bordered="false" news={topNews}/>
                            </TabPane>
                            <TabPane tab='娱乐新闻' key='2'>
                                <PCNewsClock count='27' type='yule' width="400px" bordered="false" news={yuleNews}/>
                            </TabPane>
                        </Tabs>
                        <Tabs className='pc_prodcuct'>
                            <TabPane tab='媒体合作' key='1'>
                                <PCProduct />
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <div>
                            <PCNewsImageBlock count='9' type='guonei' cardtitle='国内新闻' width='100%' cardwidth='112px' news={guoneiNews}/>
                            <PCNewsImageBlock count='18' type='yule' cardtitle='娱乐新闻' width='100%' cardwidth='112px' news={yuleNews}/>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>

            </div>

        )
    }
}