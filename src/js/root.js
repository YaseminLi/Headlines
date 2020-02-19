import React,{ Suspense, lazy }  from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route,Switch} from 'react-router-dom';
import MediaQuery from 'react-responsive';
// import PCIndex from './component/pc_index';
// import MobileIndex from './component/mobile_index';
// import PCNewsDetails from './component/pc_news_details'
// import MobileNewsDetails from './component/mobile_new_details';
// import PCUserCenter from './component/pc_usercenter'
// import MobileUserCenter from './component/mobile_usercenter'

//路由懒加载
const PCIndex = lazy(() => import(/* webpackChunkName: "PCIndex" */'./component/pc_index'));
const MobileIndex = lazy(() => import(/* webpackChunkName: "MobileIndex" */'./component/mobile_index'));
const PCNewsDetails = lazy(() => import(/* webpackChunkName: "PCNewsDetails" */'./component/pc_news_details'));
const MobileNewsDetails = lazy(() => import(/* webpackChunkName: "MobileNewsDetails" */'./component/mobile_new_details'));
const PCUserCenter = lazy(() => import(/* webpackChunkName: "PCUserCenter" */'./component/pc_usercenter'));
const MobileUserCenter = lazy(() => import(/* webpackChunkName: "MobileUserCenter" */'./component/mobile_usercenter'));
class Root extends React.Component {
    render() {
        return (
            <div>
                <MediaQuery minDeviceWidth={1224}>
                    <BrowserRouter>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route exact path='/' component={PCIndex}></Route>
                            {/* <Route path='/details/:uniquekey' component={PCNewsDetails}></Route> */}
                            <Route path='/details' component={PCNewsDetails}></Route>
                            <Route path='/usercenter' component={PCUserCenter}></Route>
                        </Switch>
                        </Suspense>
                    </BrowserRouter>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={1224}>
                <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route exact path='/' component={MobileIndex}></Route>
                            {/* <Route path='/details/:uniquekey' component={MobileNewsDetails}></Route> */}
                            <Route path='/details' component={MobileNewsDetails}></Route>
                            <Route path='/usercenter' component={MobileUserCenter}></Route>
                        </Switch>
                        </Suspense>
                    </BrowserRouter>
                </MediaQuery>
            </div>
        );
    };
}
ReactDOM.render(
    <Root />, document.getElementById('mainContainer'));

