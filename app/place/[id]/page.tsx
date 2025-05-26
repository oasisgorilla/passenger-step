import { destinations } from "@/lib/data"
import PlaceModal from "@/components/place-modal"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const destination = destinations.find((d) => d.id === id)
  if (!destination) return null

  return <PlaceModal destination={destination} />
}