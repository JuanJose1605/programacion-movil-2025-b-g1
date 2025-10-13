import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PedidoDetallesService } from './pedido-detalles.service';
import { CreatePedidoDetalleDto } from './dto/create-pedido-detalle.dto';
import { UpdatePedidoDetalleDto } from './dto/update-pedido-detalle.dto';

@Controller('pedido-detalles')
export class PedidoDetallesController {
  constructor(private readonly pedidoDetallesService: PedidoDetallesService) {}

  @Post()
  create(@Body() createPedidoDetalleDto: CreatePedidoDetalleDto) {
    return this.pedidoDetallesService.create(createPedidoDetalleDto);
  }

  @Get()
  findAll() {
    return this.pedidoDetallesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidoDetallesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidoDetalleDto: UpdatePedidoDetalleDto) {
    return this.pedidoDetallesService.update(+id, updatePedidoDetalleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidoDetallesService.remove(+id);
  }
}
