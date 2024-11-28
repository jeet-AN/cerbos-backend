import { IsNumber, IsString } from "class-validator"

export class CreateEnquiryDto {
    
    employee_id?: number 

    @IsNumber()
    enquiry_number: number
    
    @IsString()
    product_name: string
    
    @IsNumber()
    product_price: number
}
