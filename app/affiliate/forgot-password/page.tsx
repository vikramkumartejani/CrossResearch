import AuthLayout from "@/app/components/Auth/AuthLayout";
import ForgotPasswordForm from "@/app/components/Auth/ForgotPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Forgot Password",
  description: "Reset your CrossResearch affiliate partner password.",
  robots: { index: false, follow: false },
};

export default function AffiliateForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm accountType="affiliate" />
    </AuthLayout>
  );
}
