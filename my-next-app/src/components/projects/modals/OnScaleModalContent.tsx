"use client";

import OnScaleViewer from "../demos/OnScaleViewer";

export function OnScaleModalContent() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2 flex flex-col space-y-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            <a href="https://onscale.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              OnScale
            </a>
          </h2>
          <p className="text-sm text-gray-600">
            Cloud engineering simulation platform used by engineers to run large-scale multiphysics simulations in the cloud.
          </p>
          <div className="text-base text-gray-700 space-y-2">
            <p className="font-semibold">Senior Frontend Developer</p>
            <p className="text-sm text-gray-600">Apr 2018 – Apr 2020</p>
            <p>Developed Angular and Polymer apps with Stripe integration. Owned architecture and led feature delivery across agile teams focused on UI/UX and simulation workflows.</p>
          </div>
        </div>
        <div className="text-sm text-gray-700">
          <strong>Demo:</strong> This demo showcases an interactive 3D CAD model similar to the simulations I worked on at OnScale. Using Three.js, it echoes the type of high-fidelity model visualization we enabled for thermal and mechanical simulations of phone chips and industrial components.
        </div>
      </div>
      <div className="w-full flex items-center justify-center border rounded-lg shadow p-4 bg-gray-50 overflow-hidden">
        <OnScaleViewer />
      </div>
    </div>
  );
}