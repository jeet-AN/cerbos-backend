import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, Req, UseGuards } from '@nestjs/common';
import { CreateEstimationDto } from './dto/create-estimation.dto';
import { UpdateEstimationDto } from './dto/update-estimation.dto';
import { EstimationService } from './estimation.service';
import { CommonCerbosRequest } from 'src/common/decorators/common-cerbos.decorator';
import { AllowEstimationCerbosAction } from './guard/allow-estimation-cerbos-action.guard';

@Controller('estimation')
@SetMetadata('resource', 'engineering')
@CommonCerbosRequest()
export class EstimationController {
  constructor(private readonly estimationService: EstimationService) {}

  @Post()
  create(@Body() createEstimationDto: CreateEstimationDto, @Req() req) {
    let user: any = req.user;
    return this.estimationService.create(createEstimationDto, user.id);
  }

  @Get()
  findAll() {
    return this.estimationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estimationService.findOne(+id);
  }

  @UseGuards(AllowEstimationCerbosAction)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstimationDto: UpdateEstimationDto) {
    return this.estimationService.update(+id, updateEstimationDto);
  }

  @UseGuards(AllowEstimationCerbosAction)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estimationService.remove(+id);
  }
}
