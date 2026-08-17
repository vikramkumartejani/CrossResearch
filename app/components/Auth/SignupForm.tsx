"use client";

import { useEffect, useState } from "react";
import Image from '@/lib/CldImage';
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import CustomCheckbox from "./CustomCheckbox";
import OtpBoxes from "./OtpBoxes";
import { authErrorMessage } from "@/lib/authUi";
import { postAuthPath } from "@/lib/authRedirect";
import LoadingLabel from "../LoadingLabel";

export default function SignupForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [fullName, setFullName] = useState("");
  const [tradingViewUsername, setTradingViewUsername] = useState("");
  const [noTradingView, setNoTradingView] = useState(false);
  const [email, setEmail] = useState(() => searchParams.get("email")?.trim() || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [referralCode, setReferralCode] = useState(() => searchParams.get("ref")?.trim() || "");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  // Prefill from the ?ref= landing cookie if the user arrived via an affiliate link
  useEffect(() => {
    if (referralCode) return;
    const match = document.cookie.match(/(?:^|;\s*)cr_ref=([^;]+)/);
    if (match) setReferralCode(decodeURIComponent(match[1]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Please agree to the Terms & Privacy to continue.");
      return;
    }
    if (!fullName.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!noTradingView && !tradingViewUsername.trim()) {
      toast.error("Enter your TradingView username, or check that you don't have one.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          full_name: fullName.trim(),
          email,
          password,
          tradingview_username: noTradingView ? null : tradingViewUsername.trim(),
          ...(referralCode.trim() ? { ref: referralCode.trim().toLowerCase() } : {}),
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(authErrorMessage(body, "Signup failed"));
      }
      if (body.needs_verification) {
        toast.success(body.message || "Check your email for a verification code.");
        setStep("otp");
        return;
      }
      toast.success(body.message || "Account created.");
      window.location.assign(postAuthPath(body.user, searchParams.get("next")));
      return;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp.trim())) {
      toast.error("Enter the 6-digit code from your email.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, code: otp.trim(), purpose: "signup" }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(authErrorMessage(body, "Verification failed"));
      }
      toast.success(body.message || "Email verified.");
      window.location.assign(postAuthPath(body.user, searchParams.get("next")));
      return;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, purpose: "signup" }),
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
    <div className="flex flex-col justify-center h-full w-full py-8 sm:py-10" style={{ fontFamily: 'var(--font-dm-sans), Arial, sans-serif' }}>
      <div className="mb-6 sm:mb-10">
        <Image src="/assets/logo.svg" alt="CrossResearch" width={52} height={44} priority />
      </div>

      {step === "otp" ? (
        <>
          <h1 className="text-white text-[28px] sm:text-[40px] font-medium leading-10 sm:leading-[56px] mb-3">
            Verify your email
          </h1>
          <p className="text-white/60 text-[16px] sm:text-[18px] leading-[22px] sm:leading-[29px] font-normal mb-6 sm:mb-10">
            We sent a 6-digit code to <span className="text-white">{email}</span>
          </p>

          <form onSubmit={handleVerify} className="flex flex-col gap-5">
            <OtpBoxes value={otp} onChange={setOtp} disabled={loading} />
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full h-[52px] sm:h-[62px] rounded-[40px] bg-[#88C4FF] text-black font-bold text-[16px] leading-[26px] hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60"
            >
              <LoadingLabel loading={loading}>Verify & continue</LoadingLabel>
            </button>
          </form>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
            <button
              type="button"
              onClick={() => setStep("form")}
              className="text-white/60 text-[15px] hover:text-white transition-colors"
            >
              Edit details
            </button>
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="text-white font-semibold text-[15px] underline underline-offset-2 hover:text-white/90 transition-colors disabled:opacity-50"
            >
              {resending ? "Sending…" : "Resend code"}
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-white text-[28px] sm:text-[40px] font-medium leading-10 sm:leading-[56px] mb-3">
            Get Started Now
          </h1>
          <p className="text-white/60 text-[16px] sm:text-[18px] leading-[22px] sm:leading-[29px] font-normal mb-6 sm:mb-10">
            Enter your credentials to access your account
          </p>

          <div className="flex sm:flex-row flex-col gap-4 mb-8 sm:mb-10">
            <button
              type="button"
              className="sm:flex-1 h-[52px] sm:h-[69px] flex items-center justify-center gap-3 rounded-[48px] border border-[#FFFFFF1A] bg-[#FFFFFF08] text-white/70 text-[18px] leading-[29px] cursor-pointer hover:bg-white/10 transition-colors"
            >
              Sign Up with google
            </button>
            <button
              type="button"
              className="sm:flex-1 h-[52px] sm:h-[69px] flex items-center justify-center gap-3 rounded-[48px] border border-[#FFFFFF1A] bg-[#FFFFFF08] text-white/70 text-[18px] leading-[29px] cursor-pointer hover:bg-white/10 transition-colors"
            >
              Sign Up with apple
            </button>
          </div>

          <div className="flex items-center gap-[9.5px] mb-8 sm:mb-10">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/50 text-[16px] leading-6 font-normal whitespace-nowrap">
              or continue with email
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="relative mb-5">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
                required
                className="bg-[#151B29] border border-[#FFFFFF0D] rounded-full h-[52px] sm:h-[69px] px-6 text-white placeholder:text-white/60 text-[16px] sm:text-[18px] leading-[29px] font-normal outline-none w-full focus:border-white/25 transition-colors"
              />
            </div>

            <div className="mb-5">
              <input
                type="text"
                placeholder="TradingView username"
                value={tradingViewUsername}
                onChange={(e) => setTradingViewUsername(e.target.value)}
                disabled={noTradingView}
                autoComplete="off"
                className="bg-[#151B29] border border-[#FFFFFF0D] rounded-full h-[52px] sm:h-[69px] px-6 text-white placeholder:text-white/60 text-[16px] sm:text-[18px] leading-[29px] font-normal outline-none w-full focus:border-white/25 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              />
              <label className="mt-3 flex items-center gap-1.5 cursor-pointer select-none px-1">
                <CustomCheckbox
                  checked={noTradingView}
                  onChange={(checked) => {
                    setNoTradingView(checked);
                    if (checked) setTradingViewUsername("");
                  }}
                />
                <span className="text-white/60 text-[14px] sm:text-[16px] leading-[22px] sm:leading-[29px] font-normal">
                  I don't have a TradingView username
                </span>
              </label>
            </div>

            <div className="relative mb-5">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#151B29] border border-[#FFFFFF0D] rounded-full h-[52px] sm:h-[69px] px-6 text-white placeholder:text-white/60 text-[16px] sm:text-[18px] leading-[29px] font-normal outline-none w-full focus:border-white/25 transition-colors"
              />
            </div>

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="bg-[#151B29] border border-[#FFFFFF0D] rounded-full h-[52px] sm:h-[69px] px-6 pr-14 text-white placeholder:text-white/60 text-[16px] sm:text-[18px] leading-[29px] font-normal outline-none w-full focus:border-white/25 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white/50 text-[13px] hover:text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="relative mb-5">
              <input
                type="text"
                placeholder="Referral code (optional)"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                autoComplete="off"
                className="bg-[#151B29] border border-[#FFFFFF0D] rounded-full h-[52px] sm:h-[69px] px-6 text-white placeholder:text-white/60 text-[16px] sm:text-[18px] leading-[29px] font-normal outline-none w-full focus:border-white/25 transition-colors"
              />
            </div>

            <label className="mb-4 flex items-center gap-1.5 cursor-pointer select-none">
              <CustomCheckbox checked={agreed} onChange={setAgreed} />
              <span className="text-white/60 text-[16px] sm:text-[18px] leading-[22px] sm:leading-[29px] font-normal">I agree to the</span>
              <Link href="/terms" className="underline underline-offset-2 hover:text-white/90 transition-colors">
                Terms &amp; Privacy
              </Link>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] sm:h-[62px] rounded-[40px] bg-[#88C4FF] text-black font-bold text-[16px] leading-[26px] hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60"
            >
              <LoadingLabel loading={loading}>Sign Up</LoadingLabel>
            </button>
          </form>

          <p className="text-white/60 text-[16px] sm:text-[18px] leading-[22px] sm:leading-[29px] font-normal text-center mt-8 sm:mt-10">
            Already have an account?{" "}
            <Link href="/login" className="text-white font-semibold underline underline-offset-2 hover:text-white/90 transition-colors">
              Log In
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
