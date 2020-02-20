import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../css/pc.css'
//路由懒加载
const PCIndex = lazy(() => import(/* webpackChunkName: "PCIndex" */'./component/pc_index'));
const PCNewsDetails = lazy(() => import(/* webpackChunkName: "PCNewsDetails" */'./component/pc_news_details'));
const PCUserCenter = lazy(() => import(/* webpackChunkName: "PCUserCenter" */'./component/pc_usercenter'));
const PCHeader = lazy(() => import(/* webpackChunkName: "PCHeader" */'./component/pc_header'));
const PCFooter = lazy(() => import(/* webpackChunkName: "PCFooter" */'./component/pc_footer'));
class Root extends React.Component {
    render() {
        return (
            <div>
                {/* <MediaQuery minDeviceWidth={1224}> */}

                <BrowserRouter>
                    <Suspense fallback={<div>Loading...</div>}>
                        <PCHeader />
                        <Switch>
                            <Route exact path='/' component={PCIndex}></Route>
                            <Route path='/details' component={PCNewsDetails}></Route>
                            <Route path='/usercenter' component={PCUserCenter}></Route>
                        </Switch>
                        <PCFooter />
                    </Suspense>
                </BrowserRouter>

            </div>
        );
    };
}
ReactDOM.render(
    <Root />, document.getElementById('mainContainer'));

