import React, { useState } from 'react';
import Button from './Button';
import { connect } from 'react-redux';
import { addList, addCard } from '../actions';
import TextAreaForm from './TextAreaForm';
import OpenForm from './OpenForm';

const CreateForm = ({ isItList, dispatch, listID }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [textState, setTextState] = useState('');

  const openForm = () => {
    setFormOpen(true);
  };

  const closeForm = (e) => {
    setFormOpen(false);
  };

  const handleInputChange = (e) => {
    setTextState(e.target.value);
  };

  const handleAddList = () => {
    if (textState) {
      setTextState('');
      dispatch(addList(textState));
    }
    return;
  };

  const handleAddCard = () => {
    if (textState) {
      setTextState('');
      dispatch(addCard(listID, textState));
    }
    return;
  };

  return formOpen ? (
    <TextAreaForm
      text={textState}
      onChange={handleInputChange}
      closeForm={closeForm}
      isItList={isItList}
    >
      <Button onClick={isItList ? handleAddList : handleAddCard}>
        {isItList ? 'Add List' : 'Add Card'}
      </Button>
    </TextAreaForm>
  ) : (
    <OpenForm isItList={isItList} onClick={openForm}>
      {isItList ? 'Add list' : 'Add card'}
    </OpenForm>
  );
};

export default connect()(CreateForm);
