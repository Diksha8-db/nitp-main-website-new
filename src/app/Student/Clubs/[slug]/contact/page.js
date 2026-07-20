"use client";

import NotFound from "@/app/not-found";
import { useClub } from "../ClubProvider";
import ClubContact from './ClubContact';

export default function ContactPage(){
  const club = useClub();
  if (!club) return <NotFound />;
  return <ClubContact club={club} />;
}
