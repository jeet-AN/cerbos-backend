import { UserRole } from "../dto/create-user.dto"

export class User {
    id: number
    name: string
    email: string
    phone: number
    password: string
    role: UserRole
    is_active: string
    created_at: string
}
