export interface Coordinates {
  x: number; // percentage from left
  y: number; // percentage from top
}

export interface DestinationPin {
  id: string;
  title: string;
  coordinates: Coordinates;
}

export interface Region {
  id: string;
  name: string;
  destinations: DestinationPin[];
}

export interface Destination {
  id: string;
  title: string;
  location: string;
  shortDescription: string;
  description: string;
  image: string;
  rating: number;
  duration: string;
  highlights: string[];
  bestTimeToVisit: string;
}

export const regions: Region[] = [
  {
    id: "suwon",
    name: "Suwon",
    destinations: [
      {
        id: "hwaseong-haenggung",
        title: "Hwaseong Haenggung",
        coordinates: { x: 30, y: 40 },
      },
      {
        id: "hwaseong-fortress",
        title: "Hwaseong Fortress",
        coordinates: { x: 60, y: 70 },
      },
      {
        id: "banghwasuryujeong-pavilion",
        title: "Banghwasuryujeong Pavilion",
        coordinates: { x: 45, y: 30 },
      },
      {
        id: "na-hye-seok-street",
        title: "Na Hye Seok Street",
        coordinates: { x: 50, y: 60 },
      },
    ],
  },
  {
    id: "yongin",
    name: "Yongin",
    destinations: [
      { id: "everland", title: "Everland", coordinates: { x: 40, y: 50 } },
      {
        id: "korean-folk-village",
        title: "Korean Folk Village",
        coordinates: { x: 55, y: 65 },
      },
      {
        id: "caribbean-bay",
        title: "Caribbean Bay",
        coordinates: { x: 35, y: 45 },
      },
      {
        id: "yongin-daejanggeum-park",
        title: "Dae Jang Geum Park",
        coordinates: { x: 60, y: 30 },
      },
    ],
  },
  {
    id: "paju",
    name: "Paju",
    destinations: [
      {
        id: "heyri-art-village",
        title: "Heyri Art Village",
        coordinates: { x: 25, y: 40 },
      },
      {
        id: "dmz-imjingak",
        title: "Imjingak DMZ Park",
        coordinates: { x: 50, y: 50 },
      },
      {
        id: "paju-book-city",
        title: "Paju Book City",
        coordinates: { x: 40, y: 60 },
      },
      {
        id: "odusan-unification-observatory",
        title: "Odusan Observatory",
        coordinates: { x: 60, y: 30 },
      },
    ],
  },
  {
    id: "gapyeong",
    name: "Gapyeong",
    destinations: [
      {
        id: "nami-island",
        title: "Nami Island",
        coordinates: { x: 40, y: 40 },
      },
      {
        id: "petite-france",
        title: "Petite France",
        coordinates: { x: 60, y: 50 },
      },
      {
        id: "garden-of-morning-calm",
        title: "Garden of Morning Calm",
        coordinates: { x: 30, y: 60 },
      },
      {
        id: "jade-garden",
        title: "Jade Garden",
        coordinates: { x: 50, y: 30 },
      },
    ],
  },
];

