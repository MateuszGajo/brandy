import React from "react";
import SigninForm from "../components/SigninForm";
import AuthenticationLayout from "app/layout/Authentication";

const Register = () => {
  return (
    <AuthenticationLayout>
      <SigninForm />
    </AuthenticationLayout>
  );
};

export default Register;
