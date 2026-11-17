import SearchResultsPage from "./components/SearchResultsPage";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;

  return <SearchResultsPage initialQuery={params.q ?? ""} />;
}