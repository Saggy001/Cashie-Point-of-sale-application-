import React ,{ useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Joi from 'joi-browser';
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      width: '60px',
      height: '60px',
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


function LoginScreen(props) {
    const classes = useStyles();
    const [errors, setErrors] = useState([]);
    let [formData, setFormData] = useState({});

    const formSchema = {
      username: Joi.string().required().min(8).max(30),
      password: Joi.string().required().min(8).max(30),
    };

    const handleChange =(e)=>{
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
      let validationresult = Joi.validate(formData, formSchema);

      if(validationresult.error){ 
        setErrors(validationresult.error.details);
        return;
      }

      async function loginUser(){
        let result = await fetch(`${process.env.REACT_APP_BACKEND_API}auth/login`,{
          method : "POST",
          body : JSON.stringify(formData),
          headers:{
            "Content-type" : "application/json",
          },
        },
        );
        let data = await result.json();
        if (data.status === "success") {
          setErrors([]);
          localStorage.setItem("token", data.token);
          props.history.push("/dashboard/main");
        } else {
          setErrors([{ message: "Authentication failed" }]);
        }
      }
      loginUser();
    }

    return (
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            {errors.length > 0 &&
						errors.map((error) => (
							<Alert className="mt-4" severity="error">{error.message}</Alert>
						))}

            <form onSubmit={handleSubmit} onChange={handleChange} className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="username"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    );
}

export default LoginScreen
