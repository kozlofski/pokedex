import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import { styled } from "styled-components"
import { useNavigate } from 'react-router-dom'

import PokemonRankingTable from '../shared/PokemonRankingTable'
import LoginContext from '../../context/LoginContext'
import Button from '../shared/Button'
import EditPokemon from '../shared/EditPokemon'
import CreatePokemon from '../shared/CreatePokemon'

const Edit = () => {
    const { loggedUserId } = useContext(LoginContext)

    const [editedPokemon, setEditedPokemon] = useState({})
    const [editMode, setEditMode] = useState("init")
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedUserId === '-1') navigate('/forbidden')
    })

    useEffect(() => {
        if (Object.keys(editedPokemon).length > 0)
            setEditMode("edit")
    }, [editedPokemon, navigate, loggedUserId])

    return (<>{loggedUserId !== '-1' &&
        <EditContainer className="edit-container">
            {editMode === "init" &&
                (<InitContainer>
                    <Button onClick={() => setEditMode("create")} width={"10rem"}>Stwórz własnego pokemona</Button>
                    <PokemonRankingTable edit={true} setEditedPokemon={setEditedPokemon} />
                </InitContainer>)}
            {editMode === "edit" && <EditPokemon editedPokemon={editedPokemon} loggedUserId={loggedUserId} />}
            {editMode === "create" && <CreatePokemon loggedUserId={loggedUserId} />}
        </EditContainer>}
    </>
    )
}

const EditContainer = styled.div`
    min-width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    align-items: center;
`

const InitContainer = styled.div`
    min-width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    align-items: center;
    padding-top: 1rem;
`

export default Edit