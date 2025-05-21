export interface Coordinates {
  x: number // percentage from left
  y: number // percentage from top
}

export interface DestinationPin {
  id: string
  title: string
  coordinates: Coordinates
}

export interface Region {
  id: string
  name: string
  destinations: DestinationPin[]
}

export interface Destination {
  id: string
  title: string
  location: string
  shortDescription: string
  description: string
  image: string
  rating: number
  duration: string
  highlights: string[]
  bestTimeToVisit: string
}

export const regions: Region[] = [
  {
    id: "asia",
    name: "Asia",
    destinations: [
      {
        id: "tokyo",
        title: "Tokyo",
        coordinates: { x: 30, y: 40 },
      },
      {
        id: "bali",
        title: "Bali",
        coordinates: { x: 60, y: 70 },
      },
      {
        id: "seoul",
        title: "Seoul",
        coordinates: { x: 45, y: 30 },
      },
      {
        id: "bangkok",
        title: "Bangkok",
        coordinates: { x: 50, y: 60 },
      },
    ],
  },
  {
    id: "europe",
    name: "Europe",
    destinations: [
      {
        id: "paris",
        title: "Paris",
        coordinates: { x: 35, y: 35 },
      },
      {
        id: "rome",
        title: "Rome",
        coordinates: { x: 55, y: 55 },
      },
      {
        id: "barcelona",
        title: "Barcelona",
        coordinates: { x: 25, y: 60 },
      },
      {
        id: "santorini",
        title: "Santorini",
        coordinates: { x: 70, y: 70 },
      },
    ],
  },
  {
    id: "americas",
    name: "Americas",
    destinations: [
      {
        id: "newyork",
        title: "New York",
        coordinates: { x: 30, y: 40 },
      },
      {
        id: "rio",
        title: "Rio de Janeiro",
        coordinates: { x: 60, y: 70 },
      },
      {
        id: "cancun",
        title: "Cancun",
        coordinates: { x: 40, y: 55 },
      },
      {
        id: "vancouver",
        title: "Vancouver",
        coordinates: { x: 20, y: 30 },
      },
    ],
  },
]

export const destinations: Destination[] = [
  {
    id: "tokyo",
    title: "Tokyo",
    location: "Japan",
    shortDescription: "A vibrant metropolis blending ultramodern and traditional.",
    description:
      "Tokyo, Japan's busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens.",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.8,
    duration: "5-7 days",
    highlights: ["Shibuya Crossing", "Tokyo Skytree", "Meiji Shrine", "Tsukiji Fish Market", "Akihabara Electric Town"],
    bestTimeToVisit: "March-April for cherry blossoms, October-November for autumn colors",
  },
  {
    id: "bali",
    title: "Bali",
    location: "Indonesia",
    shortDescription: "Island paradise with beaches, volcanoes, and temples.",
    description:
      "Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple. To the south, the beachside city of Kuta has lively bars, while Seminyak, Sanur and Nusa Dua are popular resort towns.",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.7,
    duration: "7-10 days",
    highlights: ["Ubud Monkey Forest", "Tegallalang Rice Terraces", "Uluwatu Temple", "Mount Batur", "Seminyak Beach"],
    bestTimeToVisit: "April to October (dry season)",
  },
  {
    id: "paris",
    title: "Paris",
    location: "France",
    shortDescription: "City of lights, art, and culinary excellence.",
    description:
      "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré.",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.6,
    duration: "4-6 days",
    highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Montmartre", "Seine River Cruise"],
    bestTimeToVisit: "June to August for warm weather, April to May for fewer crowds",
  },
  {
    id: "rome",
    title: "Rome",
    location: "Italy",
    shortDescription: "Ancient ruins, Renaissance art, and delicious cuisine.",
    description:
      "Rome, Italy's capital, is a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture and culture on display. Ancient ruins such as the Forum and the Colosseum evoke the power of the former Roman Empire. Vatican City, headquarters of the Roman Catholic Church, has St. Peter's Basilica and the Vatican Museums, which house masterpieces such as Michelangelo's Sistine Chapel frescoes.",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.7,
    duration: "3-5 days",
    highlights: ["Colosseum", "Vatican City", "Trevi Fountain", "Roman Forum", "Pantheon"],
    bestTimeToVisit: "April to May or September to October for mild weather and fewer crowds",
  },
  {
    id: "newyork",
    title: "New York City",
    location: "United States",
    shortDescription: "The Big Apple with iconic skyscrapers and diverse culture.",
    description:
      "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that's among the world's major commercial, financial and cultural centers. Its iconic sites include skyscrapers such as the Empire State Building and sprawling Central Park. Broadway theater is staged in neon-lit Times Square.",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.5,
    duration: "5-7 days",
    highlights: [
      "Empire State Building",
      "Central Park",
      "Statue of Liberty",
      "Times Square",
      "Metropolitan Museum of Art",
    ],
    bestTimeToVisit: "April to June or September to early November for pleasant weather",
  },
  {
    id: "rio",
    title: "Rio de Janeiro",
    location: "Brazil",
    shortDescription: "Stunning beaches, mountains, and vibrant culture.",
    description:
      "Rio de Janeiro is a huge seaside city in Brazil, famed for its Copacabana and Ipanema beaches, 38m Christ the Redeemer statue atop Mount Corcovado and for Sugarloaf Mountain, a granite peak with cable cars to its summit. The city is also known for its sprawling favelas (shanty towns). Its raucous Carnaval festival, featuring parade floats, flamboyant costumes and samba dancers, is considered the world's largest.",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.6,
    duration: "5-7 days",
    highlights: ["Christ the Redeemer", "Copacabana Beach", "Sugarloaf Mountain", "Tijuca Forest", "Maracanã Stadium"],
    bestTimeToVisit: "December to March for beach weather, though it's the rainy season",
  },
  {
    id: "seoul",
    title: "Seoul",
    location: "South Korea",
    shortDescription: "A blend of modern skyscrapers and traditional temples.",
    description:
      "Seoul, the capital of South Korea, is a huge metropolis where modern skyscrapers, high-tech subways and pop culture meet Buddhist temples, palaces and street markets. Notable attractions include futuristic Dongdaemun Design Plaza, a convention hall with curving architecture and a rooftop park; Gyeongbokgung Palace, which once had more than 7,000 rooms; and Jogyesa Temple, site of ancient locust and pine trees.",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.7,
    duration: "4-6 days",
    highlights: [
      "Gyeongbokgung Palace",
      "Namsan Seoul Tower",
      "Bukchon Hanok Village",
      "Myeongdong Shopping Street",
      "Hongdae District",
    ],
    bestTimeToVisit: "March to May or September to November for mild weather",
  },
  {
    id: "barcelona",
    title: "Barcelona",
    location: "Spain",
    shortDescription: "Stunning architecture, beaches, and vibrant street life.",
    description:
      "Barcelona, the cosmopolitan capital of Spain's Catalonia region, is known for its art and architecture. The fantastical Sagrada Família church and other modernist landmarks designed by Antoni Gaudí dot the city. Museu Picasso and Fundació Joan Miró feature modern art by their namesakes. City history museum MUHBA, includes several Roman archaeological sites.",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.8,
    duration: "4-5 days",
    highlights: ["Sagrada Família", "Park Güell", "La Rambla", "Gothic Quarter", "Barceloneta Beach"],
    bestTimeToVisit: "May to June or September to October for pleasant weather and fewer crowds",
  },
]
