export interface bookApi {
  authorName: string
  imageUrl: string
  title: string
}

export interface BookApiResponse {
  list: [bookApi]
  total: number
}
