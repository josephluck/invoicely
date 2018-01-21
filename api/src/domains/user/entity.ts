import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm'
import { Omit } from 'type-zoo'
import { CompanyEntity } from '../company/entity'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id: number

  @Column() name: string

  @Column() email: string

  @Column({ nullable: true })
  avatar?: string

  @Column() password: string

  @ManyToOne(type => CompanyEntity, company => company.users)
  company: CompanyEntity
}

const temporary = new UserEntity()

export type User = typeof temporary
export type CreateUser = Omit<User, 'company' | 'id'>
export type UpdateUser = Omit<User, 'company' | 'id'>
