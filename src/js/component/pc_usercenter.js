import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import { Tabs, Row, Col, List } from 'antd';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const TabPane = Tabs.TabPane;
export default class PCUserCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            usercollection: '',
            usercomments: '',
            value:''
        }
    }
    componentDidMount() {
        const myFetchOptions = {
            method: 'GET'
        }
        fetch('https://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=' + localStorage.userId, myFetchOptions)
            .then(response => response.json())
            .then(json => (this.setState({ usercollection: json })))
        fetch('https://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=' + localStorage.userId, myFetchOptions)
            .then(response => response.json())
            .then(json => (this.setState({ usercomments: json })))
    }
    handleChange(e){
        this.setState({value: e.target.value})
        console.log('target:'+e.target.value);
        
        console.log('this.state:'+this.state.value)
      }

    render() {
        const { usercollection, usercomments } = this.state;
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
            :  <div>
            <select onChange={this.handleChange.bind(this)} value={this.state.value}>
               <option value="JavaScript" key={1}>JavaScript</option>
               <option value="Angular2" key={2}>Angular2</option>
               <option value="React" key={3}>React</option>
            </select>
            <h1>{this.state.value}</h1>
        </div>;
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
            <div className='pcuccenter'>
                <PCHeader />
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Tabs>
                            <TabPane tab='我的收藏列表' key='1'>
                                {usercollectionList}
                            </TabPane>
                            <TabPane tab='我的评论列表' key='2'>
                                {usercommentsList}
                            </TabPane>
                            <TabPane tab='头像设置' key='3'>3</TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>

                <PCFooter />
            </div>
        )
    }
}