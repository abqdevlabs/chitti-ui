---
# Function: responseSuccessInterceptor

### 1. PURPOSE
Identity pass-through handler for successful HTTP responses. Returns the Axios response object unmodified to continue the promise chain.

### 2. INPUTS & OUTPUTS
- **Parameters:** 
  - `response` (`AxiosResponse`): The successful HTTP response from the server.
- **Returns:** `AxiosResponse` - The same response object passed in.

### 3. FUNCTION FLOW
1. **[COMPUTATION]** Receive `response` parameter.
2. **[RETURN]** Return `response` directly without modification.

### 4. SIDE EFFECTS
None. Pure function.

### 5. COMPLEXITY & RISKS
- No logical complexity.
- No risk of mutation or side effects.
- Minimal performance overhead.

---

# Function: responseErrorInterceptor

### 1. PURPOSE
Handles failed HTTP responses, specifically intercepting 401 Unauthorized errors to attempt a silent token refresh via a dedicated client, then retries the original request once. Prevents infinite retry loops and excludes the login endpoint from refresh logic.

### 2. INPUTS & OUTPUTS
- **Parameters:** 
  - `error` (`AxiosError`): The error object thrown by Axios for a failed request.
- **Returns:** `Promise<AxiosResponse>` - Resolves with the retried request's response if refresh succeeds; otherwise rejects with the original or refresh error.

### 3. FUNCTION FLOW
1. **[COMPUTATION]** Cast `error.config` to `CustomAxiosRequestConfig` (adds `_retry` flag).
2. **[CONDITIONAL]** If `originalRequest` is falsy → reject with original error.
3. **[CONDITIONAL]** If request URL includes `/auth/login` → reject with original error (skip refresh for login).
4. **[CONDITIONAL]** If error status is 401 AND `_retry` flag is false:
   1. **[COMPUTATION]** Set `originalRequest._retry = true`.
   2. **[NETWORK_CALL]** Call `refreshClient.post("/auth/refresh")` (sends refresh token cookie automatically).
   3. **[CONDITIONAL]** On refresh success:
      1. **[NETWORK_CALL]** Retry original request via `api(originalRequest)`.
      2. **[RETURN]** Return retried request promise.
   4. **[ERROR_THROW]** On refresh failure → reject with refresh error (triggers logout upstream).
5. **[ERROR_THROW]** For all other cases → reject with original error.

### 4. SIDE EFFECTS
- **Network Call**: POST to `/auth/refresh` endpoint (sends HttpOnly refresh token cookie).
- **Network Call**: Retries original failed request via `api` instance (may include new access token cookie).
- **State Mutation**: Mutates `originalRequest._retry` flag to prevent infinite loops.

### 5. COMPLEXITY & RISKS
- **Infinite Loop Prevention**: Relies on `_retry` flag; if flag is not reset elsewhere, retries are limited to one per request.
- **Race Conditions**: Multiple concurrent 401s may each trigger a refresh call; backend must handle concurrent refresh requests idempotently or with token rotation.
- **Cookie Dependency**: Assumes refresh token is stored in HttpOnly cookie and sent automatically (`withCredentials: true`). Vulnerable to CSRF if SameSite policy not strict.
- **Error Swallowing**: Refresh failure rejects with `refreshError` but original 401 context is lost; downstream logout logic must handle generic error.
- **Login Endpoint Exclusion**: Hardcoded string match on `/auth/login`; if login route changes, refresh may be incorrectly attempted on login failure.