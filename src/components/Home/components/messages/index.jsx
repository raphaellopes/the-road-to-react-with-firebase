import React, { useEffect, useState, useContext } from 'react';

import { withFirebase } from '../../../Firebase';
import { AuthUserContext } from '../../../Session';
import { Spinner, Input, Button } from '../../../shared';

const Messages = ({ firebase }) => {
  const authUser = useContext(AuthUserContext);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    setLoading(true);

    firebase.messages().on('value', snapshot => {
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
      });

      setText('');
  }

  const handleChange = event => setText(event.target.value);

  const handleRemoveMessage = uid => {
    firebase.message(uid).remove();
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
    <li key={message.uid} className="py-4 flex space-x-4">
      <p className="font-normal flex-1">
        <strong className="text-black">{message.userId}:</strong> <br />
        {message.text}
      </p>
      <Button
        className="self-start"
        onClick={() => handleRemoveMessage(message.uid)}
        full={false}
        color="red"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </Button>
    </li>
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
