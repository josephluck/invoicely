import './env'
import 'reflect-metadata'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as cors from 'koa2-cors'
import * as auth from 'koa-jwt'
import * as jwt from 'jsonwebtoken'
import { Connection } from 'typeorm/connection/Connection'
import * as nodemailer from 'nodemailer'
import makeRouter from './router'
import makeDatabase from './db'
import exceptions from './exceptions'
import messages from './messages'
import { CreateEmail } from './domains/email/entity'

const opts: any = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
}

const mailer = nodemailer.createTransport(opts)

export interface Dependencies {
  db: Connection
  auth: auth.Middleware
  jwt: typeof jwt
  messages: typeof messages
  email: (email: CreateEmail) => Promise<any>
}
const startServer = async (db: Connection) => {
  const server = new Koa()

  const dependencies: Dependencies = {
    db,
    auth: auth({
      secret: process.env.JWT_SECRET!,
    }),
    jwt,
    messages,
    email(email) {
      return mailer.sendMail({
        from: '"Joseph Luck" <joseph.luck@sky.com>',
        to: email.to,
        subject: email.subject,
        text: email.html,
        html: email.html,
      })
    },
  }

  const router = makeRouter(dependencies)

  server.use(bodyParser())
  server.use(router.routes())
  server.use(router.allowedMethods())
  server.use(exceptions())
  server.use(
    cors({
      origin: '*',
    }),
  )

  await server.listen(process.env.API_PORT)
  return server
}

makeDatabase()
  .then(startServer)
  .then(server => console.log(`Api started`))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
