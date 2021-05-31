import { Controller, Body, Patch, Param } from '@nestjs/common';
import { InformationsService } from './informations.service';
import { UpdateInformationDto } from './dto/update-information.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';

@Controller('informations')
export class InformationsController {
  constructor(private readonly informationsService: InformationsService) {}

  @Patch(':id')
  @Roles(Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateInformationDto: UpdateInformationDto,
  ) {
    return this.informationsService.update(id, updateInformationDto);
  }
}
