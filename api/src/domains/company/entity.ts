import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm'
import { User } from '../user/entity'

@Entity()
export class Company {
  @PrimaryGeneratedColumn() id: number

  @Column() name: string

  @Column() address: string

  @Column() logo: string

  @OneToMany(type => User, user => user.company)
  users: User[]
}
