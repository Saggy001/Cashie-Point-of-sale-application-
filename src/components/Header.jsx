import React,{useContext} from 'react'
import { CartContext } from "../App";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Popover from "@material-ui/core/Popover";
import { List, ListItem } from "@material-ui/core";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link,  useLocation  } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	typography: {
		padding: theme.spacing(2),
	},
}));

const StyledBadge = withStyles((theme) => ({
	badge: {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: "0 4px",
	},
}))(Badge);

export default function Header(props) {
    let loc = useLocation().pathname.split("/");
    //let loc = useLocation().pathname;
    const classes = useStyles();
	const { cartItems } = useContext(CartContext);
	const [anchorEl, setAnchorEl] = React.useState(null);

    loc.includes("main") && loc.pop();
    loc = loc.join("/")

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

    const clickit = () =>{
        console.log(loc);
        console.log("yes");
    }

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;


    return (
        <div class="header-wrapper">
        <div className="nav-list">
            <IconButton aria-label="cart" className="me-5">
                <StyledBadge badgeContent={cartItems.length} color="secondary">
                    <ShoppingCartIcon />
                </StyledBadge>
            </IconButton>
                
                <AccountCircleIcon className="navimage" onClick={handleClick} />
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}>
                    <List>
                        <ListItem className="optionitemuser"> 
                            <Link className="editbtnclr" to={`/dashboard/setting`}>Settings
							</Link>
                            </ListItem>
                        <ListItem className="optionitemuser">Account</ListItem>
                        <ListItem className="optionitemuser">Logout</ListItem>
                    </List>
                </Popover>        
        </div>
    </div>
    )
}
