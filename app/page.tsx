interface HomeParams {
  searchParams: Promise<{
    checkin?: string;
    checkout?: string;
    childrens?: string;
    adults?: string;
  }>
};

export default async function Home({ searchParams }: HomeParams) {
  const { checkin, checkout, childrens, adults } = await searchParams;
  return (
    <pre>
      <h1>Home</h1>
      {JSON.stringify({ checkin, checkout, childrens, adults }, null, 2)}
    </pre>
  );
}
