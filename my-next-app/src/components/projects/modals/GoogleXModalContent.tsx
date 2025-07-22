"use client";

import HardwareDemo from "../demos/HardwareDemo";

export function GoogleXModalContent() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2 flex flex-col space-y-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            <a href="https://x.company" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Google X
            </a>
          </h2>
          <p className="text-sm text-gray-600">
            Alphabet’s moonshot factory, where breakthrough technologies are developed to solve some of the world's hardest problems.
          </p>
          <div className="text-base text-gray-700 space-y-2">
            <p className="font-semibold">Sr. Frontend Developer / Lead UI Architect – US Tech Solutions @ Google X</p>
            <p className="text-sm text-gray-600">Mar 2023 – July 2025</p>
            <p>Sole frontend owner across 3 major apps: Factory Interface, Lab UI, and Marketing site. Architected entire Angular codebase using Bazel, gRPC, and Firebase. Built internal visualizations with InfluxDB and Grafana.</p>
          </div>
        </div>
        <div className="text-sm text-gray-700">
          <strong>Demo:</strong> This demo simulates a connected hardware interface reflecting my work at Google X's. It features interactive modules with real-time status updates, dynamic visuals, and subtle animations to mirror the kind of embedded control systems we were designing for lab and factory interfaces.
        </div>
      </div>
      <div className="w-full flex items-center justify-center border rounded-lg shadow p-4 bg-gray-50 overflow-hidden">
        <HardwareDemo />
      </div>
    </div>
  );
}