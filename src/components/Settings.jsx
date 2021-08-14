import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormHelperText, InputAdornment, InputLabel, OutlinedInput, Paper} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Joi from "joi-browser";
import axios from "axios";
import Swal from "sweetalert2";

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

export default function Settings(props) {
    const classes = useStyles();
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState(null);

    useEffect(() => {
		axios(`${process.env.REACT_APP_BACKEND_API}setting`).then(
				(result) => {
					if (result.data.status === "success") {
						let {
							name,
                            discount,
                            tax,
                            _id,
						} = result.data.data;
						setFormData({
							...formData,
							name,
                            discount,
                            tax,
                            _id,
						});
					}
				},
			);
	}, []);


    const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
	};

	const userFormSchema = {
		name: Joi.string().required().min(3).max(100),
		discount: Joi.number().required().min(0).max(100),
		tax: Joi.number().required().min(0).max(100),
        _id: Joi.required(),
	};

    const handleSubmit = (e) => {
		e.preventDefault();

		let validation = Joi.validate(formData, userFormSchema, {
			abortEarly: false,
		});
		if (validation.error) {
            console.log(validation.error.details);
			setErrors(validation.error.details);
			return;
		}
		axios({
			method: "PUT",
			url: `${process.env.REACT_APP_BACKEND_API}${
				"setting/" + formData._id}`,
			data: formData,
		})
			.then((result) => {
				if (result.data.status === "success") {
					setErrors(null);
					Swal.fire(
						"Success",
						`Settings updated successfully...`,
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
                            <ArrowBackIcon onClick={() => props.history.goBack()} className="backbtnproduct"/>
			                <p className="productformhead" >&nbsp;&nbsp;&nbsp;Update Store Setting</p>
                        </div>
                    <form
						onSubmit={handleSubmit}
						onChange={handleChange}
						className={classes.form}
						noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12}>
                            <FormHelperText className="mb-1 ms-1" id="outlined-name-helper-text">Store Name</FormHelperText>
								<TextField
									name="name"
									variant="outlined"
									required
									fullWidth
                                    aria-describedby="outlined-name-helper-text"
									InputLabelProps={{
										shrink: false,
									}}
									value={formData && formData.name}
                                    helperText = {errors &&
                                        errors.find((error) => error.context.key === "name") &&
                                        errors
                                            .filter((error) => error.context.key === "name")
                                            .map((error) => (error.message))}/>
							</Grid>
							<Grid item xs={12} sm={12}>
                            <FormHelperText className="mb-1 ms-1" id="outlined-discount-helper-text">Discount</FormHelperText>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    value={formData && formData.discount}
                                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                    aria-describedby="outlined-discount-helper-text"
                                    InputLabelProps={{
										shrink: false,
									}}
                                    fullWidth
                                    required                                    
                                    name="discount"
                                    labelWidth={0}
                                    helperText = {errors &&
                                        errors.find((error) => error.context.key === "discount") &&
                                        errors
                                            .filter((error) => error.context.key === "discount")
                                            .map((error) => (error.message))}/>
							</Grid>

							<Grid item xs={12} sm={12}>
                            <FormHelperText className="mb-1 ms-1" id="outlined-tax-helper-text">Tax</FormHelperText>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    value={formData && formData.tax}
                                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                    aria-describedby="outlined-tax-helper-text"
                                    InputLabelProps={{
										shrink: false,
									}}
                                    fullWidth
                                    required                                    
                                    name="tax"
                                    labelWidth={0}
                                    helperText = {errors &&
                                        errors.find((error) => error.context.key === "tax") &&
                                        errors
                                            .filter((error) => error.context.key === "tax")
                                            .map((error) => (error.message))}/>
							</Grid>
						
						<Grid container justifyContent="center">
								<Button
									type="submit"
									variant="contained"
									size="large"
									color="secondary"
									className="mb-4 mt-5">
									Update
								</Button>
						</Grid>
                    </Grid>
				    </form>
				    </div>
			    </Paper>
            </Grid>
		</Container>
    )
}
