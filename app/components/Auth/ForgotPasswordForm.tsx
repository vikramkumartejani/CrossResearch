"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authErrorMessage } from "@/lib/authUi";
import OtpBoxes from "./OtpBoxes";
import LoadingLabel from "../LoadingLabel";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const requestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(authErrorMessage(body, "Could not send reset code"));
      }
      toast.success(body.message || "If that email exists, a code was sent.");
      setStep("reset");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send reset code");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp.trim())) {
      toast.error("Enter the 6-digit code from your email.");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code: otp.trim(),
          new_password: password,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(authErrorMessage(body, "Could not reset password"));
      }
      toast.success(body.message || "Password updated.");
      router.replace("/login");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not reset password");
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    try {
      setResending(true);
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, purpose: "reset" }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(authErrorMessage(body, "Could not resend code"));
      }
      toast.success(body.message || "Code resent.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not resend code");
    } finally {
      setResending(false);
    }
  };

  return (
    <div
      className="flex flex-col justify-center h-full w-full py-8 sm:py-10"
      style={{ fontFamily: "var(--font-dm-sans), Arial, sans-serif" }}
    >
      <div className="mb-6 sm:mb-10">
        <Image src="/assets/logo.svg" alt="CrossResearch" width={52} height={44} priority />
      </div>

      <h1 className="text-white text-[28px] sm:text-[40px] font-medium leading-10 sm:leading-[56px] mb-3">
        {step === "email" ? "Forgot password" : "Reset password"}
      </h1>
      <p className="text-white/60 text-[16px] sm:text-[18px] leading-[22px] sm:leading-[29px] font-normal mb-6 sm:mb-10">
        {step === "email"
          ? "Enter your account email and we'll send a reset code."
          : `Enter the code sent to ${email} and choose a new password.`}
      </p>

      {step === "email" ? (
        <form onSubmit={requestCode} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#151B29] border border-[#FFFFFF0D] rounded-full h-[52px] sm:h-[69px] px-6 text-white placeholder:text-white/60 text-[16px] sm:text-[18px] outline-none w-full focus:border-white/25 transition-colors mb-5"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[52px] sm:h-[62px] rounded-[40px] bg-[#88C4FF] text-black font-bold text-[16px] hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60"
          >
            <LoadingLabel loading={loading}>Send reset code</LoadingLabel>
          </button>
        </form>
      ) : (
        <form onSubmit={resetPassword} className="flex flex-col gap-5">
          <OtpBoxes value={otp} onChange={setOtp} disabled={loading} />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="bg-[#151B29] border border-[#FFFFFF0D] rounded-full h-[52px] sm:h-[69px] px-6 pr-14 text-white placeholder:text-white/60 text-[16px] sm:text-[18px] outline-none w-full focus:border-white/25 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-white/50 text-[13px] hover:text-white"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={8}
            className="bg-[#151B29] border border-[#FFFFFF0D] rounded-full h-[52px] sm:h-[69px] px-6 text-white placeholder:text-white/60 text-[16px] sm:text-[18px] outline-none w-full focus:border-white/25 transition-colors"
          />
          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full h-[52px] sm:h-[62px] rounded-[40px] bg-[#88C4FF] text-black font-bold text-[16px] hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60"
          >
            <LoadingLabel loading={loading}>Update password</LoadingLabel>
          </button>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep("email")}
              className="text-white/60 text-[15px] hover:text-white"
            >
              Change email
            </button>
            <button
              type="button"
              onClick={resend}
              disabled={resending}
              className="text-white font-semibold text-[15px] underline underline-offset-2 disabled:opacity-50"
            >
              {resending ? "Sending…" : "Resend code"}
            </button>
          </div>
        </form>
      )}

      <p className="text-white/60 text-[16px] sm:text-[18px] text-center mt-8 sm:mt-10">
        Remembered it?{" "}
        <Link href="/login" className="text-white font-semibold underline underline-offset-2">
          Log In
        </Link>
      </p>
    </div>
  );
}
