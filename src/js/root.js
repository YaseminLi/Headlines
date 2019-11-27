import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route,Switch} from 'react-router-dom';
import PCIndex from './component/pc_index';
import MobileIndex from './component/mobile_index';
// import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';
import PCNewsDetails from './component/pc_news_details'
import MobileNewsDetails from './component/mobile_new_details';
import PCUserCenter from './component/pc_usercenter'
import MobileUserCenter from './component/mobile_usercenter'
class Root extends React.Component {
    render() {
        return (
            <div>
                <MediaQuery minDeviceWidth={1224}>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/' component={PCIndex}></Route>
                            <Route path='/details/:uniquekey' component={PCNewsDetails}></Route>
                            <Route path='/usercenter' component={PCUserCenter}></Route>
                        </Switch>
                    </BrowserRouter>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={1224}>
                <BrowserRouter>
                        <Switch>
                            <Route exact path='/' component={MobileIndex}></Route>
                            <Route path='/details/:uniquekey' component={MobileNewsDetails}></Route>
                            <Route path='/usercenter' component={MobileUserCenter}></Route>
                        </Switch>
                    </BrowserRouter>
                </MediaQuery>
            </div>
        );
    };
}
ReactDOM.render(
    <Root />, document.getElementById('mainContainer'));

