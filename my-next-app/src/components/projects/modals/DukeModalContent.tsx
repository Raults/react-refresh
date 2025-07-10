"use client";

import PlotDemo from "../demos/PlotDemo";

export default function DukeModalContent() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2 flex flex-col space-y-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            <a href="https://www.duke-energy.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Duke Energy
            </a>
          </h2>
          <p className="text-sm text-gray-600">
            One of the largest electric power holding companies in the U.S., serving millions of customers across the Southeast and Midwest.
          </p>
          <div className="text-base text-gray-700 space-y-2">
            <p className="font-semibold">Project Lead / Sr. Frontend Developer</p>
            <p className="text-sm text-gray-600">Mar 2022 – Feb 2023</p>
            <p>Spearheaded UI modernization project, rebuilt architecture from scratch, and led the frontend team. Designed and delivered custom data visualization systems using Angular and Material.</p>
          </div>
        </div>
        <div className="text-sm text-gray-700">
          <strong>Demo:</strong> This is a general charting demo built to show my data visualization skills. It's styled after Duke University's branding and showcases my ability to design polished, readable chart interfaces using tools like Chart.js.
        </div>
      </div>
      <div className="w-full flex items-center justify-center border rounded-lg shadow p-4 bg-gray-50 overflow-hidden">
        <PlotDemo />
      </div>
    </div>
  );
}