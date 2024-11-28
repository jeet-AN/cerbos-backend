import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsMobilePhone, IsString, Length } from "class-validator";

export enum UserRole {
    SALES = "sales",
    ADMIN = "admin",
    EMGINEERING = "engineering",
    MANAGER = "manager"
}

export class CreateUserDto {
    @IsString()
    @Length(1, 50)
    name: string

    @IsEmail()
    @Length(1, 80)
    email: string

    @IsMobilePhone('en-IN')
    phone: number

    @IsString()
    @Length(1, 100)
    password: string

    @Transform(({ value }) => ("" + value).toLowerCase())
    @IsEnum(UserRole)
    role: UserRole
}
