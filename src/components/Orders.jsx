import React, { useState, useEffect } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker,} from '@material-ui/pickers';
import axios from "axios";
import queryString from "query-string";
import {Container, FormControl, Grid, Select, Paper ,LinearProgress, InputLabel} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	formcont: {
		backgroundColor: "white",
        borderRadius: "15dp"
	},
	realpaper: {
		borderRadius: "20px",
        marginTop: "15px",
        paddingLeft: "10px",
	},
});

export default function Orders(props) {
const classes = useStyles();
const [reportData, setReportData] = useState(null);
const [refresh , setRefresh] = useState(null);
const [query, setQuery] = useState({
    sort: "Newest",
    limit: 20,
    page: 0,
    start: moment().startOf("week").format("llll"),
	end: moment().endOf("week").format("llll"),
});//100727224164

console.log(reportData);


useEffect(() => {
    axios({
        url: `${process.env.REACT_APP_BACKEND_API}transaction?${queryString.stringify(
            query,)}`,
        headers: {
        	authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((result) => {
        if (result.data.status === "success")
            setReportData(result.data.data.transactions);
    });
}, [refresh, query]);

  const handleStartDateChange = (date) => {
    setQuery({ ...query, ["start"]: date });
  };
  const handleEndDateChange = (date) => {
    setQuery({ ...query, ["end"]: date });
  };
  const handleQueryChange = (e) => {
    setQuery({ ...query, ["sort"]: e.target.value });

    console.log(query);
};
    return (
        <div className="maindivuser">
            <Container className="mb-3">
				<Grid container>
					<Link to={`${props.match.path}/new`}>
						<h5 className="reportheading">Reports</h5>
					</Link>
				</Grid>
				<Grid container justifyContent="flex-end">
					<form >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justifyContent="space-around">
                       <FormControl square={false} size="small" variant="outlined" className={` rounded ${classes.formControl} ${classes.formcont} me-3`}>
                       <KeyboardDatePicker
                        className="m-2"
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="start"
                        label="Start"
                        value={query.start}
                        onChange={handleStartDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}/>
						</FormControl>
                        <FormControl square={false} size="small" variant="outlined" className={`${classes.formControl} ${classes.formcont} me-3 rounded`}>
                        <KeyboardDatePicker
                        className="m-2"
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="end"
                        label="End"
                        value={query.end}
                        onChange={handleEndDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}/> 
						</FormControl>
                            <FormControl square={false} size="small" className={`rounded ${classes.formControl} ${classes.formcont} me-5`}>
							<InputLabel className="mt-2 ms-3" htmlFor="outlined-age-native-simple">
								Sort By
							</InputLabel>
							<Select
                            className="mt-4 ms-3 me-3"
								native
                                onChange={handleQueryChange}
								value={query.sort}
								inputProps={{
									name: "sort",
									id: "outlined-age-native-simple",
								}}>
								<option value="Newest">Newest</option>
								<option value="Oldest">Oldest</option>
							</Select>
						</FormControl>
         </Grid>
    </MuiPickersUtilsProvider>
					</form>
				</Grid>
				<Grid container>
					<Grid item xs={11} className="m-auto mt-3">
                    <Paper container square={false} className={classes.realpaper}>
                    <Table className={`${classes.table} m-auto mt-4 mb-4`} aria-label="simple table">
                        <TableHead>
							<TableRow>
								<TableCell align="left">ID</TableCell>
								<TableCell align="left">Date</TableCell>
								<TableCell align="left">Quantity</TableCell>
								<TableCell align="right">Grand Total</TableCell>
							</TableRow>
						</TableHead>
                        <TableBody>
									{reportData? (
										reportData.map((report) => (
                                            //<Paper container square={false} className={classes.realpaper}>
											<TableRow key={report._id}>
												<TableCell component="th" scope="row" align="left">
                                                {report._id}
												</TableCell>
												<TableCell align="left">
                                                    {moment(report.updatedAt).format("llll")}
												</TableCell>
                                                <TableCell align="left">
                                                    {report.items.length}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {report.grandtotal}
                                                </TableCell>
											</TableRow>
                                           // </Paper>
										))
									) : (
										<TableRow>
											{/* <TableCell colSpan="5"><h3>No Data</h3></TableCell> */}
											<TableCell colSpan="4">
											<LinearProgress
												style={{ height: "20px", width: "100%" }}
											/>
											</TableCell>
											</TableRow>	
									)}
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
