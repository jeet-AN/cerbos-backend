import { IsNumber, IsString } from "class-validator"

export class CreateEstimationDto {
    
    employee_id?: number 

    @IsNumber()
    estimation_number: number
    
    @IsString()
    product_name: string
    
    @IsNumber()
    product_price: number
}
