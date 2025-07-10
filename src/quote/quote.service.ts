import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Quote } from './entities/quote.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuoteDto } from './dtos/create-quote.dto';
import { ExchangeRateService } from './exchange-rate.service';
import { FeeService } from './fee.service';
import * as path from 'path';
import { mkdirSync } from 'fs';
import { createObjectCsvWriter } from 'csv-writer';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(Quote) private quoteRepo: Repository<Quote>,
    private exchangeRateService: ExchangeRateService,
    private feeService: FeeService,
  ) {}

  async createQuote(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    const { amount, countryCode } = createQuoteDto;
    try {
      const exchangeRate =
        await this.exchangeRateService.getExchangeRate(countryCode);

      const feeInUsdt = this.feeService.calculateFee(amount, countryCode);
      const grossFiatAmount = amount * exchangeRate;
      const fiatAmount = grossFiatAmount - feeInUsdt * exchangeRate;

      const quote = this.quoteRepo.create({
        amount: createQuoteDto.amount,
        country: createQuoteDto.countryCode,
        exchangeRate,
        fee: feeInUsdt,
        fiatAmount,
      });

      await this.quoteRepo.save(quote);

      return quote;
    } catch (err: any) {
      console.log(err);
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        'Internal Server Errror',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getLast50Quotes(): Promise<Quote[]> {
    return this.quoteRepo.find({
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }

  async generateCsvForLast50Quotes(): Promise<string> {
    const quotes = await this.getLast50Quotes();

    const filePath = path.join(
      __dirname,
      `../../../temp/quotes-${Date.now()}.csv`,
    );

    mkdirSync(path.dirname(filePath), { recursive: true });

    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: [
        { id: 'id', title: 'ID' },
        { id: 'amount', title: 'USDT Amount' },
        { id: 'country', title: 'Country Code' },
        { id: 'exchangeRate', title: 'Exchange Rate' },
        { id: 'fee', title: 'Fee' },
        { id: 'fiatAmount', title: 'Fiat Amount' },
        { id: 'createdAt', title: 'Created At' },
      ],
    });

    await csvWriter.writeRecords(quotes);
    return filePath;
  }
}
