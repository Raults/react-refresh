"use client";

import { useState } from "react";
import { Plane, Calendar, MapPin, CheckCircle, Undo2 } from "lucide-react";

export default function DeltaFlightDemo() {
    const [selectedFlight, setSelectedFlight] = useState<number | null>(null);
    const [isBooked, setIsBooked] = useState(false);

    const flights = [
        { flight: "DL 2025", time: "9:00 AM → 11:30 AM", price: "$159" },
        { flight: "DL 1403", time: "12:00 PM → 2:30 PM", price: "$172" },
        { flight: "DL 763", time: "5:45 PM → 8:10 PM", price: "$181" },
    ];

    const handleFlightClick = (index: number) => {
        setSelectedFlight(index);
    };

    const handleContinue = () => {
        if (selectedFlight !== null) setIsBooked(true);
    };

    const handleReset = () => {
        setSelectedFlight(null);
        setIsBooked(false);
    };

    return (
        <div className="max-w-xs mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 font-sans text-[#1a1a1a]">
            {/* Header */}
            <div className="bg-[#C8102E] text-white text-center py-4 px-6 font-bold text-lg tracking-wide">
                <div className="flex items-center justify-center gap-2">
                    <Plane className="w-5 h-5" />
                    <span>{isBooked ? "Flight Confirmed" : "Delta Flight Picker"}</span>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {isBooked ? (
                    // ✅ Flight Booked View
                    <div className="text-center space-y-4">
                        <CheckCircle className="w-12 h-12 mx-auto text-green-500" />
                        <h2 className="text-xl font-semibold">Flight Booked!</h2>
                        {selectedFlight !== null && (
                            <p className="text-sm text-gray-600">
                                {flights[selectedFlight].flight} <br />
                                {flights[selectedFlight].time} <br />
                                <span className="font-semibold">{flights[selectedFlight].price}</span>
                            </p>
                        )}
                        <button
                            onClick={handleReset}
                            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#C8102E] text-white rounded-full hover:bg-red-700 transition cursor-pointer"
                        >
                            <Undo2 className="w-4 h-4" />
                            Book New Flight
                        </button>
                    </div>
                ) : (
                    // ✈️ Flight Selection View
                    <>
                        {/* From/To */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <MapPin className="text-gray-500 w-5 h-5" />
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">From</span>
                                    <span className="text-base font-medium">Atlanta (ATL)</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <MapPin className="text-gray-500 w-5 h-5 rotate-180" />
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">To</span>
                                    <span className="text-base font-medium">New York (JFK)</span>
                                </div>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-3">
                            <Calendar className="text-gray-500 w-5 h-5" />
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-500">Departure Date</span>
                                <span className="text-base font-medium">July 15, 2025</span>
                            </div>
                        </div>

                        {/* Flights */}
                        <div className="space-y-3">
                            {flights.map((f, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleFlightClick(i)}
                                    className={`border rounded-xl px-4 py-3 transition cursor-pointer ${selectedFlight === i
                                            ? "border-[#C8102E] bg-[#C8102E]/10 ring-2 ring-[#C8102E]/40"
                                            : "border-gray-200 hover:shadow-md"
                                        }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{f.flight}</p>
                                            <p className="text-sm text-gray-600">{f.time}</p>
                                        </div>
                                        <p className="font-semibold text-[#C8102E]">{f.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Footer */}
            {!isBooked && (
                <div className="bg-gray-50 p-4 text-center">
                    <button
                        onClick={handleContinue}
                        disabled={selectedFlight === null}
                        className={`w-full py-2 rounded-full font-medium text-white transition cursor-pointer ${selectedFlight !== null
                                ? "bg-[#C8102E]"
                                : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Continue
                    </button>
                </div>
            )}
        </div>
    );
}
