import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';
import { ApiBody } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string' },
        price: { type: 'number' },
        avaliability: { enum: ['ONLINE', 'IN_STOCK'] },
        description: {
          type: 'object',
          properties: {
            create: {
              type: 'object',
              properties: { content: { type: 'string' } },
            },
          },
        },
        tags: {
          type: 'object',
          properties: {
            create: {
              type: 'array',
              items: {
                type: 'object',
                properties: { content: { type: 'string' } },
              },
            },
          },
        },
      },
    },
  })
  create(@Body() createProductDto: Prisma.ProductCreateInput) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({
    schema: {
      properties: {
        price: { type: 'number' },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateProductDto: Prisma.ProductUpdateInput,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
