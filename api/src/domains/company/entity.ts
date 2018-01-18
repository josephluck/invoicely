import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm'
import { UserEntity } from '../user/entity'

@Entity()
export class CompanyEntity {
  @PrimaryGeneratedColumn() id: number

  @Column() name: string

  @Column() address: string

  @Column() logo: string

  @OneToMany(type => UserEntity, user => user.company)
  users: UserEntity[]
}

const temporary = new CompanyEntity()
export type Company = typeof temporary
