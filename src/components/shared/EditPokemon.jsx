import React from 'react'
import { styled } from "styled-components"
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'

import Input from '../shared/Input'
import Button from './Button'
import fetchUserData from '../../services/fetchUserData'
import { JSON_SERVER_URL } from '../../constants'

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
            const userData = await fetchUserData(loggedUserId);
            const oldModified = userData.modified;
            const oldStats = userData.stats
            const pokemonName = editedPokemon.name
            let newModified = {}
            let newStats = {}

            if (pokemonName in oldModified) {
                newModified = { ...oldModified };
                newModified[pokemonName] = {
                    height: parseInt(data.height),
                    weight: parseInt(data.weight),
                    baseExperience: parseInt(data.baseExperience),
                };
            } else {
                newModified = {
                    ...oldModified,
                    [pokemonName]: {
                        height: parseInt(data.height),
                        weight: parseInt(data.weight),
                        baseExperience: parseInt(data.baseExperience),
                    },
                };
            }

            if (pokemonName in oldStats) {
                newStats = { ...oldStats };
                newStats[pokemonName] = {
                    wins: oldStats[pokemonName].wins,
                    losses: oldStats[pokemonName].losses,
                    baseExperience: parseInt(data.baseExperience),
                }
            } else {
                newStats = { ...oldStats }
            }

            const patchResponse = fetch(`${JSON_SERVER_URL}/${loggedUserId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    modified: newModified,
                    stats: newStats,
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
        <EditFormContainer className="edit-form-container">
            <EditForm onSubmit={handleSubmit(onSubmit, onError)}>
                <label htmlFor="height">Height: </label>
                <Input {...register('height')}
                    type={"text"}
                    placeholder={"wzrost"}
                    error={errors.name ?? ""} />

                <label htmlFor="weight">Weight: </label>

                <Input {...register('weight')}
                    type={"text"}
                    placeholder={"waga"}
                    error={errors.email ?? ""} />
                <label htmlFor="baseExperience">Base experience: </label>

                <Input {...register('baseExperience')}
                    type={"text"}
                    placeholder={"doświadczenie"}
                    error={errors.password ?? ""} />
                <Button type="submit" >Potwierdź zmiany</Button>

            </EditForm>
        </EditFormContainer>
    )
}

const EditFormContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const EditForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 20rem;
`

export default EditPokemon