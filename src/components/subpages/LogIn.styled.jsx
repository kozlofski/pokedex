import React from 'react'

import { useForm } from "react-hook-form"
import { styled } from "styled-components"
import Input from '../shared/Input.styled'

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'

import { useContext } from 'react'
import LoginContext from '../../context/LoginContext'
import { useNavigate } from 'react-router-dom'

// import useLoginUser from '../../hooks/useLoginUser'
import loginUser from '../../services/loginUser'

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
    const { setLoggedUser, setLoggedUserId } = useContext(LoginContext)
    const navigate = useNavigate();

    const onSubmit = async (data, event) => {
        event.preventDefault();

        const inputtedUserName = data.name;
        const inputtedPassword = data.password;
        try {
            const foundUserId = loginUser(inputtedUserName, inputtedPassword, JSON_SERVER_URL)
            foundUserId.then((userId) => setLoggedUserId(userId))
            setLoggedUser(data.name);
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

