"use client";
import { createClient } from "@/lib/supabase/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import z from "zod";

const schema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function Page() {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>("null");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.session) {
        // Add the supabase to our table
        await axios.post("/api/auth/register").catch((err) => {
          console.log("Error registering user in database", err);
        });

        router.push("/login");
        return;
      }
    } catch (error) {
      console.log("There was an error creating user", error);
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Page;
