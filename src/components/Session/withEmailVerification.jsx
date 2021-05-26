import React, { useContext, useState } from 'react';

import { withFirebase } from '../Firebase';
import AuthUserContext from './context';
import { Container, HeaderContainer, Content, Button } from '../shared';

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
    const renderMessage = (
      <>
        <HeaderContainer>
          Confirm your E-Mail
        </HeaderContainer>
        <Container>
          <Content>
            {isSent ? (
              <p className="font-extrabold text-center text-gray-900">
                E-Mail confirmation sent: Check your E-Mails (spam folder inclided) for a
                confirmation E-Mail. Refresh this page once you confirmed your E-Mail.
              </p>
            ) : (
              <div>
                <p className="mb-6 font-extrabold text-center text-gray-900">
                  Verify your E-Mail: Check your E-Mails (spam folder included) for a
                  confirmation E-Mail or send another confirmation E-Mail.
                </p>
                <Button
                  onClick={handleSendEmailVerification}
                >
                  Send confirmation
                </Button>
              </div>
            )}
          </Content>
        </Container>
      </>
    );

    return needsEmailVerification(authUser) ? renderMessage : <Component {...props} />
  };
  return withFirebase(WithEmailVerification);
}

export default withEmailVerification;
