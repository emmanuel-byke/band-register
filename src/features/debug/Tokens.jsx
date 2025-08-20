import Cookies from "js-cookie";

// Add this function to your frontend for debugging token issues
export const debugTokens = () => {
  const accessToken = Cookies.get('access_token');
  const refreshToken = Cookies.get('refresh_token');
  const csrfToken = Cookies.get('csrftoken');
  
  console.log('=== Token Debug Info ===');
  console.log('Access Token:', accessToken ? 'Present' : 'Missing');
  console.log('Refresh Token:', refreshToken ? 'Present' : 'Missing');
  console.log('CSRF Token:', csrfToken ? 'Present' : 'Missing');
  
  // Decode JWT tokens (basic decode, not validation)
  if (accessToken) {
    try {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      console.log('Access Token Payload:', payload);
      console.log('Access Token Expires:', new Date(payload.exp * 1000));
      console.log('Access Token Expired:', payload.exp * 1000 < Date.now());
    } catch (e) {
      console.log('Could not decode access token');
    }
  }
  
  if (refreshToken) {
    try {
      const payload = JSON.parse(atob(refreshToken.split('.')[1]));
      console.log('Refresh Token Payload:', payload);
      console.log('Refresh Token Expires:', new Date(payload.exp * 1000));
      console.log('Refresh Token Expired:', payload.exp * 1000 < Date.now());
    } catch (e) {
      console.log('Could not decode refresh token');
    }
  }
  
  console.log('========================');
};

// Call this function in your browser console to debug: debugTokens()