import { Entity, Column, ManyToOne } from 'typeorm'
import { Omit } from 'type-zoo'
import Base from '../base-entity'
import { CompanyEntity } from '../company/entity'
import { validate } from '../../validation'
import constraints from './constraints'
import * as crypt from 'bcrypt'

@Entity()
export class UserEntity extends Base {
  @Column() name: string

  @Column() email: string

  @Column({ nullable: true })
  avatar?: string

  @Column() password: string

  @ManyToOne(type => CompanyEntity, company => company.users, {
    eager: true,
  })
  company: CompanyEntity
}

const temporary = new UserEntity()

export type User = typeof temporary
export type CreateUser = Omit<
  User,
  'company' | 'id' | 'dateCreated' | 'dateUpdated'
>

export async function createUser(
  fields: CreateUser,
  company: CompanyEntity,
) {
  return validate(fields, constraints).map(async fields => {
    let i = new UserEntity()
    return {
      ...i,
      ...fields,
      company,
      password: await crypt.hash(fields.password, 10),
    }
  })
}
