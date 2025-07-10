import { Injectable } from '@nestjs/common';

@Injectable()
export class FeeService {
  private feeRates = {
    NGN: 0.02,
    KES: 0.015,
    ZAR: 0.01,
  };

  calculateFee(amount: number, countryCode: string): number {
    const rate = this.feeRates[countryCode] || 0.01;
    return amount * rate;
  }
}
