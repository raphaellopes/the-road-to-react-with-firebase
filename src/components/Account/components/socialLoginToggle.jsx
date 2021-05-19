import React from 'react';

import { Button } from '../../shared';

const SocialLoginToggle = ({
  isEnabled, onlyOneLeft, onUnlink, onLink, signInMethod, loading
}) => {
  const renderLoading = (
    <p className="text-center text-gray-900 w-full">Loading...</p>
  );

  return loading ? renderLoading : (
    <Button
      onClick={() => isEnabled ? onUnlink(signInMethod.id) : onLink(signInMethod.provider)}
      disabled={isEnabled && onlyOneLeft}
    >
      {isEnabled ? 'Deactivate' : 'Link'}{' '}{signInMethod.id}
    </Button>
  );
}

export default SocialLoginToggle;
