import {forwardRef, PropsWithoutRef, useState} from "react"
import {IconButton, InputAdornment, InputBaseProps, StandardTextFieldProps, TextField,} from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import {useField, useIsSubmitting} from "remix-validated-form";

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  variant?: StandardTextFieldProps["variant"]
  fullWidth?: StandardTextFieldProps["fullWidth"]
  margin?: InputBaseProps["margin"]
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, type, variant, fullWidth, margin }, ref) => {
    const { error, getInputProps } = useField(name);
    const [inputType, setInputType] = useState(type)
    const isSubmitting = useIsSubmitting();

    return (
      <div {...outerProps}>
        <TextField
          label={label}
          type={inputType}
          error={error != undefined}
          helperText={error}
          variant={variant ?? "standard"}
          fullWidth={fullWidth ?? true}
          margin={margin ?? "dense"}
          InputProps={
            type == "password"
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onMouseDown={() => setInputType("text")}
                        onMouseUp={() => setInputType("password")}
                        edge="end"
                      >
                        {inputType == "password" ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              : {}
          }
          {...getInputProps({ id: name })}
        />
      </div>
    )
  }
)

export default LabeledTextField
