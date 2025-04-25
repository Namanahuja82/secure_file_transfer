import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 flex justify-center items-center p-4">
      <div className="max-w-md w-full">
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-gray-800 border border-gray-700 shadow-xl",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-300",
              socialButtonsBlockButton: "bg-gray-700 border border-gray-600 text-white hover:bg-gray-600",
              dividerLine: "bg-gray-600",
              formFieldLabel: "text-gray-300",
              formFieldInput: "bg-gray-700 border-gray-600 text-white",
              footerActionLink: "text-purple-400 hover:text-purple-300",
              formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white"
            },
          }}
          routing="path"
          signInUrl="/sign-in"
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}