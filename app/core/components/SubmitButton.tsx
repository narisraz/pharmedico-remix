import {Button} from "@mui/material";
import React from "react";
import {useFormContext, useIsSubmitting} from "remix-validated-form";


interface SubmitButtonProps {
  children: React.ReactNode,
  fullWidth?: boolean
}

export const SubmitButton = ({ children, fullWidth }: SubmitButtonProps) => {
  const isSubmitting = useIsSubmitting();
  const { isValid } = useFormContext();
  const disabled = isSubmitting || !isValid;

  return (
    <Button
      type={"submit"}
      variant={"contained"}
      disabled={disabled}
      fullWidth={fullWidth ?? true}
    >
      {children}
    </Button>
  )
}