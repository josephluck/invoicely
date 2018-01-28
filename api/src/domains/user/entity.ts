import { Entity, Column, ManyToOne } from 'typeorm'
import { Omit } from 'type-zoo'
import Base from '../base-entity'
import { CompanyEntity } from '../company/entity'

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
