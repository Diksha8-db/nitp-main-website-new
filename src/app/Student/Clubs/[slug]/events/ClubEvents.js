"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, X, ChevronLeft, ChevronRight, Maximize2, ArrowRight } from "lucide-react";

const ClubEvents = ({ clubEvents, club }) => {
  const router = useRouter();
  
  // State tracking the index of the currently opened fullscreen image modal
  const [selectedIndex, setSelectedIndex] = useState(null);
  const events = Array.isArray(clubEvents) ? clubEvents : [];
  const clubId = club?.id;

  // Modal navigation handlers
  const openPoster = (e, index) => {
    e.stopPropagation(); // Prevents navigating to the details page when clicking fullscreen button
    setSelectedIndex(index);
  };

  const closePoster = () => setSelectedIndex(null);

  const nextPoster = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % events.length);
  };

  const previousPoster = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  // Listens for keyboard shortcuts (Esc, Left, Right) to navigate the modal
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closePoster();
      if (e.key === "ArrowRight") nextPoster();
      if (e.key === "ArrowLeft") previousPoster();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  return (
    <section className="w-full px-4 py-4 sm:px-6">
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-6 md:p-8">
        
        {/* Header Section */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                {club?.name || "Club"} Events
              </h1>

              <p className="text-sm text-slate-500">
                Explore the club's events, workshops, competitions, and
                community initiatives.
              </p>
            </div>
          </div>
        </div>

        {/* Events Grid / Empty State conditional wrapper */}
        {events.length ? (
          <div className="relative z-10 mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <div
                key={event.id || index}
                onClick={() =>
                  router.push(`/Student/Clubs/${clubId}/events/${event.id}`)
                }
                className="group cursor-pointer flex flex-col overflow-hidden rounded-xl border border-slate-200/60 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300"
              >
                {/* Event Poster Area */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 border-b border-slate-100">
                  <img
                    src={event.poster}
                    alt={event.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 transition-opacity duration-200" />

                  <div className="absolute top-3 left-3">
                    <span className="rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm border border-white/10">
                      {event.category || "Event"}
                    </span>
                  </div>

                  <button
                    onClick={(e) => openPoster(e, index)}
                    className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-slate-900 hover:text-white hover:border-slate-900"
                    title="Fullscreen Poster View"
                  >
                    <Maximize2 size={12} className="stroke-[2.5]" />
                  </button>
                </div>

                {/* Event Meta Details Card */}
                <div className="flex flex-col justify-between flex-1 p-5 space-y-4">
                  <div className="space-y-1">
                    <h3 className="line-clamp-1 text-sm font-bold text-slate-800 transition-colors duration-200 tracking-tight">
                      {event.title}
                    </h3>
                    <p className="line-clamp-2 text-xs text-slate-700 leading-relaxed font-normal">
                      {event.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-red-600">
                    <span>View Details</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State fallback view when no events exist */
          <div className="mt-8 flex flex-col items-center justify-center rounded-xl p-8 text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <CalendarDays className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-bold tracking-tight text-slate-900">
              Data Unavailable
            </h2>

            <p className="mt-2 max-w-xs text-xs font-medium leading-relaxed text-slate-400">
              Event details will be available soon.
            </p>
          </div>
        )}
      </div>

      {/* Fullscreen Poster Modal Overlay */}
      {selectedIndex !== null && (
        <div
          onClick={closePoster}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950/95 p-4 backdrop-blur-md transition-all duration-300"
        >
          {/* Modal Header controls */}
          <div className="w-full max-w-[85vh] flex justify-between items-center mb-3 text-white">
            <span className="text-xs font-bold tracking-wide text-slate-300 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
              {selectedIndex + 1} / {events.length} —{" "}
              {events[selectedIndex].title}
            </span>
            <button
              onClick={closePoster}
              className="rounded-xl bg-white/5 border border-white/10 p-2.5 text-white transition hover:bg-white/10 hover:text-red-400 active:scale-95"
            >
              <X size={18} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Modal Media & Navigation Carousel */}
          <div className="relative flex items-center justify-center w-full max-w-5xl">
            {events.length > 1 && (
              <>
                <button
                  onClick={previousPoster}
                  className="absolute -left-2 sm:left-4 z-20 rounded-xl bg-slate-900/60 border border-slate-800 p-3 text-white transition hover:bg-slate-800 active:scale-95"
                >
                  <ChevronLeft size={20} className="stroke-[2.5]" />
                </button>
                <button
                  onClick={nextPoster}
                  className="absolute -right-2 sm:right-4 z-20 rounded-xl bg-slate-900/60 border border-slate-800 p-3 text-white transition hover:bg-slate-800 active:scale-95"
                >
                  <ChevronRight size={20} className="stroke-[2.5]" />
                </button>
              </>
            )}

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative overflow-hidden shadow-2xl rounded-2xl bg-black max-h-[75vh]"
            >
              <img
                src={events[selectedIndex].poster}
                alt={events[selectedIndex].title}
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ClubEvents;