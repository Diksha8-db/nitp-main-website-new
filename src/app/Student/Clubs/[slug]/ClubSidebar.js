"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClub } from "./ClubProvider";
import { ChevronDown, LayoutDashboard, Users2, Calendar, Contact2 } from "lucide-react";

import Clubs from "@/app/assets/images/clubs.svg";

// Dynamic active/inactive Tailwind styles for sidebar links
const linkClass = (active) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 transform group relative tracking-wide ${
    active
      ? "bg-[rgb(129,25,25)] text-white shadow-lg shadow-[rgba(129,25,25,0.25)] scale-[1.02] before:absolute before:left-0 before:top-1/4 before:h-1/2 before:w-1 before:bg-white/60 before:rounded-r"
      : "text-slate-600 hover:text-[rgb(129,25,25)] hover:bg-[rgba(129,25,25,0.08)] border border-transparent hover:border-[rgba(129,25,25,0.15)] hover:translate-x-1"
  }`;
  
// Renders the club logo, name, and category (supports both mobile and desktop layouts)
function ClubHeader({ club, mobile = false }) {
  const logoSrc = club?.logo || Clubs.src;
  const name = club?.name || "Club";
  const category = club?.category || "Student Club";

  if (mobile) {
    return (
      <div className="flex items-center gap-3 min-w-0 text-left">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-white p-1 shadow-sm overflow-hidden bg-slate-50">
          <img
            src={logoSrc}
            alt={`${name} logo`}
            className="h-full w-full object-cover rounded-full aspect-square"
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-black text-slate-800 tracking-tight leading-tight truncate">
            {name}
          </h3>
          <p className="text-[11px] font-bold text-[rgb(129,25,25)] uppercase tracking-wider mt-0.5 truncate">
            {category}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 border-b border-slate-100 bg-gradient-to-b from-slate-50/50 to-transparent">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-200/80 bg-white p-1 shadow-sm mb-4 transition-transform duration-300 hover:scale-[1.03] overflow-hidden bg-slate-50">
          <img
            src={logoSrc}
            alt={`${name} logo`}
            className="h-full w-full object-cover rounded-full aspect-square"
          />
        </div>
        
        <h2 className="text-base font-black text-slate-800 tracking-tight max-w-[200px] line-clamp-2">
          {name}
        </h2>

        <p className="mt-1 text-[11px] font-bold text-[rgb(129,25,25)] uppercase tracking-wider">
          {category}
        </p>
      </div>
    </div>
  );
}

// Maps over the navigation routes and highlights the active route
function NavLinks({ links, onClick }) {
  const pathname = usePathname();

  return (
    <ul className="space-y-1.5">
      {links.map(({ href, name, icon: Icon }) => {
        const active = pathname === href;

        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onClick}
              className={linkClass(active)}
            >
              {Icon && (
                <Icon 
                  size={18} 
                  className={`transition-transform duration-300 shrink-0 ${
                    active ? "scale-100 text-white" : "text-slate-400 group-hover:text-[rgb(129,25,25)] group-hover:scale-105"
                  }`} 
                />
              )}
              <span className="tracking-wide">{name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

// Collapsible dropdown menu layout for mobile screens (< 768px)
function MobileClubSidebar({ club, links }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-[767px]:hidden w-full mb-6">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all duration-200 active:scale-[0.99]"
      >
        <ClubHeader club={club} mobile />

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-slate-400 ml-2">
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${
              open ? "rotate-180 text-[rgb(129,25,25)]" : ""
            }`}
          />
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open
            ? "max-h-[500px] opacity-100 mt-2"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-2.5">
          <NavLinks
            links={links}
            onClick={() => setOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

// Fixed, sticky sidebar layout for desktop screens (>= 768px)
function DesktopClubSidebar({ club, links }) {
  return (
    <aside className="hidden min-[767px]:flex min-[767px]:w-56 lg:w-64 h-[calc(100vh-2rem)] sticky top-4 border border-slate-200/60 bg-white shadow-sm rounded-lg flex-col overflow-hidden">
      <ClubHeader club={club} />

      <nav className="flex-1 p-4 overflow-y-auto">
        <NavLinks links={links} />
      </nav>
    </aside>
  );
}

// Main component: fetches context and builds dynamic routing configurations
export default function ClubSidebar() {
  const club = useClub();

  // Generates sub-page links dynamically based on the current club context ID
  const links = useMemo(() => {
    if (!club?.id) return [];

    const base = `/Student/Clubs/${club.id}`;

    return [
      { name: "Overview", href: base, icon: LayoutDashboard },
      { name: "Team", href: `${base}/team`, icon: Users2 },
      { name: "Events", href: `${base}/events`, icon: Calendar },
      { name: "Contact", href: `${base}/contact`, icon: Contact2 },
    ];
  }, [club?.id]);

  if (!club?.id) return null;

  return (
    <>
      <MobileClubSidebar club={club} links={links} />
      <DesktopClubSidebar club={club} links={links} />
    </>
  );
}