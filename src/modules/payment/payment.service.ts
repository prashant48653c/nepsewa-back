import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  async processPayment(paymentDto: any) {
    // Logic to process the payment
    return { message: 'Payment processed successfully' };
  }
}
