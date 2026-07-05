export type Persona = {
  id: string
  name: string
  tagline: string
  initials: string
  accent: string
  avatarSrc: string
}

export const personas: Persona[] = [
  {
    id: "hitesh",
    name: "Hitesh Choudhary",
    tagline: "Instructor, co-founder Learnyst, youtuber",
    initials: "HC",
    accent: "#FF7F00", // electric blue — Tesla/SpaceX coded
    avatarSrc: "/HC.png",
  },
  {
    id: "piyush",
    name: "Piyush Garg",
    tagline: "Instructor, founder Teachyst, youtuber, Pink-lover",
    initials: "PG",
    accent: "#FF7F00",
    avatarSrc: "/PG.jpg",
  },
]

export const getPersonaById = (id: string) =>
  personas.find((p) => p.id === id) ?? personas[0]
