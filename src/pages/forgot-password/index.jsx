import React from "react";
import ResetRequestForm from "../../components/auth/ResetRequestForm";
import AuthLayout from "../../layout/AuthPageLayout";

const ForgotPassword = () => {
  return (
    <>
      <AuthLayout>
        <ResetRequestForm />
      </AuthLayout>
    </>
  );
};

export default ForgotPassword;
