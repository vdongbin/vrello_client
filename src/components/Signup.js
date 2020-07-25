import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup, cleanError } from '../actions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Vrello '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Signup = ({ auth, dispatch }) => {
  const classes = useStyles();
  const history = useHistory();

  const [inputState, setInputState] = useState({
    email: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    if (auth.error) {
      alert('이미 존재하는 회원입니다.');
      dispatch(cleanError());
    }
  }, [auth.error]);

  const handleSubmit = () => {
    const { email, username, password } = inputState;

    if (email.length === 0) {
      return alert('이메일을 입력해주세요.');
    }
    if (username.length === 0) {
      return alert('유저네임을 입력해주세요.');
    }
    if (password.length === 0) {
      return alert('비밀번호를 입력해주세요.');
    }

    dispatch(signup(inputState, history));
  };

  const handleChange = (e) => {
    setInputState({
      ...inputState,
      [e.target.id]: e.target.value
    });
  };

  return auth.isAuthenticated ? (
    <Redirect to="/"></Redirect>
  ) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoComplete="username"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            SIGN UP
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {'Do you have already account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Signup);
