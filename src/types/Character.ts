import type { Origin } from "./Origin"
import type { Location } from "./Location"

export type Character = {
  id: number,
  name: string,
  status: Status,
  species: string,
  type: string,
  gender: Gender,
  origin: Origin,
  location: Location,
  image: string,
  episode: string[]
}

type Status = 'Alive' | 'Dead' | 'unknown'
type Gender = 'Female' | 'Male' | 'Genderless' | 'unknown'