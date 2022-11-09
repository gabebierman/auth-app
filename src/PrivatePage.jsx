import React from "react";
import { auth } from "./firebase.config";

function PrivatePage() {
    return (
        <>
            <div>PrivatePage</div>
            <div>{auth.currentUser?.displayName}</div>
            <button onClick={() => auth.signOut()}>Sign Out</button>
        </>
    );
}

export default PrivatePage;
