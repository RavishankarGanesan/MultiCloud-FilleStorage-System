
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <AuthLayout 
      title="Sign in to your account" 
      description="Enter your credentials to access your account"
    >
      <LoginForm />
    </AuthLayout>
  );
}
