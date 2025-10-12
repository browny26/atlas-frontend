import AuthLayout from "../../layout/AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <div className="relative">
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </div>
  );
}
