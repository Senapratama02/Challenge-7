import React from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';


function GoogleLogin({ setToken, label }) {
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      // Send access token to backend
      try {
        const data = {
          access_token: response.access_token,
        };
        const result = await axios.post(
          `${process.env.REACT_APP_AUTH_API}/api/v1/auth/google`,
          data
        );
        if (result.data.token) {
          // Set token from backend to local storage
          // {"data": { "token": "ini token" }}
          localStorage.setItem("token", result.data.token);
          setToken(result.data.token);
        }
      } catch (error) {
        // If there are any error it will show the error message from backend
        // { "message": "Password salah" }
        alert(error.response.data.message);
      }
    },
    onError: (error) => {
      alert(error);
    },
  });

  return (
    <div className="d-grid">
      <div className="m-auto">
        <Button variant="contained" onClick={googleLogin}>
          <GoogleIcon /> { label }
        </Button>
      </div>
    </div>
  );
}

export default GoogleLogin;