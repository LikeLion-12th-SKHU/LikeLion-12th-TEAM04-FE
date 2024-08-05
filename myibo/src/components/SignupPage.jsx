import React from 'react';
import { useSelector } from 'react-redux';
import FirstSignupForm from './FirstSignupForm';
import SecondSignupForm from './SecondSignupForm';

const SignupPage = () => {
  const firstAuthCompleted = useSelector((state) => state.signup.firstAuthCompleted);

  return (
    <div>
      {!firstAuthCompleted ? <FirstSignupForm /> : <SecondSignupForm />}
    </div>
  );
};

export default SignupPage;
