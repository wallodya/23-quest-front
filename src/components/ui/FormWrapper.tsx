import React, { RefAttributes } from 'react'
import * as Form from "@radix-ui/react-form"

const FormWrapper = ({children, ...props} : Form.FormProps & RefAttributes<HTMLFormElement>) => {
  return <Form.Root {...props}>{children}</Form.Root>;
}

export default FormWrapper