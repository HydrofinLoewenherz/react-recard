import { Button, ButtonProps } from '@mui/material'

export const FormButton = ({ variant, ...props }: ButtonProps) => <Button variant={variant ?? 'outlined'} {...props} />
