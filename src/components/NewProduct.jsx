import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormControl, InputLabel, Paper, Select } from "@material-ui/core";
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
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
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

function NewProduct(props) {
    const classes = useStyles();
	const [formData, setFormData] = useState({});
	const [method, setMethod] = useState("POST");
	const [categories, setCategories] = useState(null);
	const [image, setImage] = useState(null);

	const [errors, setErrors] = useState(null);
	useEffect(() => {
		let productId = props.match.params.id;

		productId &&
			axios(`${process.env.REACT_APP_BACKEND_API}product/${productId}`).then(
				(result) => {
					if (result.data.status === "success") {
						let {
							name,
							price,
							description,
							image: hidden,
							category,
						} = result.data.data;
						setFormData({
							...formData,
							name,
							price,
							description,
							hidden,
							category,
						});
						setMethod("PUT");
					}
				},
			);
	}, []);

	useEffect(() => {
		axios(`${process.env.REACT_APP_BACKEND_API}category`).then((result) => {
			if (result.data.status === "success")
				setCategories(result.data.data.categories);
		});
	}, []);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const userFormSchema = {
		name:
			method === "PUT"
				? Joi.string().min(3).max(100)
				: Joi.string().required().min(3).max(100),
		price:
			method === "PUT"
				? Joi.string().max(10000000).min(0)
				: Joi.number().required().min(0).max(10000000000000),
		description:
			method === "PUT"
				? Joi.string().max(300)
				: Joi.string().required().max(300),
		hidden: Joi.string(),
		category: Joi.string().required(),
	};

	console.log(formData);
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
		let multiFormData = new FormData();
		for (let i in formData) {
			if (i === "price") {
				multiFormData.append(i, formData[i]);
			} else {
				multiFormData.append(i, formData[i]);
			}
		}
		image && multiFormData.append("image", image);
		axios({
			method: method,
			url: `${process.env.REACT_APP_BACKEND_API}${
				method === "PUT" ? "product/" + props.match.params.id : "product"
			}`,
			data: multiFormData,
			headers: {
				"Content-type": "multipart/formdata",
			},
		})
			.then((result) => {
				if (result.data.status === "success") {
					setErrors(null);
					Swal.fire(
						"Success",
						`Product ${
							method === "PUT" ? "updated" : "created"
						} successfully...`,
						"success",
					);
					props.history.goBack();
				} else {
					Swal.fire("Opps", "Something went wrong...", "error");
				}
			})
			.catch((err) => Swal.fire("Opps", "Something went wrong...", "error"));
	};
	const handleUpload = (e) => {
		var fileReader = new FileReader();
		fileReader.readAsDataURL(e.target.files[0]);
		fileReader.onload = function (oFREvent) {
			console.log(oFREvent.target.result);
			setImage(oFREvent.target.result);
		};
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
							<Grid item xs={12} sm={6}>
								<TextField
									name="name"
									variant="outlined"
                                    size="small"
									required
									fullWidth
									placeholder="Product Name"
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
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
                                    size="small"
									fullWidth
									id="lastName"
									placeholder="Price"
									name="price"
									InputLabelProps={{
										shrink: false,
									}}
									value={formData && formData.price}
                                    helperText = {errors &&
                                        errors.find((error) => error.context.key === "price") &&
                                        errors
                                            .filter((error) => error.context.key === "price")
                                            .map((error) => (error.message))}
								/>
							</Grid>

							<Grid item sm={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									multiline
									rows={3}
									id="email"
									placeholder="Product description"
									name="description"
									InputLabelProps={{
										shrink: false,
									}}
									value={formData && formData.description}
                                    helperText = {errors &&
                                        errors.find((error) => error.context.key === "email") &&
                                        errors
                                            .filter((error) => error.context.key === "email")
                                            .map((error) => (error.message))}
								/>
							</Grid>

							<Grid item xs={12} sm={12}>
								<FormControl variant="outlined" fullWidth>
									<Select
                                        size="small"
                                        label="Category"
										native
										fullWidth
										inputProps={{
											name: "category",
											id: "outlined-age-native-simple",
										}}>
										<option aria-label="None"/>
										{categories &&
											categories.map((category) => (
												<option
													selected={formData.category === category._id}
													value={category._id}>
													{category.name}
												</option>
											))}
                                             helperText = {errors &&
                                        errors.find((error) => error.context.key === "category") &&
                                        errors
                                            .filter((error) => error.context.key === "category")
                                            .map((error) => (error.message))}
									</Select>
									
								</FormControl>
							</Grid >
                            <Grid item xs={12} sm={12}>
                            <div className="imagediv">
                            <label className="my-2" htmlFor="icon-button-file">
							<Button
								className={` ${classes.uploadbtn} ${image?classes.hiddencls: ""}`}
								variant="contained"
								component="span">
								<ImageIcon /> &nbsp; Browse
							</Button>
						</label>
						<input
							onChange={handleUpload}
							name="hidden"
							accept="image/*"
							className="d-none"
							id="icon-button-file"
							type="file"
						/>
						{(image || formData.hidden) && (
							<img
								className="productimage"
								src={image ? image : formData["hidden"]}
								alt=""
							/>
						)}
                            </div>
                            </Grid>
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
					</form>
				</div>
			</Paper>
            </Grid>
		</Container>
    )
}
export default NewProduct
