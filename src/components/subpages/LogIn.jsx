import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useForm } from "react-hook-form"
import { styled } from "styled-components"
import { useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'

import LoginContext from '../../context/LoginContext'
import loginUser from '../../services/loginUser'
import Input from '../shared/Input'
import Button from '../shared/Button'

import cyrb53 from '../../services/cyrb53'
import { JSON_SERVER_URL } from '../../constants'

const loginFormSchema = z.object({
    name: z.string().trim().min(1, { message: "wprowadź nazwę użytkownika" }),
    password: z.string().trim().min(1, { message: "wprowadź hasło" }),
})

const LogIn = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(loginFormSchema) })
    const { loggedUserId, setLoggedUser, setLoggedUserId } = useContext(LoginContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedUserId !== "-1") navigate("/")
    })

    const onSubmit = async (data, event) => {
        event.preventDefault();

        const inputtedUserName = data.name;
        const inputtedPassword = data.password;
        const hashedPassword = cyrb53(inputtedPassword)

        try {
            const foundUserId = await loginUser(inputtedUserName, hashedPassword, JSON_SERVER_URL, setLoggedUser, setLoggedUserId)
            if (foundUserId === -1) throw new Error()
            enqueueSnackbar(`Zalogowano użytkownika ${inputtedUserName}`);
            navigate(`/`);
        } catch (error) {
            console.error(error)
            reset();
        }
    }

    return (<>{loggedUserId === "-1" &&
        <FormContainer>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register('name')}
                    type={"text"}
                    label="Imię:"
                    placeholder={"imię"}
                    error={errors.name ?? ""} />
                <Input {...register('password')}
                    type={"password"}
                    label="Hasło:"
                    placeholder={"hasło"}
                    error={errors.password ?? ""} />
                <Button type="submit" >Zaloguj</Button>
            </Form>
        </FormContainer>}
    </>
    )
}

const FormContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export default LogIn

