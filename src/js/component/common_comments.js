import React from 'react';
import { Input, Button } from 'antd';
import { Comment, Icon, Tooltip, Avatar, List, Form, notification } from 'antd';
import moment from 'moment';
const { TextArea } = Input;
const FormItem = Form.Item;

class CommonComments extends React.Component {
    constructor() {
        super();
        this.state = {
            comments: ''
        }
    }
    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({ comments: json });
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        const formData = this.props.form.getFieldsValue();
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userId + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formData.inputcomment, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.componentDidMount()
            });
    }
    addUserArticle() {
        var myFetchOptions = {
            method: 'GET'
        };
        const formData = this.props.form.getFieldsValue();
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userId + "&uniquekey=" + this.props.uniquekey, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                //收藏成功后弹出的内容
                notification['success']({
                    message: 'ReactNews提醒',
                    description: '该文章收藏成功',
                });
            });
    }
    render() {
        const { comments } = this.state;
        const commentList = comments.length ?
            <List
                className="comment-list"
                header={`${comments.length} 条评论`}
                dataSource={comments}
                renderItem={item => (
                    <Comment
                        author={item.UserName}
                        content={item.Comments}
                        datetime={'发表于' + item.datetime}
                    />
                )}
            />
            : '没有加载到任何评论';
        const { getFieldDecorator } = this.props.form;

        return (
            <div className='common_comments'>
                {commentList}
                <div className='input-comment'>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <FormItem label='您的评论：' >
                            {(getFieldDecorator('inputcomment'))(<TextArea rows={2} placeholder="请输入您的评论" />)}
                        </FormItem>
                        <Button
                            type="primary"
                            htmlType='submit'
                            style={{ marginLeft: '400px', marginRight: '100px' }}
                        >提交评论</Button>
                        <Button
                            type="primary"
                            htmlType='button'
                            onClick={this.addUserArticle.bind(this)}
                        >收藏该文章</Button>
                    </Form>
                </div>
                {/* 不用表单写评论
                    <div className='input-comment'>
                    <p style={{ textAlign: "center" }}>您的评论:</p>
                    <TextArea rows={2} placeholder="请输入您的评论" />
                    <Button 
                    type="primary" 
                    style={{ margin: '10px auto', display: 'block' }}
                    onClick={this.handleClick.bind(this)}>提交评论</Button>
                </div> */}
            </div>
        )
    }
}
const WrappedRegistrationForm = Form.create({ name: 'CommonComments' })(CommonComments);

export default WrappedRegistrationForm;