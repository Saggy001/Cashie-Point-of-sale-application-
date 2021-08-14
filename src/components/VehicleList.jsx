import React, { useState, useEffect } from 'react'
//import { paginate, sorting, getValue, getLastValue, handlepaginatehighlight} from './utils/Utils';
import axios from "axios";
import queryString from "query-string";
import { Chip, Container, FormControl, Grid, Select, Paper ,
	InputAdornment,
	OutlinedInput,
	LinearProgress} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popover from "@material-ui/core/Popover";
import {  List, ListItem } from "@material-ui/core";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
		backgroundColor: "white",
	},
	formcont: {
		backgroundColor: "white",
	},
	realpaper: {
		borderRadius:"15px"
	},
});

export default function Users(props) {
    const classes = useStyles();
    let [userData, setUserData] = useState(null);
    let [refresh, setRefresh] = useState(true);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selecteduser , setselecteduser] = useState(null);
    const [query, setQuery] = useState({
		role: "all",
		sort: "Newest",
		limit: 100,
	});


    useEffect(() => {
        axios(
			`${process.env.REACT_APP_BACKEND_API}user?${queryString.stringify(
				query,
			)}`,
		).then((result) => setUserData(result.data.data.users));
    }, [refresh, query])

 

    const deleteUser =(id)=>{
		console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#090636",
			cancelButtonColor: "#f33968",
            confirmButtonText: `Delete`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed){ 
                //let filtered = pageData.filter((user) => user.id !== id);
			    //setStudent(filtered);
                axios
					.delete(`${process.env.REACT_APP_BACKEND_API}user/${id}`)
					.then((response) => {
                        setRefresh(!refresh);
						Swal.fire("Deleted!", "User has been deleted..", "success");
					})
					.catch((err) => {
						Swal.fire("Opps!", "Somthing went wrong..", "error");
					});
            }
          });

      
    };
	// const clickit = () =>{
    //     console.log(props.match.path);
    // }

	const handleQueryChange = (e) => {
		setUserData([]);
		setQuery({ ...query, [e.target.name]: e.target.value });
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		setselecteduser(event.currentTarget.id);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	
    return (
        <div className="maindivuser">
            <Container className="mb-3">
				<Grid container>
					<Link to={`${props.match.path}/new`}>
						<button className="useraddbtn mt-4">
							<PersonAddIcon className="me-2" />
							New User
						</button>
					</Link>
				</Grid>
				<Grid container justifyContent="flex-end">
					<form onChange={handleQueryChange}>
						<FormControl  size="small" className={`${classes.formcont} me-4`}>
							<OutlinedInput
								id="outlined-adornment-password"
								name="keyword"
								placeholder="Search users..."
								endAdornment={
									<InputAdornment position="end">
										<SearchIcon />
									</InputAdornment>
								}
								labelWidth={70}
							/>
						</FormControl>
						<FormControl variant="outlined" size="small" className={`${classes.formControl} ${classes.formcont} me-4`}>
							<Select
								native
								value={query.role}
								inputProps={{
									name: "role",
									id: "outlined-age-native-simple",
								}}>
								<option value="all">All Role</option>
								<option value="Admin">Admin</option>
								<option value="Cashier">Cashier</option>
							</Select>
						</FormControl>
						<FormControl variant="outlined" size="small" className={`${classes.formControl} ${classes.formcont}`}>
							<Select
								native
								value={query.sort}
								inputProps={{
									name: "sort",
									id: "outlined-age-native-simple",
								}}>
								<option value="Newest">Newest</option>
								<option value="Oldest">Oldest</option>
								<option value="Name">Name</option>
								<option value="Last Active">Last Active</option>
							</Select>
						</FormControl>
					</form>
				</Grid>
				<Grid container>
					<Grid item xs={12}>
						<Paper square={false} className={classes.realpaper}>
							<Table className={`${classes.table} mt-3 rounded`} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Full Name</TableCell>
										<TableCell align="right">User Name</TableCell>
										<TableCell align="right">Role</TableCell>
										<TableCell align="right">Last Active</TableCell>
										<TableCell align="right">Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{userData ?
										userData.map((user) => (
											<TableRow key={user._id}>
												<TableCell component="th" scope="row">
													{user.fullname}
												</TableCell>
												<TableCell align="right">{user.username}</TableCell>
												<TableCell align="right">
													<Chip
														variant="outlined"
														color="secondary"
														label={user.role}
													/>
												</TableCell>
												<TableCell align="right">
													{moment(user.lastActive).format("llll")}
												</TableCell>

												<TableCell align="right">
													<MoreVertIcon id={user._id} className="optionbtn" onClick={handleClick} />
													<Popover
						                             id={user._id}
													 key={user._id}
						                             open={open}
						                             anchorEl={anchorEl}
						                             onClose={handleClose}
						                             anchorOrigin={{
							                             vertical: "center",
							                             horizontal: "center",
						                            }}
						                            transformOrigin={{
							                             vertical: "top",
							                             horizontal: "center",
						                            }}>
						                             <List>
							                             <ListItem className="optionitemuser">
														 <Link className="editbtnclr" to={`${props.match.path}/update/${selecteduser}`}>
														<EditIcon className="optionitemuser me-2"/> Edit
													</Link>
								                        </ListItem>
							                             <ListItem onClick={() => deleteUser(selecteduser)} className="optionitemuser">
								                         <DeleteIcon className="me-2"/>
								                          Delete</ListItem>
						                             </List>
					                                 </Popover>
												</TableCell>
											</TableRow>
										)):
										<TableRow>
										<TableCell colSpan="5">
											<LinearProgress
												style={{ height: "20px", width: "100%" }}
											/>
											</TableCell>
											</TableRow>
											}
								</TableBody>
							</Table>
						</Paper>
					</Grid>
				</Grid>
			</Container>
			<div className="enddivuser"><p>End of Data</p></div>
        </div>
    )
}
//             <div className="input-group flex-nowrap cstmclass p-5">
//             <input onChange={searchfor} type="text" class="form-control" placeholder="Search Here" aria-label="Username" aria-describedby="addon-wrapping"/>
//             </div>
//         <div className="pagination-block">
//         <nav aria-label="Page navigation example">
//   <ul class="pagination">
//     <li onClick={()=> handlePageChange("pre")} class={`page-item ${handlepaginatehighlight(1, currentPage, totalPage)}`}>
//         <a class="page-link" href="#" aria-disabled="true">{currentPage==0?"1":"Previous"}
//         </a>
//         </li>
//     <li onClick={()=> handlePageChange("c")} class={`page-item ${handlepaginatehighlight(2, currentPage, totalPage)}`}>
//         <a class="page-link" href="#" aria-disabled="true">{getValue(currentPage, totalPage)}
//         </a>
//         </li>
//     <li onClick={()=> handlePageChange("next")} class={`page-item ${handlepaginatehighlight(3, currentPage, totalPage)}`}>
//         <a class="page-link" href="#" aria-disabled="true">{getLastValue(currentPage , totalPage)}
//         </a>
//         </li>
//   </ul>
// </nav>
