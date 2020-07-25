import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBoard, getData } from '../actions';
import styled from 'styled-components';
import BoardThumbnail from './BoardThumbnail';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '500px',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const Thumbnails = styled.div`
  flex: 1;
  height: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const CreateTitle = styled.h3`
  font-size: 48px;
  color: #3f51b5;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
`;

const CreateInput = styled.input`
  width: 400px;
  height: 80px;
  font-size: 22px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 3px;
  border: none;
  box-shadow: 0 2px 4px grey;
  align-self: center;,
`;

const Home = ({ auth, boards, boardArrays, dispatch, loading }) => {
  const [newBoardTitle, setNewBoardTitle] = useState('');
  useEffect(() => {
    if (auth.data) {
      return;
    }
    dispatch(getData());
  }, []);

  const classes = useStyles();

  const handleChange = (e) => {
    setNewBoardTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBoard(newBoardTitle));
    setNewBoardTitle('');
  };

  const renderBoards = () => {
    return boardArrays.map((boardID) => {
      const board = boards[boardID];
      return (
        <Link
          key={boardID}
          to={`/board/${board.id}`}
          style={{ textDecoration: 'none' }}
        >
          <BoardThumbnail {...board} />
        </Link>
      );
    });
  };

  const renderCreateBoard = () => {
    return (
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <CreateTitle>Create new board</CreateTitle>
        <CreateInput
          onChange={handleChange}
          value={newBoardTitle}
          placeholder="Your boards title..."
          type="text"
        />
      </form>
    );
  };

  return (
    <HomeContainer>
      {loading ? (
        <div className={classes.root}>
          <CircularProgress size={80} />
        </div>
      ) : (
        <>
          <Thumbnails>{renderBoards()}</Thumbnails>
          {renderCreateBoard()}
        </>
      )}
    </HomeContainer>
  );
};

const mapStateToProps = (state) => ({
  boards: state.boards,
  boardArrays: state.boardArrays,
  auth: state.auth,
  loading: state.loading
});

export default connect(mapStateToProps)(Home);
