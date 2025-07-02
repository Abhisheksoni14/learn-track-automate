import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/Login";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { EmployeeDashboard } from "./components/dashboard/EmployeeDashboard";
import LDDashboard from "./components/dashboard/LDDashboard";
import { AdminDashboard } from "./components/dashboard/AdminDashboard";
import RoleDashboardRouter from "./components/dashboard/RoleDashboardRouter";
import LDDashboardRouteWrapper from "./components/dashboard/LDDashboardRouteWrapper";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<RoleDashboardRouter />} />
              <Route path="request" element={<EmployeeDashboard currentView="request" />} />
              <Route path="mytrainings" element={<EmployeeDashboard currentView="mytrainings" />} />
              <Route path="notifications" element={<EmployeeDashboard currentView="notifications" />} />
              <Route path="requests" element={<LDDashboardRouteWrapper initialView="requests" />} />
              <Route path="trainers" element={<LDDashboardRouteWrapper initialView="trainers" />} />
              <Route path="calendar" element={<LDDashboardRouteWrapper initialView="calendar" />} />
              <Route path="reports" element={<LDDashboardRouteWrapper initialView="reports" />} />
              <Route path="users" element={<AdminDashboard currentView="users" />} />
              <Route path="courses" element={<AdminDashboard currentView="courses" />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Route>
            <Route path="/unauthorized" element={
              <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
                  <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
                  <button 
                    onClick={() => window.history.back()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
