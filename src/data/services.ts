export interface Service {
  slug: string;
  title: string;
  description: string;
  image: string;
  checklist: string[];
}

export const services: Service[] = [
  {
    slug: "small-businesses",
    title: "Small Business Cleaning",
    description:
      "Perfect for small businesses who need consistent, professional cleaning to keep their workspace healthy and welcoming.",
    image: "/photos/benyamin-bohlouli-LZLdLR7vuHg-unsplash.jpg",
    checklist: [
      "Vacuum and mop all floors",
      "Dust counters, shelves, and displays",
      "Wipe down doors, handles, and glass",
      "Empty trash and recycling",
      "Restroom cleaning and sanitization",
      "High-touch surfaces disinfected",
    ],
  },
  {
    slug: "professional-office",
    title: "Professional Office Cleaning",
    description:
      "Professional cleaning for offices of any size to maintain productivity and cleanliness.",
    image: "/photos/copernico-p_kICQCOM4s-unsplash.jpg",
    checklist: [
      "Dust desks, chairs, and office furniture",
      "Vacuum carpets and mop hard floors",
      "Clean conference rooms and reception areas",
      "Disinfect electronics, phones, and shared devices",
      "Empty trash bins and replace liners",
      "Restrooms cleaned and sanitized",
    ],
  },
  {
    slug: "move-in-out",
    title: "Move In/Out Cleaning",
    description:
      "Deep cleaning services for properties during move-ins and move-outs.",
    image: "/photos/hiveboxx-deX-KChuboY-unsplash.jpg",
    checklist: [
      "Deep clean kitchens and appliances",
      "Sanitize bathrooms thoroughly",
      "Wipe baseboards, doors, and trim",
      "Vacuum and mop all floors",
      "Dust blinds, windowsills, and fixtures",
      "Clean closets and storage spaces",
    ],
  },
  {
    slug: "airbnb",
    title: "Airbnb Cleaning",
    description:
      "Fast, reliable cleaning to get short-term rentals guest-ready every time.",
    image: "/photos/aes-5m3v4GBB82o-unsplash.jpg",
    checklist: [
      "Change linens and make beds",
      "Restock toiletries and supplies",
      "Sanitize bathrooms and kitchens",
      "Vacuum and mop all floors",
      "Empty trash and recycling",
      "Dust all surfaces and wipe mirrors",
    ],
  },
  {
    slug: "hospitals",
    title: "Hospital Cleaning",
    description:
      "Specialized sanitization for healthcare facilities to maintain strict hygiene.",
    image: "/photos/benyamin-bohlouli-e7MJLM5VGjY-unsplash.jpg",
    checklist: [
      "Sanitize exam rooms and waiting areas",
      "Disinfect high-touch surfaces and equipment",
      "Mop floors with hospital-grade solutions",
      "Clean and disinfect restrooms",
      "Empty hazardous waste containers",
      "Follow strict health compliance protocols",
    ],
  },
  {
    slug: "real-estate-clean-outs",
    title: "Real Estate Clean Outs",
    description:
      "Prepare homes for sale or rent with comprehensive cleaning services.",
    image: "/photos/dillon-kydd-2keCPb73aQY-unsplash.jpg",
    checklist: [
      "Remove trash and debris",
      "Deep clean kitchens and bathrooms",
      "Vacuum carpets and mop hard floors",
      "Dust baseboards, trim, and vents",
      "Clean windows and blinds",
      "Ensure property is fresh and show-ready",
    ],
  },
  {
    slug: "schools-universities",
    title: "Schools & Universities",
    description:
      "Classroom and campus cleaning to keep students and staff safe.",
    image: "/photos/nathan-cima-Qw6wa96IvvQ-unsplash.jpg",
    checklist: [
      "Sanitize classrooms and desks",
      "Disinfect restrooms and locker rooms",
      "Mop and vacuum hallways and common areas",
      "Empty trash and recycling bins",
      "Dust and clean windowsills and ledges",
      "High-touch surfaces disinfected daily",
    ],
  },
  {
    slug: "car-dealerships",
    title: "Car Dealership Cleaning",
    description:
      "Make your showroom shine for a strong first impression with spotless floors and windows.",
    image: "/photos/i-m-zion-WnDC9k1aiZ8-unsplash.jpg",
    checklist: [
      "Clean and polish showroom floors",
      "Dust and sanitize desks and offices",
      "Wipe glass doors, windows, and displays",
      "Restrooms cleaned and sanitized",
      "Customer lounge tidied and restocked",
      "Trash removal and recycling",
    ],
  },
  {
    slug: "construction",
    title: "Post-Construction Cleaning",
    description:
      "Detailed cleaning to remove dust and debris after construction or renovation.",
    image: "/photos/stefan-lehner-biRt6RXejuk-unsplash.jpg",
    checklist: [
      "Remove dust from all surfaces",
      "Wipe down doors, trim, and baseboards",
      "Vacuum carpets and mop hard floors",
      "Clean windows, glass, and mirrors",
      "Dispose of leftover construction debris",
      "Detail clean kitchens and bathrooms",
    ],
  },
];
