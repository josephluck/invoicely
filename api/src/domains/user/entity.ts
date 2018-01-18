import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm'
import { CompanyEntity } from '../company/entity'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn() id: number

  @Column() name: string

  @Column() email: string

  @Column({ nullable: true })
  avatar: string

  @Column() password: string

  @ManyToOne(type => CompanyEntity, company => company.users)
  company: CompanyEntity
}

const temporary = new UserEntity()
export type User = typeof temporary
