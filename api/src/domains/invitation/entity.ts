import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import Base from '../base-entity'
import { Omit } from 'type-zoo'
import { CompanyEntity } from '../company/entity'
import { EmailEntity } from '../email/entity'
import { validate } from '../../validation'
import constraints from './constraints'

@Entity()
export class InvitationEntity extends Base {
  @Column() name: string

  @Column() email: string

  @ManyToOne(type => CompanyEntity, company => company.invitations, {
    eager: true,
  })
  company: CompanyEntity

  @OneToMany(type => EmailEntity, email => email.invitation)
  emails: EmailEntity[]
}

const temporary = new InvitationEntity()
export type Invitation = typeof temporary
export type CreateInvitation = Omit<
  Invitation,
  'company' | 'emails' | 'id' | 'dateCreated' | 'dateUpdated'
>

export function createInvite(
  fields: CreateInvitation,
  company: CompanyEntity,
) {
  return validate(fields, constraints).map(fields => {
    let i = new InvitationEntity()
    return { ...i, ...fields, company }
  })
}
