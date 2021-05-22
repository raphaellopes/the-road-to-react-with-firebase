import React, { useState } from 'react';

import { Button, Input } from '../../../shared';

const MessageItem = ({ message, onRemoveMessage, onEditMessage, authUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(message.text);

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
    setEditText(message.text);
  }

  const handleChangeText = event => {
    setEditText(event.target.value);
  }

  const handleSaveEditText = () => {
    onEditMessage(message, editText);
    setEditMode(false);
  }

  // renders
  const renderSaveButton = editMode && (
    <Button
      className="self-start"
      onClick={handleSaveEditText}
      full={false}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </Button>
  );

  const renderResetButton = editMode && (
    <Button
      className="self-start mr-4"
      onClick={handleToggleEditMode}
      full={false}
      color="red"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </Button>
  );

  const renderEditButton = !editMode && (
    <Button
      className="self-start"
      onClick={handleToggleEditMode}
      full={false}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    </Button>
  );

  const renderRemoveButton = !editMode && (
    <Button
      className="self-start mr-4"
      onClick={() => onRemoveMessage(message.uid)}
      full={false}
      color="red"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </Button>
  );

  const renderActionButtons = authUser.uid === message.userId && (
    <div className="flex">
      {renderRemoveButton}
      {renderEditButton}
      {renderResetButton}
      {renderSaveButton}
    </div>
  );

  const renderText = !editMode && (
    <p className="font-normal flex-1">
      <strong className="text-black">{message.userId}:</strong> <br />
      {message.text} <br />
      {message.editedAt && <span className="text-xs text-gray-400">(Edited)</span>}
    </p>
  );

  const renderInput = editMode && (
    <Input
      value={editText}
      onChange={handleChangeText}
      label="Edit text"
    />
  );

  return (
    <li className="py-4 flex space-x-4">
      {renderText}
      {renderInput}
      {renderActionButtons}
    </li>
  );
}

export default MessageItem;
