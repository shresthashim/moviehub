import { SignUp } from "@clerk/nextjs";

export const metadata = { title: "Sign up" };

export default function SignUpPage() {
  return (
    <div className="mx-auto flex min-h-[75vh] max-w-md flex-col items-center justify-center px-4 py-12 text-center">
      <h1 className="font-display text-4xl tracking-wide text-foreground sm:text-5xl">Create your account</h1>
      <p className="mt-2 text-muted">Join MovieHub to save favorites and track what you love.</p>
      <div className="mt-8">
        <SignUp
          appearance={{
            variables: { colorPrimary: "#E5B143", borderRadius: "0.75rem" },
            elements: { rootBox: "mx-auto", card: "shadow-card-hover" },
          }}
        />
      </div>
    </div>
  );
}
