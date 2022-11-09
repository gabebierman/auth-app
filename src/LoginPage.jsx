import React, { useState } from "react";
import { auth } from "./firebase.config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const provider = new GoogleAuthProvider();

function LoginPage() {
    async function signIn() {
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        }
    }
    return (
        <>
            <div>LoginPage</div>

            <button onClick={signIn}>Sign In</button>
        </>
    );
}

export default LoginPage;
