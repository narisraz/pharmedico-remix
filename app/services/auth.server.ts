import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import {FormStrategy} from "remix-auth-form";
import {db} from "~/services/db.server";
import bcrypt from "bcrypt"

export class User {
  constructor(
    readonly id: number,
    readonly email: string,
    readonly role: string
  ) {
  }
}

export let authenticator = new Authenticator<User>(sessionStorage);

const login = async (email: string, password: string) => {
  const user = await db.user.findUnique({ where: { email } })

  if (user) {
    const hashedPassword = await bcrypt.hash(password, 10)

    if (user.hashedPassword === hashedPassword)
      return new User(user.id, user.email, user.role)
    else
      throw new Error("Bad credentials")
  }
  throw new Error(`User with email ${email} not yet registered`)
}

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email") as string;
    let password = form.get("password") as string;
    return await login(email, password);
  }),
  "user-pass"
);