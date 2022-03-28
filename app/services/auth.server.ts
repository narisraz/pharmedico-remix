import {Authenticator, AuthorizationError} from "remix-auth";
import {sessionStorage, User} from "~/services/session.server";
import {FormStrategy} from "remix-auth-form";
import {db} from "~/services/db.server";
import bcrypt from "bcrypt"


const login = async (email: string, password: string) => {
  const user = await db.user.findUnique({ where: { email } })

  if (user) {
    const hashedPassword = await bcrypt.hash(password, 10)

    if (user.hashedPassword === hashedPassword)
      return new User(user.id, user.email, user.role)
    else
      throw new AuthorizationError("Bad credentials")
  }
  throw new AuthorizationError(`User with email ${email} not yet registered`)
}

let authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email") as string;
    let password = form.get("password") as string;

    return await login(email, password);
  })
);

export default authenticator