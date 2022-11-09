import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import PrivatePage from "./PrivatePage";
import { useState } from "react";
import { auth } from "./firebase.config";

function App() {
    const [user, setUser] = useState(null);
    auth.onAuthStateChanged((activeUser) => setUser(activeUser));
    return (
        <>
            <Router>
                <Routes>
                    <Route
                        path="/login"
                        element={!user ? <LoginPage /> : <Navigate to="/private" />}
                    ></Route>
                    <Route
                        path="/private"
                        element={user ? <PrivatePage /> : <Navigate to="/login" />}
                    ></Route>
                    <Route path="*" element={<Navigate to="/login" />}></Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
