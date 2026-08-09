import AuthLayout from "@/app/components/Auth/AuthLayout";
import ForgotPasswordForm from "@/app/components/Auth/ForgotPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your CrossResearch account password.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
