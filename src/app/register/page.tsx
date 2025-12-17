"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/features/auth/authApi";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(8),
});

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [registerMut, { isLoading, error }] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    const res = await registerMut(values).unwrap();
    if (res.success) router.push("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-neutral-900 border border-neutral-800 shadow-2xl rounded-2xl p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">Create your account</h1>
            <p className="text-neutral-400 text-sm mt-1">Join SportNexus in seconds</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Name</label>
              <input
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500 px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-neutral-700/60 focus:border-neutral-500 transition"
                type="text"
                placeholder="John Doe"
                {...register("name")}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Email</label>
              <input
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500 px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-neutral-700/60 focus:border-neutral-500 transition"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Password</label>
              <input
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500 px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-neutral-700/60 focus:border-neutral-500 transition"
                type="password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
              <p className="text-[11px] text-neutral-400 mt-1">Use at least 8 characters.</p>
            </div>

            {error && (
              <div className="rounded-md border border-red-800 bg-red-950 text-red-300 text-sm px-3 py-2">Registration failed. Please try again.</div>
            )}

            <button
              disabled={isLoading}
              className="w-full rounded-lg bg-white text-black py-2.5 text-sm font-medium shadow-sm hover:bg-neutral-200 focus:ring-4 focus:ring-white/20 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-center text-sm text-neutral-300 mt-6">
            Already have an account? {" "}
            <a href="/login" className="font-medium text-white underline-offset-4 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
