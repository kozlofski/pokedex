import React from 'react'
import { styled } from "styled-components"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import Input from '../shared/Input.styled'

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const signupFormSchema = z.object({
    name: z.string().trim().min(3, { message: "imię musi zawierać conajmniej 3 znaki" }),
    email: z.string().trim().email({ message: "wprowadź prawidłowy adres e-mail" }),
    password: z.string().trim().regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g), { message: "password too weak" }),
    confirm: z.string().trim().min(1, { message: "potwierdź wprowadzone hasło" }),
}).superRefine((val, ctx) => {
    if (val.password !== val.confirm) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'hasła nie są identyczne',
            path: ['confirm'],
        })
    }
})

const SignUp = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm({ resolver: zodResolver(signupFormSchema) })

    const onSubmit = (data, event) => {
        event.preventDefault();
        console.log(data)
        console.log("Errors from hook: ", errors)
    }

    const onError = (error) => {
        console.log("Error: ", error)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Input {...register('name')}
                type={"text"}
                placeholder={"imię"}
                error={errors.name ?? ""} />

            <Input {...register('email')}
                type={"text"}
                placeholder={"e-mail"}
                error={errors.email ?? ""} />
            <Input {...register('password')}
                type={"password"}
                placeholder={"hasło"}
                error={errors.password ?? ""} />
            <Input {...register('confirm')}
                type={"password"}
                placeholder={"powtórz hasło"}
                error={errors.confirm ?? ""} />
            <input type="submit" />
        </Form>
    )
}

export default SignUp