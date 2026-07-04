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
    accent: "#3B82F6", // electric blue — Tesla/SpaceX coded
    avatarSrc: "/public/HC.png",
  },
]

export const getPersonaById = (id: string) =>
  personas.find((p) => p.id === id) ?? personas[0]
