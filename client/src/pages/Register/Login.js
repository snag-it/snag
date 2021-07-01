import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { LocalDiningOutlined } from '@material-ui/icons';
import { useParams, useHistory } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        SnagIt
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/002/194/883/original/3d-shopping-online-store-for-sale-mobile-e-commerce-3d-pink-pastel-background-shop-online-on-mobile-app-24-hours-shopping-cart-credit-card-minimal-shopping-online-store-device-3d-rendering-vector.jpg)',

    // serve image in backend;

    //localhost 3000, and serve in the backend;
    //img tag on doc, sends get request to url, and express.static servse it;
    backgroundImage: 'url(http://localhost:3001/img/LOGO2.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin:'0px',
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
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
  link: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

export default function SignInSide() {
  const classes = useStyles();
  let history = useHistory();

  const handleSubmit = () => {
    history.push('/home');
  }

  const handleSignUp = () => {
    console.log('hi');
    history.push('/signup');
  };

  const googleOAUTH = () => {
    // const requestOptions = {
    //   method: 'GET',
    //   headers: {'Content-Type': 'appliction/json'},
    //   body: JSON.stringify({username, password}),
    // };

    // fetch('/google', requestOptions)
    // .then(res => console.log(res))
    // .catch(err => console.log(err));

    console.log('hi')
  }

  const facebookOAUTH = () => {
    console.log('oh')
  }
  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>

        <img src="http://localhost:3001/img/logo.png"/>

          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component='h1' variant='h5'>
            Login
          </Typography>

          <form
            className={classes.form}
            method='POST'
            action='/login'
            required
          >
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />

            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />

            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />

            <Button onClick={handleSubmit}
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Login
            </Button>

            {/* <Button onClick={googleOAUTH}
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Login with Google
            </Button> */}

            <a href="/auth/google/" fullWidth variant='contained' color='primary' className={classes.link}>
            <i className="fab fa-google"></i>Login with Google</a>
            
            <br></br>

            <a href="/auth/facebook" fullWidth variant='contained' color='primary' className={classes.link}>
            <i className="fab fa-facebook"></i>Login with Facebook</a>

            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={handleSignUp}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
