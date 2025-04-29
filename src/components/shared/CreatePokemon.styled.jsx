import React, { useState } from 'react'
import { styled } from "styled-components"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import Input from '../shared/Input.styled'
import { useNavigate } from 'react-router-dom'
import Button from '../shared/Button.styled'
import fetchUserData from '../../services/fetchUserData'
// import fetchLinksToPokemons from '../../services/fetchLinksToPokemons'
import { createPortal } from "react-dom"
import PokemonPictureModal from "../shared/PokemonPictureModal.styled"
import { JSON_SERVER_URL } from "../../constants.js"

const CreateForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: end;
    max-width: 20rem;
    margin: 0 auto;
`

const Image = styled.img`
    height: 100px;

    @media (max-width: 600px) {
        // fix this
    }
`

const editFormSchema = z.object({
    name: z.string().trim().min(1, { message: "imię pokemona musi zawierać co najmniej 2 litery" }),
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
        console.log(data)
        event.preventDefault();

        try {
            if (chosenImageUrl === null)
                throw new Error("please choose picture")

            const userData = await fetchUserData(loggedUserId);
            const oldCreated = userData.created;
            const picturesUsed = userData.picturesUsed;

            if (data.name in oldCreated)
                throw new Error("pokemon with that name already exists")

            let newCreated = {}
            newCreated = {
                ...oldCreated,
                [data.name]: {
                    height: data.height,
                    weight: data.weight,
                    baseExperience: data.baseExperience,
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
            if (!patchResponse) throw new Error("something is not yes with patching pokemon")

            navigate(`/`);
        } catch (error) {
            window.alert(error)
        }
    }

    const onError = (error) => {
        console.log("Error from hook: : ", error)
    }

    return (
        <>
            <CreateForm onSubmit={handleSubmit(onSubmit, onError)}>


                <label htmlFor="name">Imię: </label>
                <Input {...register('name')}
                    type={"text"}
                    placeholder={"imię"}
                    error={errors.name ?? ""} />

                <label htmlFor="height">Wzrost: </label>
                <Input {...register('height')}
                    type={"text"}
                    placeholder={"wzrost"}
                    error={errors.height ?? ""} />

                <label htmlFor="weight">Waga: </label>
                <Input {...register('weight')}
                    type={"text"}
                    placeholder={"waga"}
                    error={errors.weight ?? ""} />

                <label htmlFor="baseExperience">Doświadczenie: </label>
                <Input {...register('baseExperience')}
                    type={"text"}
                    placeholder={"doświadczenie"}
                    error={errors.baseExperience ?? ""} />

                <label htmlFor="baseExperience">Umiejętność: </label>
                <Input {...register('ability')}
                    type={"text"}
                    placeholder={"umiejętność"}
                    error={errors.ability ?? ""} />
                {chosenImageUrl && <Image src={chosenImageUrl} />}
                <Button onClick={() => setModalOpened(true)}>Wybierz zdjęcie dla pokemona</Button>
                <Button type="submit" >Utfusz</Button>
                {modalOpened && modal}

            </CreateForm>
        </>
    )
}

export default CreatePokemon