import { DefaultSession } from 'next-auth'
import { Usuario, ClientUser } from './types'


declare module "next-auth" {
  interface Session {
    user: User & DefaultSession['user']
  }

  interface User {
    db_info: ClientUser
  }
}