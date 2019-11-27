import React from 'react';
import PCHeader from './pc_header'
import PCFooter from './pc_footer';
import PCNewsContainer from './pc_news_container'

export default class PCIndex extends React.Component {
    render() {
        return (
            <div className='pcIndex'>
           <PCHeader/>
           <PCNewsContainer/>
           <PCFooter/>
           </div>
        )
    }
}