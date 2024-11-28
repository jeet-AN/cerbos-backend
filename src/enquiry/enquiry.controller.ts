import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, Req, UseGuards } from '@nestjs/common';
import { EnquiryService } from './enquiry.service';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { UpdateEnquiryDto } from './dto/update-enquiry.dto';
import { AllowEnquiryCerbosAction } from './guard/allow-enquiry-cerbos-action.guard';
import { CommonCerbosRequest } from 'src/common/decorators/common-cerbos.decorator';

@Controller('enquiry')
@SetMetadata('resource', 'sales')
export class EnquiryController {
  constructor(private readonly enquiryService: EnquiryService) {}

  @CommonCerbosRequest()
  @Post()
  create(@Body() createEnquiryDto: CreateEnquiryDto, @Req() req) {
    let user: any = req.user;
    return this.enquiryService.create(createEnquiryDto, user.id);
  }

  @CommonCerbosRequest()
  @Get()
  findAll() {
    return this.enquiryService.findAll();
  }

  @UseGuards(AllowEnquiryCerbosAction)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enquiryService.findOne(+id);
  }

  @UseGuards(AllowEnquiryCerbosAction)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnquiryDto: UpdateEnquiryDto) {
    return this.enquiryService.update(+id, updateEnquiryDto);
  }

  @UseGuards(AllowEnquiryCerbosAction)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enquiryService.remove(+id);
  }
}
