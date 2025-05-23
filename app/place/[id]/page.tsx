import { destinations } from "@/lib/data"
import PlaceModal from "@/components/place-modal"

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const destination = destinations.find((d) => d.id === params.id)
  if (!destination) return null

  return <PlaceModal destination={destination} />
}