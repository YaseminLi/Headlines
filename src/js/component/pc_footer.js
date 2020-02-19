import React from 'react';
import { Col } from 'antd';

export default class PCFooter extends React.Component {
    render() {
        return (
            <footer >
                    <Col span={2}></Col>
                    <Col span={20} className='footer'>
                       &copy;&nbsp;2019 ReactNews .  All Rights Reserved.
                    </Col>
                    <Col span={2}></Col>
            </footer>
        )
    }
}