import React from "react";
import SigninForm from "./components/SigninForm";
import AuthenticationLayout from "app/layout/Authentication";

const Login = () => {
  return (
    <AuthenticationLayout>
      <SigninForm />
    </AuthenticationLayout>
  );
};

export default Login;
