import {Button} from "@mui/material";
import React from "react";
import {useFormContext, useIsSubmitting} from "remix-validated-form";


interface SubmitButtonProps {
  children: React.ReactNode
}

export const SubmitButton = ({ children }: SubmitButtonProps) => {
  const isSubmitting = useIsSubmitting();
  const { isValid } = useFormContext();
  const disabled = isSubmitting || !isValid;

  return (
    <Button
      type={"submit"}
      variant={"contained"}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}