import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Review } from './Review';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float' })
  stock: number;

  @Column({ type: 'text' })
  size: string;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
}
