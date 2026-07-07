"use client";

import NotFound from "@/app/not-found";
import { useClub } from "./ClubProvider";
import ClubHero from "./ClubHero";

export default function ClubPage(){
  const club = useClub();

  if (!club) return <NotFound />;
  return <ClubHero club={club} />;
};
