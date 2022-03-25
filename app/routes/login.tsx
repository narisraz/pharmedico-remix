import {Form, useActionData} from "@remix-run/react";
import {ActionFunction, LoaderFunction} from "remix";
import {authenticator} from "~/services/auth.server";
import LabeledTextField from "~/core/components/LabeledTextField";
import { Formik } from 'formik';

export default function Login() {
  const action = useActionData()
  console.log(JSON.stringify(action))
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
        <Form method="post">
          <LabeledTextField name="email" label="Email" placeholder="Email" />
          <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
          <button>Se connecter</button>
        </Form>
      )}
    </Formik>
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