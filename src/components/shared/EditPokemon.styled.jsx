import React from 'react'
import PokemonRankingTable from '../shared/PokemonRankingTable'
import { styled } from "styled-components"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import Input from '../shared/Input.styled'
import { useNavigate } from 'react-router-dom'
import Button from '../shared/Button.styled'
import fetchUserData from '../../services/fetchUserData'

const JSON_SERVER_URL = "http://localhost:3000/users"


const EditForm = styled.form`
`

const editFormSchema = z.object({
    height: z.string().trim().min(1, { message: "wprowadź liczbę naturalną" }).regex(new RegExp(/^\d+$/g), { message: "nieprawidłowa liczba" }),
    weight: z.string().trim().min(1, { message: "wprowadź liczbę naturalną" }).regex(new RegExp(/^\d+$/g), { message: "nieprawidłowa liczba" }),
    baseExperience: z.string().trim().min(1, { message: "wprowadź liczbę naturalną" }).regex(new RegExp(/^\d+$/g), { message: "nieprawidłowa liczba" }),
})

const EditPokemon = ({ editedPokemon, loggedUserId }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: zodResolver(editFormSchema) })
    const navigate = useNavigate();

    setValue("height", editedPokemon.height.toString())
    setValue("weight", editedPokemon.weight.toString())
    setValue("baseExperience", editedPokemon.baseExperience.toString())

    const onSubmit = async (data, event) => {
        console.log(data)
        event.preventDefault();

        try {
            const userData = await fetchUserData(JSON_SERVER_URL, loggedUserId);
            const oldModified = userData.modified;
            const pokemonName = editedPokemon.name

            let newModified = {}

            if (pokemonName in oldModified) {
                newModified = { ...oldModified };
                newModified[pokemonName] = {
                    height: data.height,
                    weight: data.weight,
                    baseExperience: data.baseExperience,
                };
            } else {
                newModified = {
                    ...oldModified,
                    [pokemonName]: {
                        height: data.height,
                        weight: data.weight,
                        baseExperience: data.baseExperience,
                    },
                };
            }
            const patchResponse = fetch(`${JSON_SERVER_URL}/${loggedUserId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    modified: newModified,
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
            <EditForm onSubmit={handleSubmit(onSubmit, onError)}>
                <Input {...register('height')}
                    type={"text"}
                    placeholder={"wzrost"}
                    error={errors.name ?? ""} />

                <Input {...register('weight')}
                    type={"text"}
                    placeholder={"waga"}
                    error={errors.email ?? ""} />
                <Input {...register('baseExperience')}
                    type={"text"}
                    placeholder={"doświadczenie"}
                    error={errors.password ?? ""} />
                <Button type="submit" >Potwierdź zmiany</Button>

            </EditForm>
        </>
    )
}

export default EditPokemon