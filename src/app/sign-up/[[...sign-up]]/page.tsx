import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className='flex items-center justify-center p-3'>
      <SignUp />
    </div>
  );
}
