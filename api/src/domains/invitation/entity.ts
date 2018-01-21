import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm'
import { Omit } from 'type-zoo'
import { CompanyEntity } from '../company/entity'

@Entity()
export class InvitationEntity {
  @PrimaryGeneratedColumn('uuid') id: number

  @Column() name: string

  @Column() email: string

  @ManyToOne(type => CompanyEntity, company => company.invitations)
  company: CompanyEntity
}

const temporary = new InvitationEntity()

export type Invitation = typeof temporary
export type CreateInvitation = Omit<Invitation, 'company' | 'id'>
export type UpdateInvitation = Omit<Invitation, 'company' | 'id'>
