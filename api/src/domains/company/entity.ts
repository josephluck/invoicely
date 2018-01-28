import { Entity, Column, OneToMany } from 'typeorm'
import Base from '../base-entity'
import { UserEntity } from '../user/entity'
import { InvitationEntity } from '../invitation/entity'
import { EmailEntity } from '../email/entity'
import { Omit } from 'type-zoo'

@Entity()
export class CompanyEntity extends Base {
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

  @OneToMany(type => EmailEntity, email => email.company)
  emails: EmailEntity[]
}

const temporary = new CompanyEntity()

export type Company = typeof temporary
export type CreateCompany = Omit<
  Company,
  'id' | 'dateCreated' | 'dateUpdated'
>
