"use client";

import React, { useState, useMemo } from "react";
import { History, Inbox, ChevronDown } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const ClubTeam = ({ club }) => {
  const [isLegacyOpen, setIsLegacyOpen] = useState(false);

  const sessionKeys = useMemo(() => {
    const memberSessions = club?.members && typeof club.members === "object" ? club.members : {};
    return Object.keys(memberSessions).sort((a, b) => b.localeCompare(a));
  }, [club?.members]);

  const currentSessionKey = sessionKeys[0] || null;
  const legacySessionKeys = sessionKeys.slice(1);
  const [selectedLegacyYear, setSelectedLegacyYear] = useState(legacySessionKeys[0] || "");

  const extractMembersFromSession = (sessionKey) => {
    if (!club?.members || !sessionKey || !club.members[sessionKey]) return [];
    const targetSession = club.members[sessionKey];

    return [
      {
        role: "Patna Campus PI",
        name: targetSession.patna_campus_pi?.name,
        email: targetSession.patna_campus_pi?.email,
        department: targetSession.patna_campus_pi?.department,
        image: targetSession.patna_campus_pi?.avatar,
      },
      {
        role: "Bihta Campus PI",
        name: targetSession.bihta_campus_pi?.name,
        email: targetSession.bihta_campus_pi?.email,
        department: targetSession.bihta_campus_pi?.department,
        image: targetSession.bihta_campus_pi?.avatar,
      },
      {
        role: "President",
        name: targetSession.president?.name,
        email: targetSession.president?.email,
        department: targetSession.president?.department,
        image: targetSession.president?.avatar,
      },
      {
        role: "Secretary",
        name: targetSession.secretary?.name,
        email: targetSession.secretary?.email,
        department: targetSession.secretary?.department,
        image: targetSession.secretary?.avatar,
      },
    ].filter((m) => m.name);
  };

  const currentMembers = extractMembersFromSession(currentSessionKey);
  const legacyMembers = extractMembersFromSession(selectedLegacyYear);

  const MemberCard = (member, index) => {
    return (
      <div
        key={`${member.role}-${index}-${member.name}`}
        className="w-full max-w-[310px] h-[350px] bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 border border-gray-100 flex flex-col justify-between relative"
      >

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-7 bg-red-700 rounded-b-lg opacity-90 flex items-center justify-center z-10 px-2">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white truncate">
            {member.role}
          </span>
        </div>

        <div className="bg-gradient-to-b from-gray-50 to-white pt-10 pb-2 relative mt-2">
          <div className="w-[130px] h-[130px] mx-auto relative">
            <div className="absolute inset-0 rounded-full bg-white p-0.5">
              <div className="w-full h-full rounded-full p-2 bg-red-100/30 backdrop-blur-sm border-2 border-red-400/40 shadow-md flex items-center justify-center overflow-hidden">
                <img
                  src={member.image || "/faculty.jpeg"}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full transition-all duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/faculty.jpeg";
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-black px-4 pb-5 pt-1 text-center flex-1 flex flex-col justify-between min-w-0">
          <div className="min-w-0">
            <h3
              className="text-base sm:text-lg font-bold text-gray-800"
              title={member.name}
            >
              {member.name}
            </h3>
            {member.department && (
              <p
                className="text-xs sm:text-sm font-semibold text-red-700 tracking-tight mt-0.5"
                title={member.department}
              >
                {member.department}
              </p>
            )}
          </div>

          {member.email && (
            <div className="w-full px-2 mt-auto min-w-0">
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-all duration-300 w-full"
                title={member.email}
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="w-3.5 h-3.5 text-blue-500 shrink-0"
                />
                <span className="truncate block max-w-full">
                  {member.email}
                </span>
              </a>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="w-full px-4 py-4 sm:px-6">
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Members of {club?.name || "Club"}
            </h1>

            <p className="text-sm text-slate-500">
              Faculty mentors and student leaders driving our club forward.
            </p>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          {currentMembers.length === 0 ? (
            <div className="flex min-h-[140px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 p-6 text-center">
              <h3 className="text-xs font-bold text-slate-800">
                Nothing to Show
              </h3>
              <p className="text-[11px] text-slate-500 max-w-xs mt-0.5">
                No member details available at this moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center w-full">
              {currentMembers.map((member, index) => MemberCard(member, index))}
            </div>
          )}
        </div>
        {legacySessionKeys.length > 0 && (
          <div className="mt-10 pt-6 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setIsLegacyOpen((prev) => !prev)}
                className="flex items-center gap-2.5 text-slate-400 hover:text-slate-600 transition-colors text-left"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-slate-500 border border-slate-200">
                  <History size={13} />
                </div>
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wide text-slate-800">
                    Legacy Team
                  </h2>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIsLegacyOpen((prev) => !prev)}
                className={`flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-600 transition-transform duration-300 ${
                  isLegacyOpen ? "rotate-180" : ""
                }`}
              >
                <ChevronDown size={14} />
              </button>
            </div>

            {isLegacyOpen && (
              <div className="animate-fadeIn space-y-6">
                <div className="flex flex-col items-center gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Select Session
                  </p>

                  <div className="relative w-full max-w-xs">
                    <select
                      id="legacy-year-select"
                      value={selectedLegacyYear}
                      onChange={(e) => setSelectedLegacyYear(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 focus:border-red-300 focus:outline-none focus:ring-4 focus:ring-red-50"
                    >
                      {legacySessionKeys.map((year) => (
                        <option key={year} value={year}>
                          Session {year}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                {legacyMembers.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center w-full">
                    {legacyMembers.map((member, index) =>
                      MemberCard(member, index),
                    )}
                  </div>
                ) : (
                  <div className="flex min-h-[140px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 p-6 text-center">
                    <Inbox className="h-5 w-5 text-slate-300" />
                    <p className="text-[11px] text-slate-400 mt-1">
                      No records found for selected Session.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ClubTeam;
