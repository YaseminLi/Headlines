import React from 'react';
import { Input, Button, LocaleProvider } from 'antd';
import { Comment, List, Form, notification } from 'antd';
import commentsData from '../../../newsData/comments'
import dateParse from '../../helper/date'
const { TextArea } = Input;
const FormItem = Form.Item;


class CommonComments extends React.Component {
    constructor() {
        super();
        this.state = {
            comments: '',
            myComment: ''
        }
    }
    componentDidMount() {
        //评论数据获取
        //一：API
        // var myFetchOptions = {
        //     method: 'GET'
        // };
        // fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions)
        //     .then(response => response.json())
        //     .then(json => {
        //         this.setState({ comments: json });
        //     });

        //二：本地mock
        this.setState({ comments: commentsData });

    }

    handleSubmit(e) {
        // e.preventDefault();
        // var myFetchOptions = {
        //     method: 'GET'
        // };
        // const formData = this.props.form.getFieldsValue();
        // fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userId + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formData.inputcomment, myFetchOptions)
        //     .then(response => response.json())
        //     .then(json => {
        //         this.componentDidMount()
        //     });

        const inputData = this.props.form.getFieldsValue().inputcomment
        const commitData = {
            UserName: localStorage.userNickName,
            Comments: inputData,
            datetime: dateParse(Date.now())
        }
        const comments = this.state.comments
        comments.push(commitData)
        let localComments=JSON.parse(localStorage.getItem('comments'))
        if(localComments){
            localComments.push(commitData)
            localStorage.setItem('comments',JSON.stringify(localComments))
        }else{
            localStorage.setItem('comments',JSON.stringify([commitData]))
        }
        this.setState({ comments: comments, myComment:'' })
    }
    addUserArticle() {
        // var myFetchOptions = {
        //     method: 'GET'
        // };
        // const formData = this.props.form.getFieldsValue();
        // fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userId + "&uniquekey=" + this.props.uniquekey, myFetchOptions)
        //     .then(response => response.json())
        //     .then(json => {
        //         //收藏成功后弹出的内容
        //         notification['success']({
        //             message: 'ReactNews提醒',
        //             description: '该文章收藏成功',
        //         });
        //     });
        //收藏成功后弹出的内容
        notification['success']({
            message: 'ReactNews提醒',
            description: '该文章收藏成功',
        });
        let collectionList=JSON.parse(localStorage.getItem('collection'))
        const title=this.props.title
        if(collectionList){
            collectionList.push(title)
        }else{
            collectionList=[title]
        }
        localStorage.setItem('collection',JSON.stringify(collectionList))
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
                            {(getFieldDecorator('inputcomment'))(<TextArea rows={2} placeholder="请输入您的评论" allowClear='true' value={this.state.myComment} />)}
                        </FormItem>

                    </Form>
                </div>
                <div className='commentdButton'>
                    <Button
                        type="primary"
                        htmlType='submit'
                        style={{ marginRight: '100px' }}
                        onClick={this.handleSubmit.bind(this)}
                    >提交评论</Button>
                    <Button
                        type="primary"
                        htmlType='button'
                        onClick={this.addUserArticle.bind(this)}
                    >收藏该文章</Button>
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