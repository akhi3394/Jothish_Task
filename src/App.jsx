import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import List from './pages/List';
import Details from './pages/Details';
import PhotoResult from './pages/PhotoResult';
import SalaryChart from './pages/SalaryChart';
import CityMap from './pages/CityMap';

// Simple Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/list" element={
          <ProtectedRoute>
            <List />
          </ProtectedRoute>
        } />

        <Route path="/details/:id" element={
          <ProtectedRoute>
            <Details />
          </ProtectedRoute>
        } />

        <Route path="/photo-result" element={
          <ProtectedRoute>
            <PhotoResult />
          </ProtectedRoute>
        } />

        <Route path="/chart" element={
          <ProtectedRoute>
            <SalaryChart />
          </ProtectedRoute>
        } />

        <Route path="/map" element={
          <ProtectedRoute>
            <CityMap />
          </ProtectedRoute>
        } />

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/list" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
