import { destinations } from "@/lib/data"
import PlaceModal from "@/components/place-modal"

export default async function Page({ params }: { params: { id: string } }) {
  const destination = destinations.find((d) => d.id === params.id)
  if (!destination) return null

  return <PlaceModal destination={destination} />
}