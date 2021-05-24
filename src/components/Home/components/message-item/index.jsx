import React, { useState } from 'react';
import { TrashIcon, PencilIcon, XIcon, CheckIcon } from '@heroicons/react/outline';

import { Button, ButtonSecondary, Input } from '../../../shared';

const MessageItem = ({ message, onRemoveMessage, onEditMessage, authUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(message.text);

  const isSameAutor = message.userId === authUser.uid;

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
      <CheckIcon className="w-6 h-6" aria-hidden="true" />
    </Button>
  );

  const renderResetButton = editMode && (
    <ButtonSecondary
      className="self-start mr-4"
      onClick={handleToggleEditMode}
      full={false}
    >
      <XIcon className="w-6 h-6" aria-hidden="true" />
    </ButtonSecondary>
  );

  const renderEditButton = !editMode && (
    <Button
      className="self-start"
      onClick={handleToggleEditMode}
      full={false}
    >
      <PencilIcon className="w-6 h-6" aria-hidden="true" />
    </Button>
  );

  const renderRemoveButton = !editMode && (
    <ButtonSecondary
      className="self-start mr-4"
      onClick={() => onRemoveMessage(message.uid)}
      full={false}
    >
      <TrashIcon className="w-6 h-6" aria-hidden="true" />
    </ButtonSecondary>
  );

  const renderActionButtons = isSameAutor && (
    <div className="flex">
      {renderRemoveButton}
      {renderEditButton}
      {renderResetButton}
      {renderSaveButton}
    </div>
  );

  const renderText = !editMode && (
    <p className="flex-1 font-normal">
      <strong className="text-black">
        {isSameAutor ? 'me' : message.user.username }:
      </strong> <br />
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
    <li className="flex py-4 space-x-4">
      {renderText}
      {renderInput}
      {renderActionButtons}
    </li>
  );
}

export default MessageItem;
