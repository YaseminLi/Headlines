import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import { Tabs, Row, Col, List, Upload, Icon,Modal} from 'antd';
import { BrowserRouter, Link } from 'react-router-dom';

const TabPane = Tabs.TabPane;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
export default class PCUserCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            usercollection: '',
            usercomments: '',
            value: '',
            previewVisible: false,
            previewImage: '',
            fileList: [
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }]
        }
    }
    componentDidMount() {
        // const myFetchOptions = {
        //     method: 'GET'
        // }
        // fetch('https://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=' + localStorage.userId, myFetchOptions)
        //     .then(response => response.json())
        //     .then(json => (this.setState({ usercollection: json })))
        // fetch('https://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=' + localStorage.userId, myFetchOptions)
        //     .then(response => response.json())
        //     .then(json => (this.setState({ usercomments: json })))
        let collection = JSON.parse(localStorage.getItem('collection'))
        if (!collection) {
            collection = []
        }

        let comments = JSON.parse(localStorage.getItem('comments'))
        if (!comments) {
            comments = []
        }
        this.setState({
            usercollection: collection,
            usercomments: comments
        })
    }
    handleCancel() { this.setState({ previewVisible: false }) };
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            console.log(file);
            
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });
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
                                {/* <Link to={`details/${item.uniquekey}`} target='_blank'> */}
                                <Link to={`details}`} target='_blank'>
                                    <span className='ucdetails'>查看</span>
                                </Link>
                            </BrowserRouter>}>
                        <p>{item}</p>
                    </List.Item>)}
            />
            : '您还没有收藏任何文章';
        const usercommentsList = usercomments.length ?
            <List
                size="large"
                bordered
                dataSource={usercomments}
                renderItem={item =>
                    (<List.Item
                        extra={
                            <BrowserRouter>
                                {/* <Link to={`details/${item.uniquekey}`} target='_blank'> */}
                                <Link to={`details`} target='_blank'>
                                    <span className='ucdetails'>查看</span>
                                </Link>
                            </BrowserRouter>}>
                        <List.Item.Meta
                            title={'于' + item.datetime + '发表了评论'}
                            description={item.Comments}
                        /></List.Item>)}
            />
            : '您还没有评论任何文章';
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className='pcuccenter'>
                <PCHeader />
                <Row className='container'>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Tabs>
                            <TabPane tab='我的收藏列表' key='1'>
                                {usercollectionList}
                            </TabPane>
                            <TabPane tab='我的评论列表' key='2'>
                                {usercommentsList}
                            </TabPane>
                            <TabPane tab='头像设置' key='3'>
                                <div className="clearfix">
                                    <Upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}
                                    >
                                        {fileList.length >= 8 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>

                <PCFooter />
            </div>
        )
    }
}