"use client";

import NotFound from "@/app/not-found";
import React from "react";
import { Sparkles, Calendar, Layers, Users2 } from "lucide-react";
import { useClub } from "../ClubProvider";

export default function AboutPage() {
  const club = useClub();
  if (!club) return <NotFound />;

  const name = club.name || "Our Community";
  const establishedYear = club.established_year || "1999";
  const activeMembers = club.active_members || "0";
  const eventsOrganized = club.events_organized || "0";

  const stats = [
    {
      label: "Established",
      val: establishedYear,
      desc: "Year of deployment",
      icon: Calendar,
    },
    {
      label: "Events Organized",
      val: eventsOrganized,
      desc: "Completed milestones",
      icon: Layers,
    },
    {
      label: "Active Members",
      val: activeMembers,
      desc: "Active directory size",
      icon: Users2,
    },
  ];

  if (!club.about?.trim()) return <NotFound />;

  return (
    <section className="mx-auto min-h-[80vh] w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 antialiased">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-6 sm:p-10 lg:p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-red-500/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 border border-red-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red-700">
              <Sparkles className="h-3.5 w-3.5 text-red-600" aria-hidden="true" />
              Who We Are
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              About The {name}
            </h1>
            <div className="h-0.5 w-12 bg-red-300 rounded-full mx-auto" />
          </div>
          <div className="prose prose-slate max-w-none">
            <p className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-slate-700 font-normal text-center sm:text-left">
              {club.about}
            </p>
          </div>
          <div className="pt-6 border-t border-slate-100 grid gap-4 grid-cols-1 sm:grid-cols-3">
            {stats.map((card) => {
              const IconComponent = card.icon;
              return (
                <div 
                  key={card.label} 
                  className="group relative overflow-hidden rounded-xl border border-slate-200/60 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      {card.label}
                    </span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-700 group-hover:bg-red-100 group-hover:text-red-800 transition-colors duration-200">
                      <IconComponent className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <span className="block text-xl font-black text-slate-900 tracking-tight">
                      {card.val}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium mt-0.5 block">
                      {card.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}