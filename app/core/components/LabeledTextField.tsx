import { forwardRef, PropsWithoutRef, useState } from "react"
import { useFormikContext } from "formik"
import {
  IconButton,
  InputAdornment,
  InputBaseProps,
  StandardTextFieldProps,
  TextField,
} from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

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
    const { isSubmitting, values, handleChange, errors, touched } = useFormikContext<any>()
    const [inputType, setInputType] = useState(type)

    return (
      <div {...outerProps}>
        <TextField
          label={label}
          name={name}
          type={inputType}
          value={values[name]}
          disabled={isSubmitting}
          onChange={handleChange}
          error={touched[name] && Boolean(errors[name])}
          helperText={touched[name] && errors[name]}
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
        />
      </div>
    )
  }
)

export default LabeledTextField
