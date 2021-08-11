import React from 'react';
import { Link , useLocation } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import ReceiptIcon from '@material-ui/icons/Receipt';
import CategoryIcon from '@material-ui/icons/Category';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LayersIcon from '@material-ui/icons/Layers';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import SettingsIcon from '@material-ui/icons/Settings';
// import ChatIcon from '@material-ui/icons/Chat';
// import PersonAddIcon from '@material-ui/icons/PersonAdd';
// import PersonIcon from '@material-ui/icons/Person';

function SideBar(props) {
	const loc = useLocation().pathname.split("/");
    return (
        <div>
			<Link
			to={`/dashboard/main`}>
			<div key='1' className={`sidebar-links ${loc.includes("main")?"sidebar-active": ""}`}>
				<HomeIcon/>
				<p>Dashboard</p>
			</div>
			</Link>
			<Link
			to={`/dashboard/user`}>
			<div key='2' className={`sidebar-links ${loc.includes("user")?"sidebar-active" : ""}`}>
						<PeopleIcon/>
						<p>User</p>
					</div>
			</Link>
			<Link
			to={`/dashboard/category`}>
			<div key='3' className={`sidebar-links ${loc.includes("category")?"sidebar-active" : ""}`}>
						<CategoryIcon/>
						<p>Category</p>
					</div>
			</Link>
			<Link
			to={`/dashboard/product`}>
			<div key='4' className={`sidebar-links ${loc.includes("product")?"sidebar-active" : ""}`}>
						<LayersIcon/>
						<p>Product</p>
					</div>
			</Link>
			<Link
			to={`/dashboard/transaction`}>
			<div key='5' className={`sidebar-links ${loc.includes("transaction")?"sidebar-active" : ""}`}>
						<ReceiptIcon/>
						<p>Transaction</p>
					</div>
			</Link>
			<Link
			to={`/dashboard/report`}>
			<div key='6' className={`sidebar-links ${loc.includes("report")?"sidebar-active" : ""}`}>
						<ShoppingBasketIcon/>
						<p>Report</p>
					</div>
			</Link>
        </div>
    )
}
export default SideBar
