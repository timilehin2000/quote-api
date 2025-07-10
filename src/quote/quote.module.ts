import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { ExchangeRateService } from './exchange-rate.service';
import { FeeService } from './fee.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Quote]), HttpModule],
  controllers: [QuoteController],
  providers: [QuoteService, ExchangeRateService, FeeService],
  exports: [QuoteService],
})
export class QuoteModule {}
