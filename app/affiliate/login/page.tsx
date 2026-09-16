import { Suspense } from "react";
import AuthLayout from "@/app/components/Auth/AuthLayout";
import LoginForm from "@/app/components/Auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Partner Log In",
  description: "Log in to your CrossResearch affiliate partner account.",
  robots: { index: false, follow: false },
};

export default function AffiliateLoginPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="text-white/50">Loading…</div>}>
        <LoginForm accountType="affiliate" />
      </Suspense>
    </AuthLayout>
  );
}
