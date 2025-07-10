import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExchangeRateService {
  constructor(private httpService: HttpService) {}

  async getExchangeRate(currency: string): Promise<number> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
            ids: 'tether',
            vs_currencies: currency.toLowerCase(),
          },
        }),
      );

      return response.data.tether[currency.toLowerCase()];
    } catch (err: any) {
      console.log(err);
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        'Failed to fetch exchange rate',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
