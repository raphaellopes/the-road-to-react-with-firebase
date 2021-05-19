import React from 'react';

import { Button } from '../../shared';

const SocialLoginToggle = ({ isEnabled, onlyOneLeft, onUnlink, onLink, signInMethod }) => {
  return (
    <Button
      onClick={() => isEnabled ? onUnlink(signInMethod.id) : onLink(signInMethod.provider)}
      disabled={isEnabled && onlyOneLeft}
    >
      {isEnabled ? 'Deactivate' : 'Link'}{' '}{signInMethod.id}
    </Button>
  );
}

export default SocialLoginToggle;
