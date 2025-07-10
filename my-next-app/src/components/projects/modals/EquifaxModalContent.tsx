"use client";

import MockDocumentParserDemo from "../demos/MockDocumentParserDemo";

export function EquifaxModalContent() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2 flex flex-col space-y-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            <a href="https://www.equifax.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Equifax
            </a>
          </h2>
          <p className="text-sm text-gray-600">
            A global data, analytics, and technology company helping financial institutions and individuals make critical decisions.
          </p>
          <div className="text-base text-gray-700 space-y-2">
            <p className="font-semibold">Full-Stack Developer</p>
            <p className="text-sm text-gray-600">Dec 2020 – Jul 2021</p>
            <p>Created internal SDKs and integrated AWS/GCP identity solutions. Modernized legacy internal tools with Angular and Java, delivering modern, scalable replacements.</p>
          </div>
        </div>
        <div className="text-sm text-gray-700">
          <strong>Demo:</strong> This flow mirrors a consumer-facing experience I built while working with Equifax. It simulates how a user might upload documents to complete identity or credit information, with form validation, visual cues, and a snappy UX that hints at what I delivered for their internal systems.
        </div>
      </div>
      <div className="w-full flex items-center justify-center border rounded-lg shadow p-4 bg-gray-50 overflow-hidden">
        <MockDocumentParserDemo />
      </div>
    </div>
  );
}