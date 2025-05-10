# Authentication Implementation Notes

## IMPORTANT: DO NOT CHECK FOR TOKEN EXPIRY

As of May 10, 2025, this project has been configured to NOT check for token expiry in the protected routes.

This decision was made deliberately for the following reasons:

- Simplifies authentication flow
- Eliminates potential issues with token expiration during active user sessions
- Allows the server to be the single source of truth for authentication validity

### Implementation Details

The authentication system works as follows:

1. When a user logs in, their JWT token is stored in localStorage
2. Protected routes check for the existence of this token, but DO NOT validate its expiration time
3. Requests to the backend API still include the token in the Authorization header
4. The backend is responsible for rejecting expired tokens as needed

### Notes for Developers

- Do not add token expiry checks to the frontend authentication flow
- If you need to modify the auth system, maintain this pattern
- If token expiry checks become necessary in the future, this should be implemented server-side
- The `tokenHelper.js` file contains a `testTokenDecode` function that checks for expiry, but it's only used for debugging and not for actual authentication flow

This approach helps prevent users from being unexpectedly logged out during active sessions.

### Related Files

The following files are part of the authentication system:

- `src/context/AuthContext.jsx` - Manages auth state and login/logout functions
- `src/pages/protectedRoute.jsx` - Handles route protection based on auth state
- `src/services/axiosConfig.js` - Adds token to API requests
- `src/utils/tokenHelper.js` - Contains debugging utilities for tokens
- `src/utils/authUtils.js` - Helper functions for auth error handling
