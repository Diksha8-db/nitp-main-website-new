"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom"; // Imported portal helper
import { MapPin, Clock, Tag, FileText, ExternalLink, ChevronLeft, CalendarDays, Layers, Image as ImageIcon, X, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const EventDetailPage = ({ event }) => {
  const router = useRouter();

  const images = event.gallery;
  const title = event.title || "Untitled Event";

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(null);
  const [mounted, setMounted] = useState(false); // Needed to safety-check SSR execution
  const autoSlideTimer = useRef(null);

  // Handle mounting check for rendering layout portals in Next.js
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const nextLightboxImage = useCallback(() => {
    setFullscreenImageIndex((prev) =>
      prev === null ? prev : prev === images.length - 1 ? 0 : prev + 1
    );
  }, [images.length]);

  const prevLightboxImage = useCallback(() => {
    setFullscreenImageIndex((prev) =>
      prev === null ? prev : prev === 0 ? images.length - 1 : prev - 1
    );
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1 || isPaused || fullscreenImageIndex !== null) return;

    autoSlideTimer.current = setInterval(nextSlide, 3000);
    return () => {
      if (autoSlideTimer.current) clearInterval(autoSlideTimer.current);
    };
  }, [images.length, isPaused, fullscreenImageIndex, nextSlide]);

  const openFullscreen = (index) => {
    setFullscreenImageIndex(index);
  };

  const closeFullscreen = useCallback(() => {
    setFullscreenImageIndex(null);
  }, []);

  useEffect(() => {
    if (fullscreenImageIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [fullscreenImageIndex]);

  useEffect(() => {
    if (fullscreenImageIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeFullscreen();
      if (e.key === "ArrowRight") nextLightboxImage();
      if (e.key === "ArrowLeft") prevLightboxImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullscreenImageIndex, closeFullscreen, nextLightboxImage, prevLightboxImage]);

  const handleSliderKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    }
  };

  if (images.length === 0) {
    return (
      <div className="w-full h-[40vh] flex items-center justify-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <div className="text-center space-y-2">
          <ImageIcon className="h-8 w-8 text-slate-300 mx-auto" aria-hidden="true" />
          <p className="text-slate-500 text-sm font-medium">
            No media assets found for this event.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6 bg-slate-50/30 min-h-screen antialiased">
      <div
        role="region"
        aria-label={`${title} image gallery`}
        tabIndex={0}
        onKeyDown={handleSliderKeyDown}
        className="relative w-full aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/7] max-h-[420px] rounded-xl border border-slate-200/70 bg-slate-950 overflow-hidden shadow-xl group transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="w-full h-full relative">
          {images.map((imgUrl, idx) => (
            <div
              key={idx}
              onClick={() => openFullscreen(idx)}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out cursor-pointer ${
                idx === currentIdx
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-100 pointer-events-none"
              }`}
            >
              <img
                src={imgUrl}
                alt={`${title} slider view ${idx + 1}`}
                loading={idx === 0 ? "eager" : "lazy"}
                className="w-full h-full object-cover select-none object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
            </div>
          ))}
        </div>

        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900/70 backdrop-blur-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white border border-white/10 shadow-sm">
            <Tag className="h-3 w-3 text-red-400" aria-hidden="true" />
            {event.category}
          </span>
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full bg-slate-900/40 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition duration-300 hover:bg-white hover:text-slate-900 shadow-md border border-white/10"
            >
              <ChevronLeft size={16} className="stroke-[2.5]" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full bg-slate-900/40 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition duration-300 hover:bg-white hover:text-slate-900 shadow-md border border-white/10"
            >
              <ChevronRight size={16} className="stroke-[2.5]" />
            </button>
          </>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-4 left-6 z-10 flex items-center gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to image ${idx + 1}`}
                aria-current={idx === currentIdx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIdx(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                  idx === currentIdx
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* DETAILS BREAKDOWN BLOCK */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-12 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6">
            <h1 className="text-2xl font-black text-slate-900 sm:text-3xl tracking-tight leading-snug">
              {title}
            </h1>

            <div className="h-px w-full bg-slate-100" />

            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <Layers className="h-3.5 w-3.5" aria-hidden="true" /> Description
              </h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed font-normal whitespace-pre-line">
                {event.description || "No description has been added for this event yet."}
              </p>
            </div>
          </div>
        </div>

        {/* SIDEBAR METADATA */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">
          <div className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Event Details</h3>
                <p className="mt-1 text-xs text-slate-500">
                  A quick overview of this event.
                </p>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                <CalendarDays className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>

            <div className="space-y-3">
              {[
                { icon: CalendarDays, label: "Usually Held", value: event.usually_held },
                { icon: Clock, label: "Typical Duration", value: event.duration },
                { icon: MapPin, label: "Usual Venue", value: event.venue },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-700">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-sm font-semibold leading-relaxed text-slate-800">
                        {item.value || "Not specified"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-800 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-red-900"
                onClick={() => {
                  if (event?.link) window.open(event.link, "_blank", "noopener,noreferrer");
                }}
              >
                View Details
                <ExternalLink
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                />
              </button>
            </div>
          </div>

          {/* ATTACHMENTS BRIEFINGS */}
          {event.attachments && event.attachments.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-100 p-5 space-y-3 shadow-sm">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Attachments
              </h4>
              <div className="space-y-2">
                {event.attachments.map((file, i) => (
                  <a
                    key={i}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-red-50/50 hover:border-red-100 text-slate-700 transition duration-300 group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-red-700 transition-colors" aria-hidden="true" />
                      <span className="text-xs font-bold text-slate-700 truncate group-hover:text-slate-900">
                        {file.title}
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-red-700 uppercase tracking-widest px-2 py-0.5 bg-white border border-slate-200 rounded shadow-sm shrink-0 ml-2">
                      {(file?.type?.trim() || "pdf").toUpperCase()}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- PORTALIZED LIGHTBOX LAYOUT --- */}
      {mounted && fullscreenImageIndex !== null && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image viewer`}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-slate-950/95 p-4 backdrop-blur-md transition-all duration-300"
          onClick={closeFullscreen}
        >
          <button
            type="button"
            aria-label="Close image viewer"
            className="absolute top-4 right-4 z-[1000000] h-10 w-10 flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition"
            onClick={closeFullscreen}
          >
            <X size={18} />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  prevLightboxImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[1000000] h-11 w-11 flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  nextLightboxImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[1000000] h-11 w-11 flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <div
            className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[fullscreenImageIndex]}
              alt={`${title} zoomed view ${fullscreenImageIndex + 1}`}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <span className="text-white text-sm font-bold tracking-tight">{title}</span>
              <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                Image {fullscreenImageIndex + 1} of {images.length}
              </span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default EventDetailPage;