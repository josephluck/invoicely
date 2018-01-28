import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm'
import { Omit } from 'type-zoo'
import { CompanyEntity } from '../company/entity'
import { validate } from '../../validation'
import constraints from './constraints'

@Entity()
export class InvitationEntity {
  @PrimaryGeneratedColumn('uuid') id: string

  @Column() name: string

  @Column() email: string

  @ManyToOne(type => CompanyEntity, company => company.invitations, {
    eager: true,
  })
  company: CompanyEntity
}

const temporary = new InvitationEntity()
export type Invitation = typeof temporary
export type CreateInvitation = Omit<Invitation, 'company' | 'id'>
export type UpdateInvitation = Omit<Invitation, 'company' | 'id'>

export function createInvite(
  fields: CreateInvitation,
  company: CompanyEntity,
) {
  return validate(fields, constraints).map(fields => {
    let i = new InvitationEntity()
    return { ...i, ...fields, company }
  })
}
