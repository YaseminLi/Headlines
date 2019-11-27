import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Tabs, List } from 'antd';
//import { Upload, Icon, Modal } from 'antd';

const TabPane = Tabs.TabPane;
export default class MobileUserCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            usercollection: '',
            usercomments: ''
        }
    }
    componentDidMount() {
        const myFetchOptions = {
            method: 'GET'
        }
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=' + localStorage.userId, myFetchOptions)
            .then(response => response.json())
            .then(json => (this.setState({ usercollection: json })))
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=' + localStorage.userId, myFetchOptions)
        .then(response => response.json())
        .then(json => (this.setState({ usercomments: json })))
    }
    render() {
        const { usercollection, usercomments } = this.state;
        console.log(usercollection);
        const usercollectionList = usercollection.length ?
            <List
                size="large"
                bordered
                dataSource={usercollection}
                renderItem={item =>
                    (<List.Item
                        key={item.uniquekey}
                        extra={
                            <BrowserRouter>
                                <Link to={`details/${item.uniquekey}`} target='_blank'>
                                    <span className='ucdetails'>查看</span>
                                </Link>
                            </BrowserRouter>}>
                        <p>{item.Title}</p>
                    </List.Item>)}
            />
            : '您还没有收藏文章';
            const usercommentsList = usercomments.length ?
            <List
                size="large"
                bordered
                dataSource={usercomments}
                renderItem={item =>
                    (<List.Item
                        extra={
                            <BrowserRouter>
                                <Link to={`details/${item.uniquekey}`} target='_blank'>
                                    <span className='ucdetails'>查看</span>
                                </Link>
                            </BrowserRouter>}>
                        <List.Item.Meta
                            title={'于' + item.datetime + '发表了评论' + item.uniquekey}
                            description={item.Comments}
                        /></List.Item>)}
            />
            : '您还没有评论任何文章';
        return (
            <div className='mobileuccenter'>
                <MobileHeader />
                <Tabs>
                    <TabPane tab='我的收藏列表' key='1'>
                        {usercollectionList}
                    </TabPane>
                    <TabPane tab='我的评论列表' key='2'>
                    {usercommentsList}
                    </TabPane>
                    <TabPane tab='头像设置' key='3'>
                        <div className='userphoto'>
                        </div>
                    </TabPane>
                </Tabs>
                <MobileFooter />
            </div>
        )
    }
}