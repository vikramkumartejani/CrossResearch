import { Suspense } from "react";
import AuthLayout from "@/app/components/Auth/AuthLayout";
import AffiliateSignupForm from "@/app/components/Auth/AffiliateSignupForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Sign Up",
  description: "Apply for the CrossResearch affiliate program.",
};

export default function AffiliateSignupPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="text-white/50">Loading…</div>}>
        <AffiliateSignupForm />
      </Suspense>
    </AuthLayout>
  );
}
