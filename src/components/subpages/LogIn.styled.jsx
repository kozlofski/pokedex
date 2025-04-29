import React from 'react'

import { useForm } from "react-hook-form"
import { styled } from "styled-components"
import Input from '../shared/Input.styled'

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'

import { useContext } from 'react'
import LoginContext from '../../context/LoginContext'
import { useNavigate } from 'react-router-dom'

import loginUser from '../../services/loginUser'
import Button from '../shared/Button.styled'

import cyrb53 from '../../services/cyrb53'
import { JSON_SERVER_URL } from '../../constants'

const FormContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`

const Form = styled.form`
    width: 100%;
    // min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const loginFormSchema = z.object({
    name: z.string().trim().min(1, { message: "wprowadź nazwę użytkownika" }),
    password: z.string().trim().min(1, { message: "wprowadź hasło" }),
})

const LogIn = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(loginFormSchema) })
    const { setLoggedUser, setLoggedUserId } = useContext(LoginContext)
    const navigate = useNavigate();

    const onSubmit = async (data, event) => {
        event.preventDefault();

        const inputtedUserName = data.name;
        const inputtedPassword = data.password;
        const hashedPassword = cyrb53(inputtedPassword)

        try {
            const foundUserId = await loginUser(inputtedUserName, hashedPassword, JSON_SERVER_URL, setLoggedUser, setLoggedUserId)
            if (foundUserId === -1) throw new Error()

            navigate(`/`);
        } catch (error) {
            window.alert(error)
            reset();
        }
    }

    const onError = () => { }

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit(onSubmit, onError)}>
                <Input {...register('name')}
                    type={"text"}
                    placeholder={"imię"}
                    error={errors.name ?? ""} />
                <Input {...register('password')}
                    type={"password"}
                    placeholder={"hasło"}
                    error={errors.password ?? ""} />
                <Button type="submit" >Zaloguj</Button>
            </Form>
        </FormContainer>
    )
}

export default LogIn

