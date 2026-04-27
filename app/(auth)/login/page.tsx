"use client";
import Background from "@/components/auth/Background";
import Header from "@/components/auth/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import z from "zod";

const schema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function Page() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = schema.safeParse({ email, password });
    if (!result.success) {
      const flat = z.flattenError(result.error);
      setFieldErrors({
        email: flat.fieldErrors.email?.[0],
        password: flat.fieldErrors.password?.[0],
      });
      return;
    }

    setFieldErrors({});

    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      await axios.post("/api/auth/login").catch((err) => {
        setError(err.response?.data?.error || "An error occurred during login");
      });

      router.push("/");
    } catch (error) {
      console.log("There was an error loggin in");
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen flex flex-col">
      <Header />
      <Background />

      <div className="flex-1 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="p-8 bg-black/65 rounded-lg flex flex-col gap-4 w-full max-w-md"
        >
          <h1 className="mb-4 text-2xl font-bold text-white">Sign In</h1>

          <div className="flex flex-col gap-1">
            <Label htmlFor="email" className="text-white/80 text-sm">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="password" className="text-white/80 text-sm">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-xs">{fieldErrors.password}</p>
            )}
            <Link
              href={"/forgot-password"}
              className="text-white/50 text-xs hover:text-white self-end mt-1"
            >
              Forgot password?
            </Link>
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <Button type="submit" variant={"brand-primary"} className="h-12">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Page;
