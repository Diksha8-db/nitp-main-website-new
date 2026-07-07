"use client";

import Link from "next/link";
import { Mail, Award, ArrowRight, Globe, Linkedin, Instagram, Twitter, Send } from "lucide-react";
import Clubs from "@/app/assets/images/clubs.svg"

const ClubHero = ({ club }) => {
  console.log(club);

  const name = club?.name || "Club";

  const AboutText = club?.about?.trim();
  const aboutPreview = AboutText ? AboutText.split(" ").slice(0, 60).join(" ") + (AboutText.split(" ").length > 60 ? "..." : "") : "";

  const stats = [
    { label: "Members", value: club?.members },
    { label: "Events", value: club?.events },
    { label: "Awards", value: club?.awards },
  ].filter((stat) => stat.value != null && stat.value > 0);

  // ---- Social links, sourced from club.social_links (API) ----
  // Supports both `social_links` and `socialLinks`; falls back gracefully.
  const socials = club?.social_links || club?.socialLinks || {};
  const socialEntries = [
    {
      key: "email",
      label: "Email",
      handle: club?.email,
      href: club?.email ? `mailto:${club.email}` : null,
      icon: Mail,
      color: "from-red-50 to-red-100",
      iconColor: "text-red-700",
      hover: "hover:border-red-300 hover:shadow-red-200/60",
    },
    {
      key: "website",
      label: "Website",
      handle: socials.website,
      href: socials.website,
      icon: Globe,
      color: "from-stone-50 to-stone-100",
      iconColor: "text-stone-700",
      hover: "hover:border-stone-300 hover:shadow-stone-200/60",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      handle: socials.linkedin,
      href: socials.linkedin,
      icon: Linkedin,
      color: "from-blue-50 to-blue-100",
      iconColor: "text-blue-700",
      hover: "hover:border-blue-300 hover:shadow-blue-200/60",
    },
    {
      key: "instagram",
      label: "Instagram",
      handle: socials.instagram,
      href: socials.instagram,
      icon: Instagram,
      color: "from-pink-50 to-rose-100",
      iconColor: "text-rose-700",
      hover: "hover:border-rose-300 hover:shadow-rose-200/60",
    },
    {
      key: "twitter",
      label: "Twitter / X",
      handle: socials.twitter,
      href: socials.twitter,
      icon: Twitter,
      color: "from-sky-50 to-sky-100",
      iconColor: "text-sky-700",
      hover: "hover:border-sky-300 hover:shadow-sky-200/60",
    },
  ].filter((s) => s.handle);

  // Trim "https://" for display only — link keeps the full URL.
  const prettifyHandle = (url) => {
    if (!url) return "";
    if (url.startsWith("mailto:")) return url.replace("mailto:", "");
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  };

  return (
    <section className="relative overflow-hidden min-h-fit rounded-3xl border border-stone-200 bg-gradient-to-br from-white via-stone-50 to-red-50/30 shadow-xl pb-8">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-700/5 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-red-800/5 blur-2xl" />
      <div className="relative flex flex-col p-6 min-h-full md:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-5">
            <div className="shrink-0">
              <img
                src={club?.logo || Clubs?.src}
                alt={name}
                loading="lazy"
                className="h-20 w-20 rounded-2xl object-cover md:h-24 md:w-24"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="mt-2 break-words text-2xl font-extrabold tracking-tight text-stone-900 md:text-3xl lg:text-4xl">
                {name}
              </h1>
              <div className="mt-3 max-w-full">
                <p className="break-words text-xs leading-relaxed text-stone-600 md:text-sm">
                  {club?.description ||
                    "A student-led club fostering innovation, collaboration, leadership, and professional growth."}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Badge */}
          {stats.length > 0 && (
            <div className="flex gap-3 lg:flex-col">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white/80 backdrop-blur-sm px-4 py-2 shadow-sm"
                >
                  <span className="text-xl font-black text-red-700 md:text-2xl">
                    {stat.value}
                  </span>
                  <span className="text-sm font-medium text-stone-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* About Club Section */}
        {aboutPreview && (
          <div className="mt-10 md:mt-12">
            <div className="mb-6 flex items-center gap-4 md:mb-8">
              <div className="flex items-center gap-2 rounded-lg bg-red-700 px-3 py-1.5">
                <Award className="h-4 w-4 text-white" />
                <span className="text-sm font-bold uppercase tracking-wider text-white">
                  About Club
                </span>
              </div>

              <div className="h-px flex-1 bg-gradient-to-r from-stone-300 to-transparent" />

              <Link
                href={`/Student/Clubs/${club?.slug}/about`}
                className="group inline-flex items-center gap-1 text-xs font-semibold text-red-700 transition-colors hover:text-red-800"
              >
                Read more
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-md border border-red-100 bg-white p-5 shadow-sm shadow-red-900/10 md:p-6">
              <p className="break-words text-sm leading-relaxed text-stone-600">
                {aboutPreview}
              </p>
            </div>
          </div>
        )}

        {/* Contact Us Section */}
        {socialEntries.length > 0 && (
          <div className="mt-10 md:mt-12">
            <div className="mb-6 flex items-center gap-4 md:mb-8">
              <div className="flex items-center gap-2 rounded-lg bg-red-700 px-3 py-1.5">
                <Send className="h-4 w-4 text-white" />
                <span className="text-sm font-bold uppercase tracking-wider text-white">
                  Contact Us
                </span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-stone-300 to-transparent" />
              {club?.email && (
                <a
                  href={`mailto:${club.email}`}
                  className="group inline-flex items-center gap-1 text-xs font-semibold text-red-700 transition-colors hover:text-red-800"
                >
                  Send a message
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {socialEntries.map((s) => {
                const Icon = s.icon;
                const isMail = s.key === "email";
                const externalProps = isMail
                  ? {}
                  : {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    };

                return (
                  <a
                    key={s.key}
                    href={s.href}
                    {...externalProps}
                    className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-5 ${s.hover}`}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} border border-white shadow-inner transition-transform group-hover:scale-110 md:h-12 md:w-12`}
                    >
                      <Icon className={`h-5 w-5 md:h-6 md:w-6 ${s.iconColor}`} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 md:text-xs">
                        {s.label}
                      </p>
                      <p className="mt-0.5 truncate text-sm font-semibold text-stone-800 md:text-base">
                        {prettifyHandle(s.handle)}
                      </p>
                    </div>

                    <ArrowRight className="h-4 w-4 shrink-0 text-stone-300 transition-all group-hover:translate-x-1 group-hover:text-red-600" />
                  </a>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex-grow" />
        <div className="mt-8 flex flex-col gap-4 border-t border-stone-200 pt-6 sm:flex-row sm:items-center sm:justify-between md:mt-10">
          <div className="flex items-center gap-2 text-sm font-medium text-stone-500">
            <span className="h-2 w-2 rounded-full bg-red-600" />
            <span>NITP Student Club</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubHero;
