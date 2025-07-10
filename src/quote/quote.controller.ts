import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dtos/create-quote.dto';
import { Response } from 'express';

@Controller('api/quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  async createQuote(
    @Body() createQuoteDto: CreateQuoteDto,
    @Res() res: Response,
  ) {
    const quote = await this.quoteService.createQuote(createQuoteDto);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Quote created successfully',
      data: quote,
    });
  }
}
