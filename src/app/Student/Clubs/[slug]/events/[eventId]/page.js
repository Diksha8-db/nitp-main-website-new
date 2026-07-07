"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import EventDetailPage from "./EventDetailPage";
import { getEvent } from "../../../services/clubService";
import Loading from "@/app/Loading";

export default function EventPage() {
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) return;

    async function loadEvent() {
      try {
        const data = await getEvent(eventId);
        console.log(data);
        setEvent(data);
      } catch (error) {
        console.error("Failed to load event:", error);
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [eventId]);

  if (loading) return <Loading />

  return <EventDetailPage event={event} />;
}
