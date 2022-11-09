import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import { useState } from "react";
import { auth } from "./firebase.config";
import JoinRoom from "./JoinRoom";
import ChatRoom from "./ChatRoom";

function App() {
    const [user, setUser] = useState(null);
    auth.onAuthStateChanged((activeUser) => setUser(activeUser));
    return (
        <>
            {auth.currentUser && (
                <>
                    <div>
                        Currently signed in as: {auth.currentUser?.displayName} (
                        {auth.currentUser?.email})
                    </div>
                    <button onClick={() => auth.signOut()}>Sign Out</button>
                </>
            )}
            <Router>
                <Routes>
                    <Route
                        path="/login"
                        element={!user ? <LoginPage /> : <Navigate to="/join-room" />}
                    ></Route>
                    <Route
                        path="/join-room"
                        element={user ? <JoinRoom /> : <Navigate to="/login" />}
                    ></Route>
                    <Route
                        path="/room/:id"
                        element={user ? <ChatRoom /> : <Navigate to="/login" />}
                    ></Route>
                    <Route path="*" element={<Navigate to="/login" />}></Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
