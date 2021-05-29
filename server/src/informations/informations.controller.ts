import { Controller, Body, Patch, Param } from '@nestjs/common';
import { InformationsService } from './informations.service';
import { UpdateInformationDto } from './dto/update-information.dto';

@Controller('informations')
export class InformationsController {
  constructor(private readonly informationsService: InformationsService) {}

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInformationDto: UpdateInformationDto,
  ) {
    return this.informationsService.update(id, updateInformationDto);
  }
}
