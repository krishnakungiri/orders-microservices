import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BILLING_SERVICE } from './constants/services';
import { createOrderRequest } from './dto/create-order.requests';
import { OrdersRepository } from './orders.repository';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy
  ) { }

  async createOrder(request: createOrderRequest){
  //  return this.ordersRepository.create(request)

    // const session = await this.ordersRepository.startTransaction()
    try {
      const order = await this.ordersRepository.create(request)
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          request
        })
      )

      // await session.commitTransaction()
      return order

    } catch (error) {
      // await session.abortTransaction()
      throw error;
    }
  }

  async getOrders(){
    return this.ordersRepository.find({})
  }
}
