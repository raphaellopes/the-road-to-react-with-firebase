import React, { useEffect, useState, useContext } from 'react';

import { withFirebase } from '../../../Firebase';
import { AuthUserContext } from '../../../Session';
import { Spinner, Input, Button } from '../../../shared';

import MessageItem from '../message-item';

const Messages = ({ firebase }) => {
  const authUser = useContext(AuthUserContext);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    setLoading(true);

    firebase
      .messages()
      .orderByChild('createdAt')
      .on('value', snapshot => {
        const messageObject = snapshot.val();

        if (messageObject) {
          const messageList = Object.keys(messageObject).map(key => ({
            ...messageObject[key],
            uid: key
          }));

          setMessages(messageList);
          setLoading(false);
        } else {
          setLoading(false);
          setMessages(null);
        }
      });

    return function cleanUp() {
      firebase.messages().off();
    }
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    firebase
      .messages()
      .push({
        text,
        userId: authUser.uid,
        createdAt: firebase.serverValue.TIMESTAMP,
      });

      setText('');
  }

  const handleChange = event => setText(event.target.value);

  const handleRemoveMessage = uid => {
    firebase.message(uid).remove();
  };

  const handleEditMessage = (message, text) => {
    firebase
      .message(message.uid)
      .set({
        ...message,
        text,
        editedAt: firebase.serverValue.TIMESTAMP,
      });
  };

  // renders
  const renderForm = (
    <div className="fixed bottom-0 left-0 right-0 bg-white">
      <form
        onSubmit={handleSubmit}
      className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        <Input
          className="flex-1 mr-4 rounded"
          value={text}
          onChange={handleChange}
        />
        <Button type="submit" full={false}>
          Send
        </Button>
      </form>
    </div>
  );

  const renderMessage = message => (
    <MessageItem
      key={message.uid}
      authUser={authUser}
      message={message}
      onRemoveMessage={handleRemoveMessage}
      onEditMessage={handleEditMessage}
    />
  );

  const renderList = messages
    ? (
      <ul className="divide-y divide-gray-100">
        {messages.map(renderMessage)}
      </ul>
    )
    : (
      <p className="font-normal text-center">The are no messages ...</p>
    );

  const renderLoading = loading && <Spinner />;

  return (
    <div className="mb-14">
      {renderLoading}
      {renderList}
      {renderForm}
    </div>
  );
};

export default withFirebase(Messages);
