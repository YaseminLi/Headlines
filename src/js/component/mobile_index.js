
import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import { Tabs, Carousel, BackTop } from 'antd';
import MobileList from './mobile_list'
const TabPane = Tabs.TabPane;

export default class MobileIndex extends React.Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 100,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true
        };
        return (
            <div className='mobile'>
                <MobileHeader />
                <Tabs>
                    <TabPane tab="头条" key="1">
                        <div className='carousel' >
                            <Carousel {...settings}>
                                <div><img src='./src/images/carousel_1.jpg' /></div>
                                <div><img src='./src/images/carousel_2.jpg' /></div>
                                <div><img src='./src/images/carousel_3.jpg' /></div>
                                <div><img src='./src/images/carousel_4.jpg' /></div>
                            </Carousel>
                        </div>
                        <MobileList  type='top' />
                    </TabPane>
                    <TabPane tab="国内" key="2"><MobileList  type='guonei' /></TabPane>
                    <TabPane tab="社会" key="3"><MobileList  type='shehui' /></TabPane>
                    <TabPane tab="娱乐" key="4"><MobileList  type='yule' /></TabPane>
                    <TabPane tab="体育" key="5"><MobileList  type='tiyu' /></TabPane>
                    <TabPane tab="健康" key="6"><MobileList  type='jiankang' /></TabPane>
                    <TabPane tab="时尚" key="7"><MobileList  type='shishang' /></TabPane>
                </Tabs>
                <MobileFooter />
                <BackTop/>
            </div>

        )
    }
}