import {Link, useActionData, useLoaderData} from "@remix-run/react";
import authenticator from "~/services/auth.server";
import LabeledTextField from "~/core/components/LabeledTextField";
import {SubmitButton} from "~/core/components/SubmitButton";
import {withZod} from "@remix-validated-form/with-zod";
import {z} from "zod";
import {ValidatedForm, validationError} from "remix-validated-form";
import {getSession} from "~/services/session.server";
import {ActionFunction, json, LoaderFunction} from "remix";
import {Alert, Box, Button, Typography} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen"

export default function Login() {
  const { error } = useLoaderData();
  const action = useActionData()
  console.log(JSON.stringify(action))

  return (
    <Box
      sx={{
        padding: "1em",
        maxWidth: "400px",
        textAlign: "center",
        alignItems: "center",
        margin: "auto",
        marginTop: "25px",
      }}
    >
      <LockOpenIcon
        sx={{
          fontSize: 100,
        }}
      />
      <Typography
        variant="h6"
        sx={{
          marginBottom: "1em",
        }}
      >
        LOGIN
      </Typography>

      {error != undefined
        ? <Alert severity={"error"}>Email ou mot de passe incorrect</Alert>
        : <></>
      }

      <ValidatedForm
        method={"post"}
        validator={validator}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />

        <Box
          sx={{
            textAlign: "right",
            marginBottom: "1em",
          }}
        >
          <Link to={"/forgot-password"}>
            <a>Mot de passe oublié ?</a>
          </Link>
        </Box>

        <Box
          sx={{
            marginTop: "1em",
          }}
        >
          <SubmitButton>Se connecter</SubmitButton>
        </Box>
      </ValidatedForm>

      <Box
        sx={{
          marginTop: "1em",
        }}
      >
        <Button href={"/signup-chooser"} type="submit" variant="outlined" fullWidth>
          Créer un compte
        </Button>
      </Box>
    </Box>
  );
}

export const validator = withZod(
  z.object({
    email: z
      .string()
      .email("Email invalide"),
    password: z
      .string()
  })
);

export const action: ActionFunction = async ({ request }) => {
  const fieldValues = await validator.validate(await request.formData());
  if (fieldValues.error) return validationError(fieldValues.error);
  await authenticator.authenticate("form", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });

  let session = await getSession(request.headers.get("cookie"));
  let error = session.get(authenticator.sessionErrorKey);
  return json({ error });
};