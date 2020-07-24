import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBoard } from '../actions';
import styled from 'styled-components';
import BoardThumbnail from './BoardThumbnail';

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
  color: white;
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
  outline-color: blue;
  box-shadow: 0 2px 4px grey;
  align-self: center;
`;

const Home = ({ auth, boards, boardArrays, dispatch }) => {
  const [newBoardTitle, setNewBoardTitle] = useState('');

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
      console.log(board);
      return (
        <Link
          key={boardID}
          to={`/${board.id}`}
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
        <CreateTitle>Create a new Board</CreateTitle>
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
      <Thumbnails>{renderBoards()}</Thumbnails>
      {renderCreateBoard()}
    </HomeContainer>
  );
};

const mapStateToProps = (state) => ({
  boards: state.boards,
  boardArrays: state.boardArrays,
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
