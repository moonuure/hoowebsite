import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/header"; // Ensure this path is correct
import Footer from "./components/Footer"; // Ensure this path is correct
import Sidebar from "./dashboard/Sidebar Component/Sidebar"; // Sidebar component
import Dashboard from "./dashboard/Dashboard"; // Dashboard component
import CourseList from "./components/CourseList"; // CourseList component
import Courses from "./pages/Courses"; // Courses page component
import About from "./pages/About"; // About page component
import Contact from "./pages/Contact"; // Contact page component
import Login from "./Login Component/Login"; // Ensure this path is correct
import Register from "./Login Component/Register"; // Ensure this path is correct
import Users from "./dashboard/Users"; // Users component
import CreateUser from "./dashboard/CreateUser"; // CreateUser component
import UserProfile from "./ProfilePage/userProfile"; // Corrected UserProfile path
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Login Component/firebase"; // Ensure this path is correct

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Monitor authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set authenticated state based on user presence
      setIsLoading(false); // Set loading to false once authentication is checked
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // If loading, render a spinner or loading screen
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {isAuthenticated ? (
        <div style={{ display: "flex" }}>
          <Sidebar /> {/* Sidebar displayed next to main content */}
          <div style={{ flex: 1 }}>
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} /> {/* Main Dashboard */}
              <Route path="/courses" element={<Courses />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/users" element={<Users />} /> {/* View Users */}
              <Route path="/create-user" element={<CreateUser />} />{" "}
              {/* Create User */}
              <Route path="/userProfile" element={<UserProfile />} />{" "}
              {/* User Profile */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            {/* <Footer /> */}
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
