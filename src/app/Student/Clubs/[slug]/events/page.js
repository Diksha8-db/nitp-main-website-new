"use client";

import Loading from "@/app/Loading";
import NotFound from "@/app/not-found";
import { useEffect, useState } from "react";
import { useClub } from "../ClubProvider";
import ClubEvents from "./ClubEvents";
import { getEvents } from "../../services/clubService";

export default function EventPage() {
  const club = useClub();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!club?.id) return;

    async function loadEvents() {
      try {
        const data = await getEvents(club.id);
        setEvents(data);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, [club?.id]);

  if (!club) return <NotFound />;
  if (loading) return <Loading />;

  return <ClubEvents clubEvents={events} club={club} />;
}
