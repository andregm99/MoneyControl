export interface Iuser{
    id: number,
    name: string,
    email: string,
    createdAt: Date,
    updatedAt: Date|null,
    deletedAt: Date|null
}