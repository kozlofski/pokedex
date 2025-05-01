import React from 'react'
import { useContext } from 'react'
import { styled } from "styled-components"
import { useNavigate } from 'react-router-dom'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'

import Input from '../shared/Input'
import LoginContext from '../../context/LoginContext'
import Button from "./../shared/Button"
import loginUser from '../../services/loginUser'
import useFetchUserNames from '../../hooks/useFetchUserNames'
import cyrb53 from '../../services/cyrb53'

import { JSON_SERVER_URL } from '../../constants'

const FormContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const signupFormSchema = z.object({
    name: z.string().trim().min(3, { message: "imię musi zawierać conajmniej 3 znaki" }),
    email: z.string().trim().email({ message: "wprowadź prawidłowy adres e-mail" }),
    password: z.string().trim().min(8, { message: "hasło musi zawierać co najmniej 8 znaków" })
        .regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g), { message: "za słabe hasło" }),
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
    const { setLoggedUser, setLoggedUserId } = useContext(LoginContext)
    const userNamesTaken = useFetchUserNames();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(signupFormSchema) })
    const navigate = useNavigate();

    const onSubmit = async (data, event) => {
        event.preventDefault();
        console.log("submit successful", data)
        try {
            if (data.name in userNamesTaken)
                throw new Error(`user name ${data.name} already taken`)

            const hashedPassword = cyrb53(data.password)

            const response = await fetch(JSON_SERVER_URL, {
                method: "POST",
                body: JSON.stringify({
                    userName: data.name,
                    userEmail: data.email,
                    hashedPassword: hashedPassword,
                    favourites: {},
                    "arena": {},
                    "stats": {},
                    "modified": {},
                    "created": {},
                    "usedPictures": {},
                })
            })
            if (!response) throw new Error("something is not yes with POST response")

            loginUser(data.name, hashedPassword, JSON_SERVER_URL, setLoggedUser, setLoggedUserId)

            navigate(`/`);
        } catch (error) {
            window.alert(error)
        }
    }

    const onError = (error) => {
        console.log("Error from hook: : ", error)
        console.log("UserNamesTaken: ", userNamesTaken)
    }

    return (
        <FormContainer>
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
                <Button type="submit" width="8rem">Zarejestruj</Button>
            </Form>
        </FormContainer>
    )
}

export default SignUp