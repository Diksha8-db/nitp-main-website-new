"use client";

import NotFound from "@/app/not-found";
import { useClub } from "../ClubProvider";
import ClubTeam from './ClubTeam';

export default function TeamPage(){
  const club = useClub();
 
  if (!club)  return <NotFound />;

  return <ClubTeam club={club} />;
}