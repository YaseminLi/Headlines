import React from 'react';
//import { Row, Col } from 'antd';
import { Menu, Icon, Modal, Button, Tabs, Form, Input } from 'antd';
import { BrowserRouter, Link } from 'react-router-dom'

const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;

class MobileHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userId: 0
        }
    }
    componentWillMount() {
        if (localStorage.NickUserName !== '') {
            this.setState({
                hasLogined: true,
                userNickName: localStorage.userNickName,
                userId: localStorage.userId
            })
        }
    }
    setModalVisible(value) {
        this.setState({ modalVisible: value })
    }
    handleClick(e) {
        if (e.key == 'register') {
            this.setState({ current: 'register' });
            this.setModalVisible(true);
        } else {
            this.setState({ current: 'e.key' });
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        var formData = this.props.form.getFieldsValue();
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
            + "&username=" + formData.userName + "&password=" + formData.password
            + "&r_userName=" + formData.r_userName + "&r_password="
            + formData.r_password + "&r_confirmPassword="
            + formData.r_confirmPassword, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({ userNickName: json.NickUserName, userId: json.UserId });
            });
        message.success("请求成功！");
        if (this.state.action == 'login') {
            this.setState({ hasLogined: true });
            localStorage.userId = json.UserId;
            localStorage.userNickName = json.NickUserName;
        }
        this.setModalVisible(false);
    }
    callback(key) {
        if (key == 1) {
            this.setState({ action: 'login' });
        } else { this.setState({ action: 'register' }); }
    }
    logout() {
        localStorage.userId = "";
        localStorage.userNickName = "";
        this.setState({
            hasLogined: false
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const userShow = this.state.hasLogined ?
            <BrowserRouter><Link to={`usercenter`} target='_blank'>
                <Icon type='user' />
            </Link>
            </BrowserRouter> :
            <Icon type='setting' onClick={this.setModalVisible.bind(this, true)} />;
        return (
            <div id='mobileheader'>
                <header>
                    <img src='/src/images/logo.png' alt='logo' />
                    <span>ReactNews</span>
                    {userShow}
                    <Modal
                        title="用户中心"
                        wrapClassName='vertical-center-modal'
                        visible={this.state.modalVisible}
                        onOk={() => this.setModalVisible(false)}
                        onCancel={this.setModalVisible.bind(this, false)}
                        okText='关闭'
                        cancelText='取消'
                    >
                        <Tabs type="card" onChange={this.callback.bind(this)}>
                            <TabPane tab="登录" key="1">
                                <Form layout='horizontal' onSubmit={this.handleSubmit.bind(this)}>
                                    <FormItem label='账户'>
                                        {getFieldDecorator('userName')(<Input placeholder="请输入用户名" />)}
                                    </FormItem>
                                    <FormItem label='密码'>
                                        {getFieldDecorator('password')(<Input type='password' placeholder="请输入您的密码" />)}
                                    </FormItem>
                                    <Button type='primary' htmlType='submit'>登录</Button>
                                </Form>
                            </TabPane>
                            <TabPane tab="注册" key="2">
                                <Form layout='horizontal' onSubmit={this.handleSubmit.bind(this)}>
                                    <FormItem label='账户'>
                                        {getFieldDecorator('r_userName')(<Input placeholder="请输入用户名" />)}
                                    </FormItem>
                                    <FormItem label='密码'>
                                        {getFieldDecorator('r_password')(<Input type='password' placeholder="请输入您的密码" />)}
                                    </FormItem>
                                    <FormItem label='密码'>
                                        {getFieldDecorator('r_confirmPassword')(<Input type='password' placeholder="请确认您的密码" />)}
                                    </FormItem>
                                    {/* 课程上的方法扩展运算符啥意思
                                            <FormItem label='确认密码'>
                                                <Input type='password' placeholder='请确认您的密码' {...getFieldDecorator('r_username')} />
                                            </FormItem> */}
                                    <Button type='primary' htmlType='submit'>注册</Button>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </Modal>
                </header>
            </div>
        )
    }
}
const WrappedRegistrationForm = Form.create({ name: 'MobileHeader' })(MobileHeader);

export default WrappedRegistrationForm;