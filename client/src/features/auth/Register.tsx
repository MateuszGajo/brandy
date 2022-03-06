import React from "react";
import AuthenticationLayout from "app/layout/Authentication";
import SignupForm from "./components/SignupForm";

const Register = () => {
  return (
    <AuthenticationLayout>
      <SignupForm />
    </AuthenticationLayout>
  );
};

export default Register;
