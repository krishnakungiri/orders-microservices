import { Controller, Get } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { createOrderRequest } from './dto/create-order.requests';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() request: createOrderRequest){
    return this.ordersService.createOrder(request);
  }

  @Get()
  async getOrders(){
    return this.ordersService.getOrders();
  }
}
