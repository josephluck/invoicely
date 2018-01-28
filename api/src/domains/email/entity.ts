import { Entity, Column, ManyToOne } from 'typeorm'
import { Omit } from 'type-zoo'
import Base from '../base-entity'
import { InvitationEntity } from '../invitation/entity'
import { CompanyEntity } from '../company/entity'
import { validate } from '../../validation'
import constraints from './constraints'

@Entity()
export class EmailEntity extends Base {
  @Column() to: string
  @Column() subject: string
  @Column() html: string

  @ManyToOne(
    type => InvitationEntity,
    invitation => invitation.emails,
    {
      eager: true,
    },
  )
  invitation: InvitationEntity

  @ManyToOne(type => CompanyEntity, company => company.emails, {
    eager: true,
  })
  company: CompanyEntity
}

const temporary = new EmailEntity()

export type Email = typeof temporary
export type CreateEmail = Omit<
  Email,
  'invitation' | 'company' | 'id' | 'dateCreated' | 'dateUpdated'
>

export function createEmail(
  fields: CreateEmail,
  company: CompanyEntity,
  relationKey: 'invitation',
  relation: InvitationEntity,
) {
  return validate(fields, constraints).map(fields => {
    return { ...new EmailEntity(), ...fields, company }
  })
}
