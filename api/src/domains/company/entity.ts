import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm'
import { UserEntity } from '../user/entity'
import { InvitationEntity } from '../invitation/entity'
import { Omit } from 'type-zoo'

@Entity()
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid') id: number

  @Column() name: string

  @Column() address: string

  @Column() logo: string

  @OneToMany(type => UserEntity, user => user.company)
  users: UserEntity[]

  @OneToMany(
    type => InvitationEntity,
    invitation => invitation.company,
  )
  invitations: InvitationEntity[]
}

const temporary = new CompanyEntity()

export type Company = typeof temporary
export type CreateCompany = Omit<Company, 'id'>
export type UpdateCompany = Omit<Company, 'id'>
