import { PartialType } from '@nestjs/mapped-types';
import { CreateInventarioDto } from './create-inventario.dto';
import { IsNumber } from 'class-validator';

export class UpdateInventarioDto extends PartialType(CreateInventarioDto) {
    @IsNumber()
    stock: number;
}
