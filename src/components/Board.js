import React, { useEffect } from 'react';
import List from './List';
import { connect } from 'react-redux';
import CreateForm from './CreateForm';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { dragAndDrop, setActiveBoard } from '../actions';
import { useParams } from 'react-router-dom';

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 30px;
`;

const Board = ({ dispatch, lists, cards, boards }) => {
  const boardId = useParams().boardID;

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

  const board = boards[boardId];
  if (!board) {
    return <p>Board not found</p>;
  }

  const listOrder = board.lists;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h2 style={{ marginLeft: '30px' }}>{board.title}</h2>
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
