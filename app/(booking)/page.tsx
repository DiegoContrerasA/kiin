import Apartments from "@/components/booking/search/aparments";
import Disclaimer from "@/components/booking/search/disclaimer";
import EmptySearch from "@/components/booking/search/empty";
import EmptyStateIcon from "@/components/icons/empty-state";
import { Suspense } from "react";


interface HomeParams {
  searchParams: Promise<{
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
  }>
};

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: HomeParams) {
  const params = await searchParams;

  if (!params.checkIn || !params.checkOut || !params.adults || !params.children) {
    return <EmptySearch />
  }

  return (
    <Suspense key={JSON.stringify(params)} fallback={<div>Loading...</div>}>
      <Apartments
        params={params}
      />
    </Suspense>
  )
}
