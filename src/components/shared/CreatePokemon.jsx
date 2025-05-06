import React, { useState } from 'react'
import { styled } from "styled-components"
import { useNavigate } from 'react-router-dom'
import { createPortal } from "react-dom"
import { enqueueSnackbar } from 'notistack'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'

import fetchUserData from '../../services/fetchUserData.js'
import Button from './Button.jsx'
import PokemonPictureModal from "../shared/PokemonPictureModal"
import Input from '../shared/Input'
import { JSON_SERVER_URL } from "../../constants.js"

const editFormSchema = z.object({
    name: z.string().trim().min(1, { message: "imię nie może być puste" }),
    height: z.string().trim().min(1, { message: "wprowadź liczbę naturalną" }).regex(new RegExp(/^\d+$/g), { message: "nieprawidłowa liczba" }),
    weight: z.string().trim().min(1, { message: "wprowadź liczbę naturalną" }).regex(new RegExp(/^\d+$/g), { message: "nieprawidłowa liczba" }),
    baseExperience: z.string().trim().min(1, { message: "wprowadź liczbę naturalną" }).regex(new RegExp(/^\d+$/g), { message: "nieprawidłowa liczba" }),
    ability: z.string().trim().min(1, { message: "umiejętnośćnie może być pusta" }),
})

const CreatePokemon = ({ loggedUserId }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(editFormSchema) })
    const navigate = useNavigate();
    const [modalOpened, setModalOpened] = useState(false)
    const [chosenImageUrl, setChosenImageUrl] = useState(null)

    const modal = createPortal(
        <PokemonPictureModal onClose={() => setModalOpened(false)} setChosenImageUrl={setChosenImageUrl} userId={loggedUserId} />,
        document.body
    )

    const onSubmit = async (data, event) => {
        event.preventDefault();

        try {
            if (chosenImageUrl === null) {
                enqueueSnackbar("wybierz obrazek dla pokemona")
                throw new Error("wybierz obrazek dla pokemona")
            }

            const userData = await fetchUserData(loggedUserId);
            const oldCreated = userData.created;
            const picturesUsed = userData.picturesUsed;

            if (data.name in oldCreated)
                throw new Error("pokemon with that name already exists")

            let newCreated = {}
            newCreated = {
                ...oldCreated,
                [data.name]: {
                    height: parseInt(data.height),
                    weight: parseInt(data.weight),
                    baseExperience: parseInt(data.baseExperience),
                    ability: data.ability,
                    imgUrl: chosenImageUrl
                },
            };

            const newPicturesUsed = {
                ...picturesUsed,
                [chosenImageUrl]: true
            }

            const patchResponse = fetch(`${JSON_SERVER_URL}/${loggedUserId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    created: newCreated,
                    picturesUsed: newPicturesUsed,
                }),
            });
            if (!patchResponse) throw new Error("błąd podczas tworzenia pokemona")

            enqueueSnackbar(`Pomyślnie utworzono nowego pokemona ${data.name}`)
            navigate(`/`);
        } catch (error) {
            console.error(error)
        }
    }

    const onError = (error) => {
        console.error("Error from hook: : ", error)
    }

    return (
        <CreateFormContainer>
            <CreateForm onSubmit={handleSubmit(onSubmit, onError)}>
                <Input {...register('name')}
                    type={"text"}
                    label="Imię:"
                    placeholder={"imię"}
                    error={errors.name ?? ""} />

                <Input {...register('height')}
                    type={"text"}
                    label="Wzrost:"
                    placeholder={"wzrost"}
                    error={errors.height ?? ""} />

                <Input {...register('weight')}
                    type={"text"}
                    label="Waga:"
                    placeholder={"waga"}
                    error={errors.weight ?? ""} />

                <Input {...register('baseExperience')}
                    type={"text"}
                    label="Doświadczenie:"
                    placeholder={"doświadczenie"}
                    error={errors.baseExperience ?? ""} />

                <Input {...register('ability')}
                    type={"text"}
                    label="Umiejętność:"
                    placeholder={"umiejętność"}
                    error={errors.ability ?? ""} />

                {chosenImageUrl && <Image src={chosenImageUrl} />}
                <Button onClick={() => setModalOpened(true)} width="80%">Wybierz zdjęcie dla pokemona</Button>
                <Button type="submit" width="80%">Utwórz</Button>
                {modalOpened && modal}
            </CreateForm>
        </CreateFormContainer>
    )
}

const CreateFormContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CreateForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 20rem;
    margin: 0 auto;
    gap: 0.25rem;
`

const Image = styled.img`
    height: 100px;
`

export default CreatePokemon