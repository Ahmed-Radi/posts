export interface IPost {
  body: string
  id?: number
  title: string
  userId?: number
}

export type METHODS = 'update' | 'create'