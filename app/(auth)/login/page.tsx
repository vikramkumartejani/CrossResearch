import AuthLayout from "@/app/components/Auth/AuthLayout";
import LoginForm from "@/app/components/Auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your CrossResearch account.",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
