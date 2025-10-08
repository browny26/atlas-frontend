import React from "react";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";
import AuthLayout from "../../layout/AuthPageLayout";

const ResetPassword = () => {
  return (
    <>
      <AuthLayout>
        <ResetPasswordForm />
      </AuthLayout>
    </>
  );
};

export default ResetPassword;
