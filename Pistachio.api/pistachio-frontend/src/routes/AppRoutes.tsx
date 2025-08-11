// src/routes/AppRoutes.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from "../components/Layout/MainLayout";
import LoginPage from "../pages/Login/LoginPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas protegidas */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* Outras rotas de CRUD virão aqui */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