export const destinations: Destination[] = [
  // Suwon
  {
    id: "hwaseong-haenggung",
    location: "suwon",
    title: "Hwaseong Haenggung Palace",
    shortDescription: "A historic palace used by kings during wartime.",
    description:
      "Hwaseong Haenggung is a temporary palace located within Hwaseong Fortress in Suwon. It served as a retreat for King Jeongjo during visits and military operations. The palace showcases beautiful traditional Korean architecture.",
    image: "/images/hwaseong-haenggung.jpg",
    rating: 4.7,
    duration: "1-2 hours",
    highlights: ["Royal Architecture", "Cultural Performances", "Historical Exhibits"],
    bestTimeToVisit: "Spring and autumn for pleasant weather and cultural events",
  },
  {
    id: "hwaseong-fortress",
    location: "suwon",
    title: "Hwaseong Fortress",
    shortDescription: "UNESCO World Heritage site with scenic walls and towers.",
    description:
      "Hwaseong Fortress is a UNESCO-listed 18th-century fortification surrounding central Suwon. It features impressive walls, gates, and observation towers, offering views and insights into Joseon-era military architecture.",
    image: "/images/hwaseong-fortress.jpg",
    rating: 4.8,
    duration: "2-3 hours",
    highlights: ["Paldalmun Gate", "Seojangdae Command Post", "Wall Walk"],
    bestTimeToVisit: "March to May or September to November for comfortable walks",
  },
  {
    id: "banghwasuryujeong-pavilion",
    location: "suwon",
    title: "Banghwasuryujeong Pavilion",
    shortDescription: "A peaceful pavilion with views of the fortress and sunset.",
    description:
      "This pavilion sits on the northwestern side of Hwaseong Fortress and offers one of the most picturesque sunset views in Suwon. It’s known for its tranquil setting and elegant architecture.",
    image: "/images/banghwasuryujeong.jpg",
    rating: 4.6,
    duration: "30-60 minutes",
    highlights: ["Sunset Views", "Photography", "Relaxation"],
    bestTimeToVisit: "Late afternoon for golden hour views",
  },
  {
    id: "na-hye-seok-street",
    location: "suwon",
    title: "Na Hye-Seok Street",
    shortDescription: "Trendy street named after Korea's first female painter.",
    description:
      "Na Hye-Seok Street is a cultural and shopping area named after Korea’s pioneering female artist. It’s lined with cafes, restaurants, and art displays, reflecting modern Suwon’s youthful spirit.",
    image: "/images/na-hye-seok-street.jpg",
    rating: 4.3,
    duration: "1-2 hours",
    highlights: ["Street Art", "Trendy Cafes", "Nightlife"],
    bestTimeToVisit: "Evening for dining and night strolls",
  },

  // Yongin
  {
    id: "korean-folk-village",
    location: "yongin",
    title: "Korean Folk Village",
    shortDescription: "A living museum of traditional Korean life.",
    description:
      "The Korean Folk Village showcases traditional Korean houses, performances, and folk customs. It offers immersive experiences like horseback shows, cultural workshops, and seasonal festivals.",
    image: "/images/korean-folk-village.jpg",
    rating: 4.6,
    duration: "3-4 hours",
    highlights: ["Folk Performances", "Traditional Houses", "Workshops"],
    bestTimeToVisit: "Spring and autumn for pleasant weather and events",
  },
  {
    id: "caribbean-bay",
    location: "yongin",
    title: "Caribbean Bay",
    shortDescription: "Korea’s largest water park with rides and spas.",
    description:
      "Located in Yongin, Caribbean Bay is a massive water park with indoor and outdoor zones. It features thrilling water slides, wave pools, a lazy river, and relaxing saunas, making it a popular summer destination.",
    image: "/images/caribbean-bay.jpg",
    rating: 4.5,
    duration: "Half-day to full day",
    highlights: ["Mega Slide", "Wave Pool", "Hot Springs"],
    bestTimeToVisit: "Summer months for outdoor water fun",
  },
  {
    id: "yongin-daejanggeum-park",
    location: "yongin",
    title: "Yongin Daejanggeum Park",
    shortDescription: "K-drama filming location with Joseon-style sets.",
    description:
      "This studio park features replicas of historical buildings used in famous Korean dramas. Visitors can walk through palace sets and traditional villages while reliving scenes from beloved TV shows.",
    image: "/images/daejanggeum-park.jpg",
    rating: 4.4,
    duration: "2-3 hours",
    highlights: ["Drama Sets", "Palace Architecture", "Photo Spots"],
    bestTimeToVisit: "Spring and fall for best walking conditions",
  },

  // Paju
  {
    id: "heyri-art-village",
    location: "paju",
    title: "Heyri Art Village",
    shortDescription: "Creative village of galleries, cafes, and studios.",
    description:
      "Heyri Art Village in Paju is a hub for artists and creatives. It’s filled with modern galleries, design shops, and themed cafes. A perfect place to stroll, enjoy art, and discover unique crafts.",
    image: "/images/heyri-art-village.jpg",
    rating: 4.5,
    duration: "2-4 hours",
    highlights: ["Art Galleries", "Themed Cafes", "Creative Workshops"],
    bestTimeToVisit: "Weekend afternoons for open studios",
  },
  {
    id: "dmz-imjingak",
    location: "paju",
    title: "DMZ & Imjingak",
    shortDescription: "Gateway to the Korean Demilitarized Zone.",
    description:
      "Imjingak Park is a symbolic site near the DMZ that includes monuments, a peace bell, and views toward North Korea. Guided DMZ tours are available to explore historical and military sites.",
    image: "/images/dmz-imjingak.jpg",
    rating: 4.6,
    duration: "2-3 hours",
    highlights: ["Peace Bell", "Bridge of Freedom", "DMZ Tours"],
    bestTimeToVisit: "Year-round; tours require booking in advance",
  },
  {
    id: "paju-book-city",
    location: "paju",
    title: "Paju Book City",
    shortDescription: "Cultural complex dedicated to publishing and literature.",
    description:
      "Paju Book City is a planned city focused on books and publishing. It includes bookstores, design studios, and architecture with a minimalist aesthetic. A paradise for readers and creatives.",
    image: "/images/paju-book-city.jpg",
    rating: 4.4,
    duration: "2-3 hours",
    highlights: ["Book Cafes", "Publisher Boutiques", "Architecture"],
    bestTimeToVisit: "Any time of year, especially weekdays for quiet visits",
  },
  {
    id: "odusan-unification-observatory",
    location: "paju",
    title: "Odusan Unification Observatory",
    shortDescription: "Viewpoint facing North Korea across the river.",
    description:
      "This observatory offers a clear view of North Korea across the Imjin River. Exhibits on inter-Korean relations and telescopes provide a powerful look into the peninsula’s divided history.",
    image: "/images/odusan-observatory.jpg",
    rating: 4.3,
    duration: "1-2 hours",
    highlights: ["Telescopes", "Exhibits", "Border Views"],
    bestTimeToVisit: "Clear days for visibility",
  },

  // Gapyeong
  {
    id: "nami-island",
    location: "gapyeong",
    title: "Nami Island",
    shortDescription: "Famous island with tree-lined paths and cultural sites.",
    description:
      "Nami Island is a scenic half-moon-shaped island known for its beautiful walking paths, especially Metasequoia Lane. It became famous from the drama 'Winter Sonata' and offers seasonal beauty and nature activities.",
    image: "/images/nami-island.jpg",
    rating: 4.8,
    duration: "2-4 hours",
    highlights: ["Tree Lanes", "Cultural Sculptures", "Bike Rental"],
    bestTimeToVisit: "Spring for blossoms or autumn for fall colors",
  },
  {
    id: "petite-france",
    location: "gapyeong",
    title: "Petite France",
    shortDescription: "French-themed cultural village in Korea.",
    description:
      "Petite France is a colorful theme park that recreates the atmosphere of a French village. It includes exhibitions, performances, and architecture inspired by Saint-Exupéry’s ‘The Little Prince’.",
    image: "/images/petite-france.jpg",
    rating: 4.3,
    duration: "1-2 hours",
    highlights: ["French Architecture", "The Little Prince", "Live Shows"],
    bestTimeToVisit: "All year, especially spring and summer",
  },
  {
    id: "garden-of-morning-calm",
    location: "gapyeong",
    title: "The Garden of Morning Calm",
    shortDescription: "Korea’s oldest private garden with floral beauty.",
    description:
      "The Garden of Morning Calm features beautifully landscaped gardens and walking paths. It hosts seasonal festivals like spring flowers, summer blooms, autumn foliage, and winter lights.",
    image: "/images/garden-of-morning-calm.jpg",
    rating: 4.7,
    duration: "2-3 hours",
    highlights: ["Seasonal Flowers", "Light Festival", "Photography"],
    bestTimeToVisit: "Each season has a themed festival",
  },
  {
    id: "jade-garden",
    location: "gapyeong",
    title: "Jade Garden",
    shortDescription: "European-style botanical garden in the forest.",
    description:
      "Jade Garden is a themed garden inspired by European landscaping. It offers peaceful trails through flower beds, forest paths, and scenic glasshouses. Ideal for nature lovers and photographers.",
    image: "/images/jade-garden.jpg",
    rating: 4.5,
    duration: "1-2 hours",
    highlights: ["Flower Trails", "Greenhouses", "Forest Walks"],
    bestTimeToVisit: "Spring and summer for blooming flowers",
  },
];

