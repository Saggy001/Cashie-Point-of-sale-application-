import React from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import { Route, Switch } from "react-router-dom"
import Form from '../components/Form'
import Orders from '../components/Orders'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Transactions from '../components/Transactions'
import './dashboard.css'
import DashboardComp from '../components/DashboardComp'
import VehicleList from '../components/VehicleList';
import NewProduct from '../components/NewProduct'
import NewCategory from '../components/NewCategory'
import Settings from '../components/Settings'

function DashBoard(props) {
    return (
        <div className="main-div">
            <div className="side-bar">
                <SideBar />
            </div>
            <div className="wrapper-class">
                <div className="nav-bar">
                    <Header />
                </div>
                <div className="main-section">
                <Switch>
						<Route
							path={`${props.match.path}/user/new`}
							component={Form}
						/>
						<Route
							path={`${props.match.path}/user/update/:id`}
							component={Form}
						/>
						<Route path={`${props.match.path}/user`} component={VehicleList} />
						
						<Route
							path={`${props.match.path}/product/new`}
							component={NewProduct}
						/>
						<Route
							path={`${props.match.path}/product/update/:id`}
							component={NewProduct}
						/>
						<Route path={`${props.match.path}/product`} component={Products} />
						<Route
							path={`${props.match.path}/transaction`}
							component={Transactions}
						/>
						<Route
							path={`${props.match.path}/category/new`}
							component={NewCategory}
						/>
						<Route
							path={`${props.match.path}/setting`}
							component={Settings}
						/>
						<Route
							path={`${props.match.path}/category/update/:id`}
							component={NewCategory}
						/>
						<Route
							path={`${props.match.path}/category`}
							component={Categories}
						/>
						<Route path={`${props.match.path}/report`} component={Orders} />
						<Route path={`${props.match.path}/main`} component={DashboardComp} />
					</Switch>
                </div>
            </div>

        </div>
    )
}

export default DashBoard
