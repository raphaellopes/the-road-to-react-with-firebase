import React, { useContext, useState } from 'react';

import { withFirebase } from '../Firebase';
import AuthUserContext from './context';

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData.map(({ providerId }) => providerId).includes('password')

const withEmailVerification = Component => {
  const WithEmailVerification = props => {
    const [isSent, setIsSent] = useState(false);
    const authUser = useContext(AuthUserContext);

    const handleSendEmailVerification = () => {
      props.firebase.sendEmailVerification()
        .then(() => setIsSent(true));
    }

    // renders
    const renderMessage = isSent ? (
      <p className="text-center font-extrabold text-gray-900">
        E-Mail confirmation sent: Check your E-Mails (spam folder inclided) for a
        confirmation E-Mail. Refresh this page once you confirmed your E-Mail.
      </p>
    ) : (
      <div>
        <p className="text-center font-extrabold text-gray-900">
          Verify your E-Mail: Check your E-Mails (spam folder included) for a
          confirmation E-Mail or send another confirmation E-Mail.
        </p>
        <button
          type="button"
          onClick={handleSendEmailVerification}
          disabled={isSent}
          className={`${isSent ? 'disabled:opacity-50' : ''} group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}>
          Send confirmation
        </button>
      </div>
    );

    return needsEmailVerification(authUser) ? renderMessage : <Component {...props} />
  };
  return withFirebase(WithEmailVerification);
}

export default withEmailVerification;
