import { PartialType } from '@nestjs/swagger';
import { CreateNewAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateNewAddressDto) {}
