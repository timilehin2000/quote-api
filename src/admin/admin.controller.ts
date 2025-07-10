import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { QuoteService } from '../quote/quote.service';
import { Response } from 'express';
import { unlink } from 'fs';
import { AdminKeyGuard } from '../auth/admin-key.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('api/admin')
export class AdminController {
  constructor(private quoteService: QuoteService) {}

  @UseGuards(AdminKeyGuard)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Get('quotes')
  async getQuotes(@Res() res: Response) {
    const quotes = await this.quoteService.getLast50Quotes();

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Quotes fetched successfully',
      data: quotes,
    });
  }

  @UseGuards(AdminKeyGuard)
  @Get('quotes/export')
  async exportQuotes(@Res() res: Response) {
    const filePath = await this.quoteService.generateCsvForLast50Quotes();
    res.download(filePath, 'quotes.csv', (err) => {
      unlink(filePath, () => {});
      if (err) {
        console.error('Download error:', err);
        res.status(500).send('Could not download file.');
      }
    });
  }
}
