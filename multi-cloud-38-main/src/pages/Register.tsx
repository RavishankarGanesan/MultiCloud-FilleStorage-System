
import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function Register() {
  return (
    <AuthLayout 
      title="Create an account" 
      description="Fill out the form below to create your account"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
