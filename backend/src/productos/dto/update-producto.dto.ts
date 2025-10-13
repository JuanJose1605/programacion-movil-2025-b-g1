import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { IsNumber } from 'class-validator';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
    @IsNumber()
    precio: number 
}
