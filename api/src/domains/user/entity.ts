import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm'
import { Company } from '../company/entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number

  @Column() name: string

  @Column() email: string

  @Column({ nullable: true })
  avatar: string

  @Column() password: string

  @ManyToOne(type => Company, company => company.users)
  company: Company
}
