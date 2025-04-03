import React, { useEffect } from 'react'
import PokemonRankingTable from '../shared/PokemonRankingTable'
import { useState, useContext } from 'react'
import LoginContext from '../../context/LoginContext'
import Button from '../shared/Button.styled'
import EditPokemon from '../shared/EditPokemon.styled'
import CreatePokemon from '../shared/CreatePokemon.styled'
import { styled } from "styled-components"

const Init = styled.div`
    display: flex;
    flex-direction: column;
    // align-items: center;
`

const Edit = () => {
    const [editedPokemon, setEditedPokemon] = useState({})
    const [editMode, setEditMode] = useState("init")
    const { loggedUserId } = useContext(LoginContext)

    useEffect(() => {
        if (Object.keys(editedPokemon).length > 0)
            setEditMode("edit")
    }, [editedPokemon])

    return (
        <>
            {editMode === "init" &&
                (<Init>
                    <Button onClick={() => setEditMode("create")} >Stwórz własnego pokemona</Button>
                    <PokemonRankingTable edit={true} setEditedPokemon={setEditedPokemon} />
                </Init>)}
            {editMode === "edit" && <EditPokemon editedPokemon={editedPokemon} loggedUserId={loggedUserId} />}
            {editMode === "create" && <CreatePokemon loggedUserId={loggedUserId} />}
        </>
    )
}

export default Edit