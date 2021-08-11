import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {Paper} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Joi from "joi-browser";
import axios from "axios";
import Swal from "sweetalert2";
import ImageIcon from "@material-ui/icons/Image";

const useStyles = makeStyles((theme) => ({
	paper: {
        margin: theme.spacing(6),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	realpaper:{
		borderRadius: "20px"
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(2),
		padding: "15px",
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
    uploadbtn: {
        background: "grey",
        color: "white",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)"
    },
    hiddencls: {
        visibility : "hidden"
    },
}));

export default function NewCategory(props) {
    const classes = useStyles();
	const [formData, setFormData] = useState({});
	const [method, setMethod] = useState("POST");
    const [errors, setErrors] = useState(null);
    console.log(formData);

    useEffect(() => {
		let categoryId = props.match.params.id;
		categoryId &&
			axios(`${process.env.REACT_APP_BACKEND_API}category/${categoryId}`).then(
				(result) => {
					if (result.data.status === "success") {
						let {
							name,
						} = result.data.data;
						setFormData({
							...formData,
							name,
						});
						setMethod("PUT");
					}
				},
			);
	}, []);

    const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

    const userFormSchema = {
		name:
			// method === "PUT"
			// 	? Joi.string().min(3).max(100):
			Joi.string().required().min(3).max(100),
	};

    const handleSubmit = (e) => {
		e.preventDefault();
		//validate form data

		let validation = Joi.validate(formData, userFormSchema, {
			abortEarly: false,
		});
		if (validation.error) {
			setErrors(validation.error.details);
			return;
		}
		axios({
			method: method,
			url: `${process.env.REACT_APP_BACKEND_API}${
				method === "PUT" ? "category/" + props.match.params.id : "category"
			}`,
			data: formData,
		})
			.then((result) => {
				if (result.data.status === "success") {
					setErrors(null);
					Swal.fire(
						"Success",
						`Category ${method === "PUT" ? "updated" : "created"} successfully...`,
						"success",
					);
					props.history.goBack();
				} else {
					Swal.fire("Opps", "Something went wrong...", "error");
				}
			})
			.catch((err) => Swal.fire("Opps", "Something went wrong...", "error"));
	};



    return (
        <Container component="main" maxWidth="lg">
            <Grid item xs={12} sm={6} className="m-auto productpaper">
			<Paper square={false} className={classes.realpaper}>
				<div className={classes.paper}>
                    <div classNmae="headingdivproduct">
                        <ArrowBackIcon onClick={() => props.history.goBack()} className="backbtnproduct"
                        />
			            <p className="productformhead" >&nbsp;&nbsp;&nbsp;{method === "POST" ?"Create New Product":"Update Product"}</p>
                            </div>
                	<form
						onSubmit={handleSubmit}
						onChange={handleChange}
						className={classes.form}
						noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12}>
								<TextField
									name="name"
									variant="outlined"
                                    size="small"
									required
									fullWidth
									placeholder="Category Name"
									InputLabelProps={{
										shrink: false,
									}}
									value={formData && formData.name}
                                    helperText = {errors &&
                                        errors.find((error) => error.context.key === "name") &&
                                        errors
                                            .filter((error) => error.context.key === "name")
                                            .map((error) => (error.message))}
								/>
							</Grid>
						<Grid container justifyContent="center">
							{method === "POST" ? (
								<Button
									type="submit"
									variant="contained"
									size="large"
									color="secondary"
									className="mt-5 mb-4">
									Create
								</Button>
							) : (
								<Button
									type="submit"
									variant="contained"
									size="large"
									color="secondary"
									className="mb-4 mt-5">
									Update
								</Button>
							)}
						</Grid>
                        </Grid>
					</form>
				</div>
			</Paper>
            </Grid>
		</Container>
    )
}
