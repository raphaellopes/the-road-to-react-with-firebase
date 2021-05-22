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
    <li key={message.uid} className="p-4 flex space-x-4">
      <p className="font-normal">
        <strong className="text-black">{message.userId}:</strong> {message.text}
      </p>
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
