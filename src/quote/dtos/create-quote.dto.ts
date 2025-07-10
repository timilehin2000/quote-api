import {
  IsNumber,
  IsNotEmpty,
  Matches,
  IsString,
  IsPositive,
  Length,
  IsIn,
} from 'class-validator';

export class CreateQuoteDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  @Matches(/^[A-Z]{3}$/, {
    message: 'country must be 2 uppercase letters',
  })
  @IsIn(['NGN', 'KES', 'ZAR'])
  countryCode: string;
}
