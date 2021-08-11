import React, { useState , useEffect} from 'react'
import { Container, Grid, Paper } from "@material-ui/core";
import moment from 'moment';
import axios from 'axios';
import queryString from 'query-string';
import { makeStyles } from "@material-ui/core/styles";
import { Line } from "react-chartjs-2";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const options = {
	scales: {
		yAxes: [
			{
				ticks: {
					beginAtZero: true,
				},
			},
		],
	},
};

const useStyles = makeStyles({
	table: {
		width: "100%",
	},
});

export default function DashboardComp() {
    const classes = useStyles();
    const [dashboardData, setDashboardData] = useState(null);
    const [weeklyTransactions, setWeeklyTransactions ] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [query, setQuery] = useState({
		start: moment().startOf("week").format("llll"),
		end: moment().endOf("week").format("llll"),
		limit: 5,
	});

    const weeklyData = []


    if (dashboardData && dashboardData.items) {
		for (let i = 1; i <= 7; i++) {
			let index = dashboardData.items.findIndex((item) => item._id == i);
			if (index !== -1)
				weeklyData.push(dashboardData.items[index]["grandtotal"]);
			else weeklyData.push(0);
		}
	}

    const ChartInfo = {
		labels: ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"],
		datasets: [
			{
				label: "Income",
				data: weeklyData,
				fill: false,
				backgroundColor: "rgb(255, 99, 132)",
				borderColor: "rgba(255, 99, 132, 0.2)",
			},
		],
	};

    useEffect(() => {
        axios(`${process.env.REACT_APP_BACKEND_API}transaction/dashboard?${queryString.stringify(query)}`,
        ).then((result) =>setDashboardData(result.data.data));
    }, []); 

    useEffect(() => {
		axios(`${process.env.REACT_APP_BACKEND_API}transaction?${queryString.stringify(query)}`,
		).then((result) => setWeeklyTransactions(result.data.data.transactions));
	}, []);

    return (
        <div className="wholedashboard">
            <Container>
            <h4 className="headtag pt-2">Dashboard</h4>
            <Grid container>
					<Grid item lg={4} md={6} xs={12}>
                    <Paper className="d-sm-cards maroon-card">
							<p>{dashboardData && dashboardData.count}</p>
                            <img className="cardimg" src="https://cashie.herokuapp.com/static/media/004-online%20shopping.7c268c3e.svg" alt="Shopping" />
							<h6>Transactions</h6>
						</Paper>
					</Grid>
					<Grid item lg={4} md={6} xs={12}>
                    <Paper className="d-sm-cards indigo-card">
							<p>{`$${(dashboardData && dashboardData.total)}`}</p>
                            <img className="cardimg" src="https://cashie.herokuapp.com/static/media/007-money.3705abec.svg" alt="money" />
							<h6>Income</h6>
						</Paper>
					</Grid>
					<Grid item lg={4} md={6} xs={12}>
                    <Paper className="d-sm-cards orange-card">
							<p>{dashboardData && dashboardData.qty}</p>
                            <img className="cardimg" src="https://cashie.herokuapp.com/static/media/033-wallet.ac1159bd.svg" alt="item" />
							<h6>Products</h6>
						</Paper>
					</Grid>
				</Grid>
                <Grid container direction="row`" alignItems="stretch" justifyContent="space-evenly">
					<Grid item lg={6} xs={12}>
						<Paper className="me-3 rounded-3 p-4 mb-4">
							<Line data={ChartInfo} options={options} />
						</Paper>
					</Grid>
					<Grid item lg={6} xs={12} s>
						<Paper className="ms-3 me-3 p-3 rounded-3 mb-4">
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Reciept No</TableCell>
										<TableCell align="right">Date</TableCell>
										<TableCell align="right">Quantity</TableCell>
										<TableCell align="right">Total</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{weeklyTransactions &&
										weeklyTransactions.map((transaction) => (
											<TableRow key={transaction._id}>
												<TableCell component="th" scope="row">
													{transaction._id}
												</TableCell>
												<TableCell align="right">
													{moment(transaction.createdAt).format("llll")}
												</TableCell>
												<TableCell align="right">
													{transaction.items.length}
												</TableCell>
												<TableCell align="right">
													{transaction.subtotal}
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</Paper>
					</Grid>
				</Grid>
            </Container>
        </div>
    )
}
