import type { Url } from "url"

export type Location = {
  name: string,
  type: string,
  dimension: string,
  residents: Url[]
  url: string,
}