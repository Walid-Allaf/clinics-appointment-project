"use client";
import { IconButton, InputAdornment, TextField, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ErrorMessage, Field } from "formik";
import { useState } from "react";
import FormTitle from "./FormTitle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const ErrorMessageStyled = styled(Box)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: "12px",
}));

export default function InputField({
  name,
  type = "string",
  startWith,
  label,
  component = "input",
  size = "small",
  endWith,
  margin = "none",
  onClearable,
  disabled = false,
  onChange: onChangField,
  placeholder,
  error,
  clearable,
  min,
  max,
  onKeyDown,
  inputMode,
  focused = false,
}: TProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <Field validateOnBlur validateOnChange name={name}>
      {({ field: { onChange, ...field }, form: { touched, errors, ...form } }: any) => (
        <Box flex={1}>
          <FormTitle title={label} />
          <TextField
            variant="outlined"
            autoComplete="false"
            error={Boolean(errors[name] && (touched[name] || error))}
            {...field}
            onKeyDown={onKeyDown}
            onWheel={(event: any) => {
              event?.target?.blur();
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChange(e);
              onChangField && onChangField(e);
            }}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            sx={
              size === "small"
                ? {
                    ".MuiInputBase-input": { padding: "8px", fontSize: "0.9rem" },
                    backgroundColor: "#F4F4F4",
                    color: "secondary.main",
                  }
                : { ".MuiOutlinedInput-input": { height: "initial" } }
            }
            type={type === "password" ? (showPassword ? "string" : "password") : type}
            multiline={component === "textarea"}
            wrap="soft"
            minRows={component === "textarea" ? 4 : 1}
            maxRows={component === "textarea" ? 15 : 1}
            mb={Boolean((errors[name] || error) && touched[name]) ? 0 : 1}
            fullWidth
            // label={label}
            margin={margin}
            InputLabelProps={{ shrink: true }}
            focused={focused}
            InputProps={{
              inputProps: { min: min, max: max, inputMode: inputMode },
              endAdornment:
                type === "password" ? (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ) : (
                  <>
                    {clearable && field.value !== null && field.value !== undefined && field.value !== "" && component !== "textarea" && (
                      <IconButton
                        onClick={() => {
                          form.setFieldValue(name, "");
                          onClearable && onClearable();
                        }}
                        sx={{ fontSize: "1rem", padding: "5px" }}
                      >
                        Close
                      </IconButton>
                    )}
                    {endWith}
                  </>
                ),
              startAdornment: startWith && <InputAdornment position="start">{startWith}</InputAdornment>,
            }}
          />
          <ErrorMessage name={name}>{(msg) => <ErrorMessageStyled>{msg}</ErrorMessageStyled>}</ErrorMessage>
        </Box>
      )}
    </Field>
  );
}

export type TProps = {
  name: string;
  type?: string;
  label: string;
  component?: "textarea" | "input" | undefined;
  size?: "medium" | "small";
  startWith?: any;
  endWith?: any;
  margin?: "normal" | "none" | "dense";
  onClearable?: () => void;
  disabled?: boolean;
  props?: any;
  onChange?: (val: any) => void;
  placeholder?: string;
  error?: boolean;
  clearable?: boolean;
  min?: any;
  max?: any;
  onKeyDown?: (event: any) => void;
  inputMode?: string;
  focused?: boolean;
};
