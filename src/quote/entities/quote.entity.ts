import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../db/base.entity';

@Entity()
export abstract class Quote extends BaseEntity {
  @Column('decimal', {
    precision: 12,
    scale: 2,
    default: 0.0,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  amount: number;

  @Column()
  country: string;

  @Column()
  exchangeRate: number;

  @Column()
  fee: number;

  @Column('decimal', {
    precision: 12,
    scale: 2,
    default: 0.0,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  fiatAmount: number;
}
