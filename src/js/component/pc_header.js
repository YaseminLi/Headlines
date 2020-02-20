import React from 'react';
import { Row, Col } from 'antd';
import { Menu, Icon, Modal, Button, Tabs, Form, Input } from 'antd';
import { BrowserRouter , Link } from 'react-router-dom';

const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class PCHeader extends React.Component {
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
    //页面刷新保留登录状态
    //组件将要加载前
    componentWillMount() {
        if (localStorage.userNickName !== '') {
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
        this.setState({ current: 'e.key' });
    }
    handleSubmit(e) {
        const formData = this.props.form.getFieldsValue();
        console.log(formData);
        
        this.setState({
            userNickName: formData.userName, userId: formData.userId, hasLogined: true
        })
        this.setModalVisible(false);
        localStorage.userId = formData.userId;
        localStorage.userNickName = formData.userName;
    }
    callback(key) {
        if (key == 1) {
            this.setState({ action: 'login' });
        } else { this.setState({ action: 'register' }); }
    };
    logout() {
        localStorage.userId = "";
        localStorage.userNickName = "";
        this.setState({
            hasLogined: false
        })
    }
    login() {
        this.setState({ current: 'register' });
        this.setModalVisible(true);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const userShow = this.state.hasLogined ?
            <div key='logout' className='register'>
                <Button type="primary" >{this.state.userNickName}</Button>
                &nbsp;&nbsp;
                <BrowserRouter>
                    <Link to={`/usercenter`} target="_blank">
                        <Button type="ghost" >个人中心</Button>
                    </Link>
                &nbsp;&nbsp;
                    <Link to={`/`} target="_blank">
                    <Button type="dashed" onClick={this.logout.bind(this)}>退出</Button>
                    </Link>
                </BrowserRouter>
            
            </div>
            : <div key='register' className='register' onClick={this.login.bind(this)}>
                <Button type="primary" >注册/登录</Button>
            </div>;
        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4} className='logo'>
                    <BrowserRouter><Link to={`/`} target="_blank">
                        <i class="iconfont iconNews"></i>
                        <span>ReactNews</span>
                        </Link></BrowserRouter>
                    </Col>
                    <Col span={16} className='tags' >
                        <Menu mode='horizontal' selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)}>
                            <MenuItem key='top'> <Icon type="appstore" />头条</MenuItem>
                            <MenuItem key='guonei'> <Icon type="appstore" />国内</MenuItem>
                            <MenuItem key='shehui'> <Icon type="appstore" />社会</MenuItem>
                            <MenuItem key='yule'> <Icon type="appstore" />娱乐</MenuItem>
                            <MenuItem key='tiyu'> <Icon type="appstore" />体育</MenuItem>
                            <MenuItem key='jiankang'> <Icon type="appstore" />健康</MenuItem>
                            <MenuItem key='shishang'> <Icon type="appstore" />时尚</MenuItem>
                        </Menu>
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
                                    <Form layout='horizontal'>
                                        <FormItem label='账户'>
                                            {getFieldDecorator('r_userName')(<Input placeholder="请输入用户名" />)}
                                        </FormItem>
                                        <FormItem label='密码'>
                                            {getFieldDecorator('r_password')(<Input type='password' placeholder="请输入您的密码" />)}
                                        </FormItem>
                                        <FormItem label='密码'>
                                            {getFieldDecorator('r_confirmPassword')(<Input type='password' placeholder="请确认您的密码" />)}
                                        </FormItem>
                                        <Button type='primary' htmlType='submit'>注册</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        )
    }
}
const WrappedRegistrationForm = Form.create({ name: 'PCHeader' })(PCHeader);

export default WrappedRegistrationForm;