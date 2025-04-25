import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SecureShare - Encrypted File Sharing",
  description: "Share files securely with end-to-end encryption",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      // Define redirection behavior
      // If user is signed in and tries to access sign-in/sign-up pages, redirect to dashboard
      afterSignIn={{ redirectUrl: "/dashboard" }}
      afterSignUp={{ redirectUrl: "/dashboard" }}
      // Already signed in users get redirected to dashboard when they try to visit sign-in/sign-up
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}