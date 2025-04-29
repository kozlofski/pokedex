import React from 'react'
import { styled } from "styled-components"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import Input from '../shared/Input.styled'
import { useNavigate } from 'react-router-dom'
import useFetchUserNames from '../../hooks/useFetchUserNames'
import { useContext } from 'react'
import LoginContext from '../../context/LoginContext'
import loginUser from '../../services/loginUser'
import Button from "./../shared/Button.styled"
import cyrb53 from '../../services/cyrb53'

import { JSON_SERVER_URL } from '../../constants'

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
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

    // add username taken case
})

const SignUp = () => {
    const { setLoggedUser, setLoggedUserId } = useContext(LoginContext)

    const userNamesTaken = useFetchUserNames();
    // console.log("User names from signup:", userNamesTaken)

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
            <Button type="submit" >Zarejestruj</Button>
        </Form>
    )
}

export default SignUp