export interface BookApi {
  id: number
  authorName: string
  imageUrl: string
  title: string
}

export interface BookApiPagination {
  previous_page: number | null
  previous_page_url: string | null
  next_page: number | null
  next_page_url: string | null
  total_pages: number
}

export interface BookApiResponse {
  list: [BookApi]
  total: number
  pagination: BookApiPagination
}
