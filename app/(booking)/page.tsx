import Apartments from "@/components/booking/search/aparments";
import EmptySearch from "@/components/booking/search/empty";
import RoomSkeleton from "@/components/booking/search/room-skeleton";
import { Suspense } from "react";

interface HomeParams {
  searchParams: Promise<{
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
  }>
};

export default async function Home({ searchParams }: HomeParams) {
  const params = await searchParams;

  if (!params.checkIn || !params.checkOut || !params.adults || !params.children) {
    return <EmptySearch />
  }

  return (
    <Suspense key={JSON.stringify(params)} fallback={<RoomSkeleton />}>
      <Apartments
        params={params}
      />
    </Suspense>
  )
}
