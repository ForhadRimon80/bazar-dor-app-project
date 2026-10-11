"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, FieldError, Form, Input, Label, TextField, toast } from "@heroui/react";
import { signOut, updateUser, useSession } from "@/lib/auth-client";
import { FaUser, FaArrowRightFromBracket, FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

const ProfilePage = () => {
  const { data: session, isPending, refetch } = useSession();
  const router = useRouter();
  const user = session?.user;

  // Handle Sign Out
  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.danger(<span className="font-bold text-red-600">Sign Out Failed</span>, {
        indicator: <FaCircleXmark className="text-red-600" />,
        description: error.message,
      });
      return;
    }
    toast.success(<span className="font-bold text-green-600">Signed Out Successfully</span>, {
      indicator: <FaCircleCheck className="text-green-600" />,
      description: "You have successfully signed out.",
    });
    router.push("/");
    router.refresh();
  };

  // Handle Profile Update
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    // Update User Information
    const { error } = await updateUser({
      name: data.name.trim(),
      image: data.image.trim(),
    });
    if (error) {
      toast.danger(<span className="font-bold text-red-600">Profile Update Failed</span>, {
        indicator: <FaCircleXmark className="text-red-600" />,
        description: error.message,
      });
      return;
    }
    await refetch();
    toast.success(<span className="font-bold text-green-600">Profile Updated Successfully</span>, {
      indicator: <FaCircleCheck className="text-green-600" />,
      description: "Your profile has been updated successfully.",
    });
  };

  // Loading Session
  if (isPending || !user) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#F0F5F0]">
        <p className="text-sm text-gray-500">প্রোফাইল লোড হচ্ছে...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F0F5F0] px-4 py-12">
      <div className="mx-auto w-full max-w-2xl">
        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#1D271F] sm:text-2xl">আমার প্রোফাইল</h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        </div>

        {/* User Information Card */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-5 sm:p-6">
          <div className="flex min-w-0 items-center gap-4">
            {/* Profile Image */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
              {user.image ? (
                <Image src={user.image} alt={user.name} fill sizes="64px" unoptimized className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <FaUser className="size-7 text-gray-400" />
                </div>
              )}
            </div>

            {/* User Details */}
            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold text-[#1D271F]">{user.name}</h2>

              <p className="truncate text-xs text-gray-500 sm:text-sm">{user.email}</p>
            </div>
          </div>

          {/* Sign Out Button */}
          <Button type="button" variant="outline" onPress={handleSignOut} className="rounded-lg border border-red-400 bg-transparent text-xs font-medium text-red-600">
            <FaArrowRightFromBracket className="size-3.5" />
            সাইন আউট
          </Button>
        </div>

        {/* Update Profile Card */}
        <div className="mt-5 rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-5 sm:p-6">
          <h3 className="mb-6 text-sm font-bold text-[#1D271F]">তথ্য</h3>

          <Form key={user.id} onSubmit={onSubmit} className="w-full">
            {/* Name */}
            <TextField
              isRequired
              name="name"
              className="w-full"
              defaultValue={user.name}
              validate={(value) => {
                if (value.trim().length < 3) {
                  return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
                }
                return null;
              }}>
              <Label className="mb-1 text-sm font-medium text-[#1D271F]">নাম</Label>

              <Input className="w-full rounded-lg border border-[#E1E8E1] bg-transparent px-3 text-sm text-[#1D271F]" />

              <FieldError className="text-xs text-red-600" />
            </TextField>

            {/* Image URL */}
            <TextField name="image" className="mt-4 w-full" defaultValue={user.image ?? ""}>
              <Label className="mb-1 text-sm font-medium text-[#1D271F]">প্রোফাইল ছবির URL</Label>

              <Input placeholder="https://example.com/profile.jpg" className="w-full rounded-lg border border-[#E1E8E1] bg-transparent px-3 text-sm text-[#1D271F]" />

              <FieldError className="text-xs text-red-600" />
            </TextField>

            {/* Update Button */}
            <Button type="submit" className="mt-4 w-full rounded-lg border-none bg-[#05893E] font-semibold text-white hover:bg-[#04612c]">
              আপডেট
            </Button>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
