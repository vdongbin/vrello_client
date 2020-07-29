import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import EmailIcon from '@material-ui/icons/Email';
import UsernameIcon from '@material-ui/icons/AccountBox';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import UIButton from '@material-ui/core/Button';
import { editProfile, cleanError, deleteAccount } from '../actions';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper
  },
  button: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  circle: {
    display: 'flex',
    height: '500px',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const Mypage = ({ auth, dispatch }) => {
  const [userInfo, setUserInfo] = useState({
    email: auth.userInfo.email,
    username: auth.userInfo.username
  });

  const [editInfo, setEditInfo] = useState({
    email: userInfo.email,
    username: userInfo.username
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (auth.error) {
      const { email, username } = userInfo;
      alert('이미 존재하는 이메일입니다.');
      dispatch(cleanError());
      setEditInfo({
        email,
        username
      });
    }
  }, [auth.error]);

  const classes = useStyles();

  const handleChange = (e) => {
    setEditInfo({
      ...editInfo,
      [e.target.id]: e.target.value
    });
  };

  const closeEditForm = () => {
    setEditInfo({
      email: userInfo.email,
      username: userInfo.username
    });
    setIsEditing(false);
  };

  const submitEditForm = () => {
    const { email, username } = editInfo;
    dispatch(editProfile({ email, username }), () => {
      setUserInfo({
        email,
        username
      });
      setEditInfo({
        email,
        username
      });
    });
    setIsEditing(false);
  };

  const deleteForm = () => {
    const checkDeleteAccount = window.prompt(
      `계정삭제를 원하실 경우, Delete ${userInfo.username} 을 입력하신 뒤 확인 버튼을 눌러주세요.`
    );
    if (checkDeleteAccount === `Delete ${userInfo.username}`) {
      dispatch(deleteAccount());
    } else {
      return;
    }
  };

  return (
    <MypageContainer>
      {auth.loading ? (
        <div className={classes.circle}>
          <CircularProgress size={80} />
        </div>
      ) : (
        <>
          <h2>Mypage</h2>
          <List className={classes.root}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EmailIcon />
                </Avatar>
              </ListItemAvatar>
              {isEditing ? (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="email"
                  id="email"
                  defaultValue={editInfo.email}
                  onChange={handleChange}
                />
              ) : (
                <ListItemText primary={userInfo.email} secondary="email" />
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <UsernameIcon />
                </Avatar>
              </ListItemAvatar>
              {isEditing ? (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="username"
                  id="username"
                  defaultValue={editInfo.username}
                  onChange={handleChange}
                />
              ) : (
                <ListItemText
                  primary={userInfo.username}
                  secondary="username"
                />
              )}
            </ListItem>
          </List>
          <ButtonContainer>
            {isEditing ? (
              <div className={classes.button}>
                <UIButton
                  variant="contained"
                  onClick={submitEditForm}
                  color="primary"
                >
                  Confirm
                </UIButton>
                <UIButton
                  onClick={closeEditForm}
                  variant="contained"
                  color="secondary"
                >
                  Cancel
                </UIButton>
              </div>
            ) : (
              <div className={classes.button}>
                <UIButton
                  variant="contained"
                  color="primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Userinfo
                </UIButton>
                <UIButton
                  variant="contained"
                  color="secondary"
                  onClick={deleteForm}
                >
                  Delete Account
                </UIButton>
              </div>
            )}
          </ButtonContainer>
        </>
      )}
    </MypageContainer>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Mypage);
