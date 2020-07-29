import React, { useEffect, useState } from 'react';
import List from './List';
import { connect } from 'react-redux';
import CreateForm from './CreateForm';
import { useHistory } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import {
  dragAndDrop,
  setActiveBoard,
  editBoardTitle,
  deleteBoard
} from '../actions';
import { useParams } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 30px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 30px;
  height: 100%;
  align-items: center;
`;

const DeleteButton = styled(Icon)`
  margin-left: 10px;
  opacity: 0.5;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  border-radius: 3px;
  padding: 5px;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-size: 1.5em;
`;

const Title = styled.h2`
  transition: background 0.3s ease-in;
  &:hover {
    background: #ccc;
  }
  cursor: pointer;
`;

const Board = ({ dispatch, lists, cards, boards }) => {
  const boardId = useParams().boardID;
  const board = boards[boardId];

  const [isEditing, setIsEditing] = useState(false);
  const [boardTitle, setBoardTitle] = useState(board.title);
  const history = useHistory();
  useEffect(() => {
    dispatch(setActiveBoard(boardId));
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    dispatch(
      dragAndDrop(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  const renderEditInput = () => {
    return (
      <form onSubmit={handleFinishEditing}>
        <StyledInput
          type="text"
          value={boardTitle}
          onChange={handleChange}
          autoFocus
          onFocus={handleFocus}
          onBlur={handleFinishEditing}
        />
      </form>
    );
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setBoardTitle(e.target.value);
  };

  const handleFinishEditing = (e) => {
    setIsEditing(false);
    dispatch(editBoardTitle(boardId, boardTitle));
  };

  const handleDeleteBoard = (e) => {
    e.stopPropagation();
    dispatch(deleteBoard(boardId, history));
  };

  const listOrder = board.lists;

  if (!board) {
    return <p>Board not found</p>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isEditing ? (
        <TitleContainer>{renderEditInput()}</TitleContainer>
      ) : (
        <TitleContainer>
          <Title onClick={() => setIsEditing(true)}>{boardTitle}</Title>
          <DeleteButton onClick={handleDeleteBoard}>delete</DeleteButton>
        </TitleContainer>
      )}

      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {(provided) => (
          <ListsContainer {...provided.droppableProps} ref={provided.innerRef}>
            {listOrder.map((listID, index) => {
              const list = lists[listID];
              if (list) {
                const listCards = list.cards.map((cardID) => cards[cardID]);

                return (
                  <List
                    listID={list.id}
                    key={list.id}
                    title={list.title}
                    cards={listCards}
                    index={index}
                  />
                );
              }
            })}
            {provided.placeholder}
            <CreateForm isItList={true} />
          </ListsContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const mapStateToProps = (state) => ({
  lists: state.lists,
  cards: state.cards,
  boards: state.boards
});

export default connect(mapStateToProps)(Board);
