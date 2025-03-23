import React from 'react'

import { useForm } from "react-hook-form"
import { styled } from "styled-components"
import Input from '../shared/Input.styled'

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'

import { useContext } from 'react'
import LoginContext from '../../context/LoginContext'
import { useNavigate } from 'react-router-dom'

const JSON_SERVER_URL = "http://localhost:3000/users"

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const loginFormSchema = z.object({
    name: z.string().trim().min(1, { message: "wprowadź nazwę użytkownika" }),
    password: z.string().trim().min(1, { message: "wprowadź hasło" }),
})

const LogIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginFormSchema) })
    const { setLoggedUser } = useContext(LoginContext)
    const navigate = useNavigate();


    const onSubmit = async (data, event) => {
        event.preventDefault();
        try {
            // if (!(data.name in userNames))
            //     throw new Error(`user ${data.name} doesn't exist in database`)

            const response = await fetch(JSON_SERVER_URL)
            if (!response) throw new Error("something is not yes with response")

            const jsonResponse = await response.json();
            const foundUser = jsonResponse.find((user) => user.userName === data.name)
            console.log(foundUser)
            if (!foundUser) throw new Error("user not found")
            if (data.password !== foundUser.password)
                throw new Error("password incorrect")
            setLoggedUser(data.name)
            navigate(`/`);

        } catch (error) {
            window.alert(error)
        }
    }

    const onError = () => { }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Input {...register('name')}
                type={"text"}
                placeholder={"imię"}
                error={errors.name ?? ""} />
            <Input {...register('password')}
                type={"password"}
                placeholder={"hasło"}
                error={errors.password ?? ""} />
            <input type="submit" />

        </Form>

    )
}

export default LogIn

