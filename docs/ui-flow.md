# UI Flow

## 1. Entry Flow
- User opens the application
- User sees Login page
- If user does not have an account, user goes to Register page

---

## 2. Register Flow
- User opens Register page
- User enters:
  - name
  - email
  - password
- System validates input
- If validation fails:
  - show validation errors
  - stay on Register page
- If validation passes:
  - create user account
  - show success message
  - redirect to Login page

---

## 3. Login Flow
- User opens Login page
- User enters:
  - email
  - password
- System validates input
- If credentials are invalid:
  - show error message
  - stay on Login page
- If credentials are valid:
  - generate access token
  - generate refresh token
  - login successful
  - go to next page based on role

---

## 4. Role-based Redirect Flow
- After successful login:
  - if role is `user`:
    - redirect to User Dashboard / Profile page
  - if role is `admin`:
    - redirect to Admin Dashboard

---

## 5. Protected Route Flow
- User tries to open a protected page
- System checks access token
- If token is valid:
  - allow access
- If token is expired:
  - try refresh token
- If refresh token works:
  - generate new access token
  - allow access
- If refresh token fails:
  - redirect to Login page

---

## 6. Current User Flow
- Logged-in user opens Profile / Me page
- System fetches current logged-in user data
- Show:
  - name
  - email
  - role

---

## 7. Admin-only Route Flow
- User opens Admin Dashboard
- System checks:
  - user is logged in
  - user role is admin
- If role is admin:
  - allow access
- If role is not admin:
  - show unauthorized / forbidden page or message

---

## 8. Change Password Flow
- Logged-in user opens Change Password page
- User enters:
  - current password
  - new password
- System validates input
- If current password is wrong:
  - show error
- If input is valid:
  - update password
  - ask user to login again

---

## 9. Logout Flow
- User clicks Logout
- System clears session / token data
- User is redirected to Login page

---

## 10. Error Flow
- Validation error -> show field errors
- Unauthorized access -> redirect to Login page or show message
- Forbidden access -> show access denied message
- Server error -> show generic error message