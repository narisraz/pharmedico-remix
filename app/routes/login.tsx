import {Form, useActionData} from "@remix-run/react";
import {ActionFunction, LoaderFunction} from "remix";
import {authenticator} from "~/services/auth.server";
import LabeledTextField from "~/core/components/LabeledTextField";
import { Formik } from 'formik';
import {Button} from "@mui/material";

export default function Login() {
  const action = useActionData()
  console.log(JSON.stringify(action))
  return (
    <Form method="post" action={"/login"}>
      <LabeledTextField name="email" label="Email" placeholder="Email" />
      <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      <Button type={"submit"}>Se connecter</Button>
    </Form>
  );
}

export let action: ActionFunction = async ({ request }) => {
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};

export let loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
};