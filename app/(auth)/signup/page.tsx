import AuthLayout from "@/app/components/Auth/AuthLayout";
import SignupForm from "@/app/components/Auth/SignupForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your CrossResearch account.",
};

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
