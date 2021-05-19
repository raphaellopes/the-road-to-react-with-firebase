import React from 'react';

import SignUpForm from './components/form';
import SignUpLink from './components/link';

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUp;
export { SignUpForm, SignUpLink };
