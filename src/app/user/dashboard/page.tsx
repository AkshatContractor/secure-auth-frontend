'use client';

import LogOutButton from '@/app/components/LogoutButton';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Secure Auth Dashboard
        </h1>

        {/* Project Overview */}
        <section className="mb-6 pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 text-gray-700">Project Overview</h2>
          <p className="text-gray-600 leading-relaxed">
            This project demonstrates a secure authentication system using a Spring Boot backend for JWT-based
            auth and a separate OTP microservice. The Next.js frontend handles the login flow, OTP prompt, and
            session/logout events.
          </p>
        </section>

        {/* Features Implemented */}
        <section className="mb-6 pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 text-gray-700">Features Implemented</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>JWT authentication (access controlled via middleware)</li>
            <li>Email OTP verification with retry limit</li>
            <li>Frontend session management using <code>BroadcastChannel</code> for logout sync</li>
            <li>Ready hooks for 2FA/TOTP, refresh tokens, and Redis integration</li>
          </ul>
        </section>

        {/* Deployment & Environment */}
        <section className="mb-6 pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-3 text-gray-700">Deployment & Environment</h2>
          <p className="text-gray-600 leading-relaxed">
            All backend services (main Spring Boot app, OTP microservice, Redis) are containerized and
            orchestrated with Docker Compose on a shared Docker network. Services communicate via container
            names instead of localhost for stable, isolated environments.
          </p>
        </section>

        {/* Future Upgrades */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-gray-700">Future Upgrades</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>OAuth2 login (Google, GitHub, etc.)</li>
            <li>Short-lived access tokens + refresh token rotation</li>
            <li>TOTP / SMS-based 2FA</li>
            <li>Enhanced dashboard with user activity & audit trails</li>
          </ul>
        </section>

        {/* Logout */}
        <div className="flex justify-center mt-8">
          <LogOutButton />
        </div>
      </div>
    </div>
  );
}
