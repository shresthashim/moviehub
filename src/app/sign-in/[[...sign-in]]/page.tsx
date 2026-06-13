import { SignIn } from "@clerk/nextjs";

export const metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <div className="mx-auto flex min-h-[75vh] max-w-md flex-col items-center justify-center px-4 py-12 text-center">
      <h1 className="font-display text-4xl tracking-wide text-foreground sm:text-5xl">Welcome back</h1>
      <p className="mt-2 text-muted">Sign in to build and access your favorite films.</p>
      <div className="mt-8">
        <SignIn
          appearance={{
            variables: { colorPrimary: "#E5B143", borderRadius: "0.75rem" },
            elements: { rootBox: "mx-auto", card: "shadow-card-hover" },
          }}
        />
      </div>
    </div>
  );
}
