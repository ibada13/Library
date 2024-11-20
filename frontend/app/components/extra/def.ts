export interface book {
    id: number, 
    title: string
    cover_path: string | null,
    description: string | null,
    published_year:number,
    isbn: string,
    created_at: string, 
    updated_at:string , 
    pages:number,
    current_page_number:number,
    authors :author[]
 }

export interface author {
    id: number,
    name: string,
    pivot:book_author ,
}
 
export interface book_author { 
    book_id: number,
    author_id:number
}