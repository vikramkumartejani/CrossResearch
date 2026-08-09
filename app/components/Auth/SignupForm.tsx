"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CustomCheckbox from "./CustomCheckbox";
import { authErrorMessage } from "@/lib/authUi";
import { postAuthPath } from "@/lib/authRedirect";

export default function SignupForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [tradingViewUsername, setTradingViewUsername] = useState("");
  const [noTradingView, setNoTradingView] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

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
        body: JSON.stringify({
          full_name: fullName.trim(),
          email,
          password,
          tradingview_username: noTradingView ? null : tradingViewUsername.trim(),
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(authErrorMessage(body, "Signup failed"));
      }
      toast.success(body.message || "Account created.");
      router.replace(postAuthPath(body.user));
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center h-full w-full py-8 sm:py-10" style={{ fontFamily: 'var(--font-dm-sans), Arial, sans-serif' }}>
      {/* Logo */}
      <div className="mb-6 sm:mb-10">
        <Image
          src="/assets/logo.svg"
          alt="CrossResearch"
          width={52}
          height={44}
          priority
        />
      </div>

      {/* Heading */}
      <h1 className="text-white text-[28px] sm:text-[40px] font-medium leading-10 sm:leading-[56px] mb-3">
        Get Started Now
      </h1>
      <p className="text-white/60 text-[16px] sm:text-[18px] leading-[22px] sm:leading-[29px] font-normal mb-6 sm:mb-10">
        Enter your credentials to access your account
      </p>

      {/* Social buttons */}
      <div className="flex sm:flex-row flex-col gap-4 mb-8 sm:mb-10">
        <button
          type="button"
          className="sm:flex-1 h-[52px] sm:h-[69px] flex items-center justify-center gap-3 rounded-[48px] border border-[#FFFFFF1A] bg-[#FFFFFF08] text-white/70 text-[18px] leading-[29px] cursor-pointer hover:bg-white/10 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.7666 9.6498H22.8V9.6H12V14.4H18.7818C17.7924 17.1942 15.1338 19.2 12 19.2C8.0238 19.2 4.8 15.9762 4.8 12C4.8 8.0238 8.0238 4.8 12 4.8C13.8354 4.8 15.5052 5.4924 16.7766 6.6234L20.1708 3.2292C18.0276 1.2318 15.1608 0 12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 11.1954 23.9172 10.41 23.7666 9.6498Z" fill="#FFC107" />
            <path d="M1.39062 6.4146L5.33323 9.306C6.40003 6.6648 8.98363 4.8 12.007 4.8C13.8424 4.8 15.5122 5.4924 16.7836 6.6234L20.1778 3.2292C18.0346 1.2318 15.1678 0 12.007 0C7.39783 0 3.40063 2.6022 1.39062 6.4146Z" fill="#FF3D00" />
            <path d="M11.9975 24C15.0971 24 17.9135 22.8138 20.0429 20.8848L16.3289 17.742C15.1241 18.6546 13.6265 19.2 11.9975 19.2C8.87625 19.2 6.22605 17.2098 5.22765 14.4324L1.31445 17.4474C3.30045 21.3336 7.33365 24 11.9975 24Z" fill="#4CAF50" />
            <path d="M23.7666 9.64953H22.8V9.59973H12V14.3997H18.7818C18.3066 15.7419 17.4432 16.8993 16.3296 17.7423C16.3302 17.7417 16.3308 17.7417 16.3314 17.7411L20.0454 20.8839C19.7826 21.1227 24 17.9997 24 11.9997C24 11.1951 23.9172 10.4097 23.7666 9.64953Z" fill="#1976D2" />
          </svg>
          Sign Up with google
        </button>

        <button
          type="button"
          className="sm:flex-1 h-[52px] sm:h-[69px] flex items-center justify-center gap-3 rounded-[48px] border border-[#FFFFFF1A] bg-[#FFFFFF08] text-white/70 text-[18px] leading-[29px] cursor-pointer hover:bg-white/10 transition-colors"
        >
          <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.862 12.6827C16.8513 10.7162 17.7407 9.23204 19.5411 8.13898C18.5337 6.69765 17.012 5.90465 15.0027 5.74926C13.1006 5.59923 11.0217 6.85839 10.2608 6.85839C9.45708 6.85839 7.61389 5.80284 6.16719 5.80284C3.17736 5.85106 0 8.1872 0 12.9399C0 14.3437 0.25719 15.7939 0.771569 17.2906C1.45741 19.2571 3.93286 24.0794 6.51547 23.999C7.86572 23.9669 8.81946 23.0399 10.5769 23.0399C12.2808 23.0399 13.1649 23.999 14.6705 23.999C17.2746 23.9615 19.5143 19.5786 20.168 17.6068C16.6745 15.9618 16.862 12.7845 16.862 12.6827ZM13.8293 3.88464C15.2921 2.14861 15.1581 0.56796 15.1153 0C13.8239 0.0750136 12.329 0.878731 11.4771 1.86998C10.5394 2.93089 9.98753 4.24363 10.1054 5.72247C11.5039 5.82963 12.7791 5.11164 13.8293 3.88464Z" fill="white" />
          </svg>
          Sign Up with apple
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-[9.5px] mb-8 sm:mb-10">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-white/50 text-[16px] leading-6 font-normal whitespace-nowrap">
          or continue with email
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col">
        {/* Full Name */}
        <div className="relative mb-5">
          <span className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-white/40">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.25 9C8.25 6.92893 9.92893 5.25 12 5.25C14.0711 5.25 15.75 6.92893 15.75 9C15.75 11.0711 14.0711 12.75 12 12.75C9.92893 12.75 8.25 11.0711 8.25 9ZM12 6.75C10.7574 6.75 9.75 7.75736 9.75 9C9.75 10.2426 10.7574 11.25 12 11.25C13.2426 11.25 14.25 10.2426 14.25 9C14.25 7.75736 13.2426 6.75 12 6.75Z" fill="#666667" />
              <path fillRule="evenodd" clipRule="evenodd" d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 14.5456 3.77827 16.851 5.4421 18.5235C5.6225 17.5504 5.97694 16.6329 6.68837 15.8951C7.75252 14.7915 9.45416 14.25 12 14.25C14.5457 14.25 16.2474 14.7915 17.3115 15.8951C18.023 16.6329 18.3774 17.5505 18.5578 18.5236C20.2217 16.8511 21.25 14.5456 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM17.1937 19.6554C17.0918 18.4435 16.8286 17.5553 16.2318 16.9363C15.5823 16.2628 14.3789 15.75 12 15.75C9.62099 15.75 8.41761 16.2628 7.76815 16.9363C7.17127 17.5553 6.90811 18.4434 6.80622 19.6553C8.28684 20.6618 10.0747 21.25 12 21.25C13.9252 21.25 15.7131 20.6618 17.1937 19.6554Z" fill="#666667" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="name"
            required
            className="bg-[#151B29] border border-[#FFFFFF0D] rounded-full h-[52px] sm:h-[69px] pl-12 sm:pl-[60px] pr-5 text-white placeholder:text-white/60 text-[16px] sm:text-[18px] leading-[29px] font-normal outline-none w-full focus:border-white/25 transition-colors"
          />
        </div>

        {/* TradingView username */}
        <div className="mb-5">
          <div className="relative">
            <span className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-white/40">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M4 18V6L10 12L14 8L20 14" stroke="#666667" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 14H20V10" stroke="#666667" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="TradingView username"
              value={tradingViewUsername}
              onChange={(e) => setTradingViewUsername(e.target.value)}
              disabled={noTradingView}
              autoComplete="off"
              className="bg-[#151B29] border border-[#FFFFFF0D] rounded-full h-[52px] sm:h-[69px] pl-12 sm:pl-[60px] pr-5 text-white placeholder:text-white/60 text-[16px] sm:text-[18px] leading-[29px] font-normal outline-none w-full focus:border-white/25 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </div>
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

        {/* Email */}
        <div className="relative mb-5">
          <span className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-white/40">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke="#666667" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9" stroke="#666667" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#151B29] border border-[#FFFFFF0D] rounded-full h-[52px] sm:h-[69px] pl-12 sm:pl-[60px] pr-5 text-white placeholder:text-white/60 text-[16px] sm:text-[18px] leading-[29px] font-normal outline-none w-full focus:border-white/25 transition-colors"
          />
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <span className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-white/40">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10" stroke="#666667" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z" stroke="#666667" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.9965 16H16.0054" stroke="#666667" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.9945 16H12.0035" stroke="#666667" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7.99451 16H8.00349" stroke="#666667" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#151B29] border border-[#FFFFFF0D] rounded-full h-[52px] sm:h-[69px] pl-12 sm:pl-[60px] pr-5 text-white placeholder:text-white/60 text-[16px] sm:text-[18px] leading-[29px] font-normal outline-none w-full focus:border-white/25 transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              /* Eye-off — password visible */
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5299 9.47004L9.46992 14.53C8.81992 13.88 8.41992 12.99 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C12.9899 8.42004 13.8799 8.82004 14.5299 9.47004Z" stroke="#666667" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.8198 5.76998C16.0698 4.44998 14.0698 3.72998 11.9998 3.72998C8.46984 3.72998 5.17984 5.80998 2.88984 9.40998C1.98984 10.82 1.98984 13.19 2.88984 14.6C3.67984 15.84 4.59984 16.91 5.59984 17.77" stroke="#666667" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.41992 19.5301C9.55992 20.0101 10.7699 20.2701 11.9999 20.2701C15.5299 20.2701 18.8199 18.1901 21.1099 14.5901C22.0099 13.1801 22.0099 10.8101 21.1099 9.40005C20.7799 8.88005 20.4199 8.39005 20.0499 7.93005" stroke="#666667" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15.5095 12.7C15.2495 14.11 14.0995 15.26 12.6895 15.52" stroke="#666667" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.47 14.53L2 22" stroke="#666667" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21.9993 2L14.5293 9.47" stroke="#666667" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              /* Eye-on — password hidden */
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5C7.45 5 3.73 7.94 2 12C3.73 16.06 7.45 19 12 19C16.55 19 20.27 16.06 22 12C20.27 7.94 16.55 5 12 5Z" stroke="#666667" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#666667" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>

        {/* Agree to terms */}
        <label className="mb-4 flex items-center gap-1.5 cursor-pointer select-none">
          <CustomCheckbox checked={agreed} onChange={setAgreed} />
          <span className="text-white/60 text-[16px] sm:text-[18px] leading-[22px] sm:leading-[29px] font-normal">I agree to the</span>
          <Link
            href="/terms"
            className="underline underline-offset-2 hover:text-white/90 transition-colors"
          >
            Terms &amp; Privacy
          </Link>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-[52px] sm:h-[62px] rounded-[40px] bg-[#88C4FF] text-black font-bold text-[16px] leading-[26px] hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60"
        >
          {loading ? "Creating…" : "Sign Up"}
        </button>
      </form>

      {/* Bottom link */}
      <p className="text-white/60 text-[16px] sm:text-[18px] leading-[22px] sm:leading-[29px] font-normal text-center mt-8 sm:mt-10">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-white font-semibold underline underline-offset-2 hover:text-white/90 transition-colors"
        >
          Log In
        </Link>
      </p>
    </div>
  );
}
