"use client";

import { Button, Description, FieldError, FieldGroup, Fieldset, Form, Input, InputGroup, Label, TextField, toast } from "@heroui/react";
import { FaCircleXmark, FaEye, FaEyeSlash, FaGithub } from "react-icons/fa6";
import { useState } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const SignUpPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  // Handles the form submission
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    //* Check new password and confirm password match */
    if (data.password !== data.confirmPassword) {
      toast.danger(<span className="font-bold text-red-600">Passwords do not match</span>, {
        indicator: <FaCircleXmark className="text-red-600" />,
        description: "New password and confirm password must be the same.",
      });
      return;
    }

    // Call the signUp function from the auth client
    const { error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.danger(<span className="font-bold text-red-600">Sign Up Failed</span>, {
        indicator: <FaCircleXmark className="text-red-600" />,
        description: error?.message,
      });
      return;
    }
    router.push("/");
  };

  // Handle social sign in
  const handleSocialSignIn = async (provider: "google" | "github") => {
    const { error } = await signIn.social({
      provider: provider,
      callbackURL: "/",
    });

    if (error) {
      toast.danger(<span className="font-bold text-red-600">Error signing in</span>, {
        indicator: <FaCircleXmark className="text-red-600" />,
        description: error?.message,
      });
    }
  };

  return (
    <section className="flex items-center justify-center bg-[#F0F5F0] px-4 py-10">
      <div className="w-full max-w-100">
        {/* Page Title */}
        <div className="mb-5 text-center">
          <h1 className="text-xl font-bold text-[#1D271F] sm:text-2xl">অ্যাকাউন্ট তৈরি করুন</h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
        </div>

        {/* Sign Up Card */}
        <div className="rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-5 sm:p-6">
          <Form onSubmit={onSubmit} className="w-full">
            <Fieldset className="w-full">
              <FieldGroup className="gap-4">
                {/* Name */}
                <TextField
                  isRequired
                  name="name"
                  className="w-full"
                  validate={(value) => {
                    if (value.length < 3) {
                      return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
                    }
                    return null;
                  }}>
                  <Label className="mb-1 text-sm font-medium text-[#1D271F]">নাম</Label>

                  <Input placeholder="যেমন: রহিম উদ্দিন" className="w-full rounded-lg border border-[#E1E8E1] bg-transparent px-3 text-sm text-[#1D271F]" />

                  <FieldError className="text-xs text-red-600" />
                </TextField>

                {/* Email */}
                <TextField
                  isRequired
                  name="email"
                  type="email"
                  className="w-full"
                  validate={(value) => {
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                      return "সঠিক ইমেইল ঠিকানা লিখুন";
                    }
                    return null;
                  }}>
                  <Label className="mb-1 text-sm font-medium text-[#1D271F]">ইমেইল</Label>

                  <Input placeholder="you@example.com" className="w-full rounded-lg border border-[#E1E8E1] bg-transparent px-3 text-sm text-[#1D271F]" />

                  <FieldError className="text-xs text-red-600" />
                </TextField>

                {/* Password */}
                <TextField
                  isRequired
                  name="password"
                  className="w-full"
                  validate={(value) => {
                    if (value.length < 8) {
                      return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                    }

                    if (!/[A-Z]/.test(value)) {
                      return "পাসওয়ার্ডে অন্তত একটি বড় হাতের ইংরেজি অক্ষর থাকতে হবে";
                    }

                    if (!/[0-9]/.test(value)) {
                      return "পাসওয়ার্ডে অন্তত একটি সংখ্যা থাকতে হবে";
                    }

                    return null;
                  }}>
                  <Label className="mb-1 text-sm font-medium text-[#1D271F]">পাসওয়ার্ড</Label>

                  <InputGroup className="w-full rounded-lg border border-[#E1E8E1] bg-transparent">
                    <InputGroup.Input placeholder="কমপক্ষে ৮ অক্ষর" type={isVisible ? "text" : "password"} className="w-full text-sm text-[#1D271F]" />

                    <InputGroup.Suffix>
                      <Button isIconOnly type="button" aria-label={isVisible ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"} size="sm" variant="ghost" onPress={() => setIsVisible(!isVisible)}>
                        {isVisible ? <FaEye className="size-4" /> : <FaEyeSlash className="size-4" />}
                      </Button>
                    </InputGroup.Suffix>
                  </InputGroup>

                  <Description className="mt-1 text-xs text-gray-500">কমপক্ষে ৮ অক্ষর, একটি বড় হাতের ইংরেজি অক্ষর ও একটি সংখ্যা থাকতে হবে।</Description>

                  <FieldError className="text-xs text-red-600" />
                </TextField>

                {/* Confirm Password */}
                <TextField isRequired name="confirmPassword" className="w-full">
                  <Label className="mb-1 text-sm font-medium text-[#1D271F]">পাসওয়ার্ড নিশ্চিত করুন</Label>

                  <Input placeholder="আবার লিখুন" type="password" className="w-full rounded-lg border border-[#E1E8E1] bg-transparent px-3 text-sm text-[#1D271F]" />

                  <FieldError className="text-xs text-red-600" />
                </TextField>
              </FieldGroup>

              {/* Sign Up Button */}
              <Button type="submit" className="mt-4 w-full rounded-lg border-none bg-[#05893E] font-semibold text-white hover:bg-[#04612c]">
                অ্যাকাউন্ট তৈরি করুন
              </Button>
            </Fieldset>
          </Form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E1E8E1]" />
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-[#E1E8E1]" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button type="button" variant="outline" onPress={() => handleSocialSignIn("google")} className="w-full rounded-lg border border-[#E1E8E1] bg-transparent px-2 text-xs text-[#1D271F]">
              <FcGoogle className="size-4 text-[#4285F4]" />
              Google দিয়ে চালিয়ে যান
            </Button>

            <Button type="button" variant="outline" onPress={() => handleSocialSignIn("github")} className="w-full rounded-lg border border-[#E1E8E1] bg-transparent px-2 text-xs text-[#1D271F]">
              <FaGithub className="size-4" />
              GitHub দিয়ে চালিয়ে যান
            </Button>
          </div>

          {/* Sign In Link */}
          <p className="mt-5 text-center text-xs text-gray-500">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/sign-in" className="font-semibold text-[#05893E] hover:underline">
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* Back Home */}
        <div className="mt-5 text-center">
          <Link href="/" className="text-xs text-gray-500 hover:text-[#05893E]">
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
