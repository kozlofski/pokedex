import React from 'react'
import { styled } from "styled-components"
import { useForm } from "react-hook-form"

import Input from '../shared/Input.styled'

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`



const SignUp = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm()

    const onSubmit = (data, event) => {
        event.preventDefault();
        console.log(data)
    }

    const onError = (error) => {
        console.log("Error: ", error)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Input {...register('name')} type={"text"} placeholder={"imię"}></Input>
            <Input {...register('email')} type={"text"} placeholder={"e-mail"}></Input>
            <Input {...register('password')} type={"password"} placeholder={"hasło"}></Input>
            <Input type={"password"} placeholder={"powtórz hasło"}></Input>
            <input type="submit" />
        </Form>
    )
}

export default SignUp