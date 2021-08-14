import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import {Container,FormControl,Grid,Paper,InputLabel,Select,
    InputAdornment,OutlinedInput,LinearProgress} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popover from "@material-ui/core/Popover";
import {  List, ListItem } from "@material-ui/core";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	formcont: {
		backgroundColor: "white",
	},
	realpaper: {
		borderRadius: "20px",
        marginTop: "15px",
        paddingLeft: "10px",
        display: "flex",
	},
});

export default function Categories(props) {
    const classes = useStyles();
    const [categories, setCategories] = useState(null);
	const [refresh, setRefresh] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selecteduser , setselecteduser] = useState(null);
	const [query, setQuery] = useState({
		sort: "Newest",
		limit: 300,
        page: 0,
	});

    useEffect(() => {
		axios({
			url: `${process.env.REACT_APP_BACKEND_API}category?${queryString.stringify(
				query,)}`,
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}).then((result) => {
			if (result.data.status === "success")
				setCategories(result.data.data.categories);
		});
	}, [refresh, query]);

    const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#090636",
			cancelButtonColor: "#f33968",
			confirmButtonText: "Delete",
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.delete(`${process.env.REACT_APP_BACKEND_API}category/${id}`, {
						headers: {
							authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					})
					.then((response) => {
						if (response.data.status === "success") {
							Swal.fire("Deleted!", "Category has been deleted..", "success");
							setRefresh(!refresh);
						} else {
							Swal.fire("Opps!", "Somthing went wrong..", "error");
						}
					})

					.catch((err) => {
						Swal.fire("Opps!", "Somthing went wrong..", "error");
					});
			}
		});
	};
	const handleQueryChange = (e) => {
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
			<Container>
				<Grid container>
					<Link to={`${props.match.path}/new`}>
					<button className="useraddbtn mt-5 ms-5">
							+ New Category
						</button>
					</Link>
				</Grid>
				<Grid container justifyContent="flex-end">
					<form onChange={handleQueryChange}>
						<FormControl size="small" variant="outlined" className={`${classes.formcont} me-4`}>
							<OutlinedInput
								id="outlined-adornment-password"
								name="keyword"
								placeholder="Search Category..."
								endAdornment={
									<InputAdornment position="end">
										<SearchIcon />
									</InputAdornment>
								}
								labelWidth={70}
							/>
						</FormControl>
						<FormControl size="small" variant="outlined" className={`${classes.formControl} ${classes.formcont} me-5`}>
							<InputLabel htmlFor="outlined-age-native-simple">
								Sort By
							</InputLabel>
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
							</Select>
						</FormControl>
					</form>
				</Grid>
				<Grid container>
					<Grid item xs={11} lg={11} className="m-auto">
                        <h5 className="m-2">Category Name</h5>
							<Table className={`${classes.table} m-auto mt-4 mb-4`} aria-label="simple table">
									{categories? (
										categories.map((category) => (
                                            <Paper container square={false} className={classes.realpaper}>
                                                <TableBody>
											<TableRow key={category._id}>
												<TableCell className="leftalign" component="th" scope="row" align="left">
                                                {category.name}
												</TableCell>
												<TableCell align="right" className="rightalign">
													<MoreVertIcon id={category._id} className="optionbtn" onClick={handleClick} />
													<Popover
						                             id={category._id}
													 key={category._id}
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
						                            }}
                                                    >
						                             <List>
							                             <ListItem className="optionitemuser">
														 <Link className="editbtnclr" to={`${props.match.path}/update/${selecteduser}`}>
														<EditIcon className="optionitemuser me-2"/>Edit
													</Link>
								                         </ListItem>
							                             <ListItem onClick={() => handleDelete(selecteduser)} className="optionitemuser">
								                         <DeleteIcon className="me-2"/>
								                          Delete</ListItem>
						                             </List>
					                                 </Popover>
												</TableCell>
											</TableRow>
                                            </TableBody>
                                            </Paper>
										))
									) : (
										<TableRow>
											{/* <TableCell colSpan="5"><h3>No Data</h3></TableCell> */}
											<TableCell colSpan="5">
											<LinearProgress
												style={{ height: "20px", width: "100%" }}
											/>
											</TableCell>
											</TableRow>	
									)}
							</Table>
					</Grid>
				</Grid>
			</Container>

			<div className="enddivuser"><p>End of Data</p></div>
		</div>
    )
}
