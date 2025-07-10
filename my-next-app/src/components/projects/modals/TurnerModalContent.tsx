"use client";

import ClipAndShipDemo from "../demos/ClipAndShipDemo";

export default function TurnerModalContent() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2 flex flex-col space-y-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            <a href="https://www.warnermediagroup.com/company/turner" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Turner Broadcasting
            </a>
          </h2>
          <p className="text-sm text-gray-600">
            A major media conglomerate responsible for channels like CNN, TBS, TNT, and Cartoon Network.
          </p>
          <div className="text-base text-gray-700 space-y-2">
            <p className="font-semibold">Developer I</p>
            <p className="text-sm text-gray-600">2016 – 2017</p>
            <p>Contributed to web development efforts across Turner properties. Focused on frontend enhancements and iterative improvements under senior engineering guidance.</p>
          </div>
        </div>
        <div className="text-sm text-gray-700">
          <strong>Demo:</strong> Inspired by lightweight video editing workflows, this demo showcases an interface for creating and saving video clips with thumbnail previews and timeline snapping. It reflects my skills in canvas manipulation, video playback APIs, and slick UI flows.
        </div>
      </div>
      <div className="w-full flex items-center justify-center border rounded-lg shadow p-4 bg-gray-50 overflow-hidden">
        <ClipAndShipDemo />
      </div>
    </div>
  );
}