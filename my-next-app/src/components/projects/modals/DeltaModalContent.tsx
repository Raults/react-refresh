"use client";

import DeltaFlightDemo from "../demos/DeltaFlightDemo";

export function DeltaModalContent() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2 flex flex-col space-between space-y-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            <a
              href="https://www.delta.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Delta Air Lines
            </a>
          </h2>
          <p className="text-sm text-gray-600">
            One of the major airlines of the United States, providing domestic and international air travel to millions annually.
          </p>
          <div className="text-base text-gray-700 space-y-2">
            <p className="font-semibold">Senior iOS Developer – Cognizant Softvision @ Delta</p>
            <p className="text-sm text-gray-600">Aug 2021 – Jan 2022</p>
            <p>
              Built and shipped new iOS features across multiple agile teams. Coordinated with backend teams to integrate and deliver new functionality.
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-700">
          <strong>Demo:</strong> This demo reflects a mobile-native experience inspired by my frontend work at Delta. Users can select flights, highlight choices, and book them in a streamlined interface meant to echo the simplicity of mobile-first travel tools we aimed to modernize.
        </div>
      </div>
      <div className="w-full flex items-center justify-center border rounded-lg shadow p-4 bg-gray-50 overflow-hidden">
        <DeltaFlightDemo />
      </div>
    </div>
  );
}