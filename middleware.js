import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define public routes that don't require authentication
const publicRoutes = createRouteMatcher([
  '/',                // Landing page
  '/sign-in(.*)',     // Sign in routes
  '/sign-up(.*)',     // Sign up routes
  // Add any other public routes as needed
]);

export default clerkMiddleware(async (auth, req) => {
  // If it's a public route, don't require authentication
  if (publicRoutes(req)) {
    return; // Allow access without authentication
  }

  // For all other routes (like /dashboard), require authentication
  await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};