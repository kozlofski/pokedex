import React, { useEffect } from 'react'
import PokemonRankingTable from '../shared/PokemonRankingTable'
import { useState, useContext } from 'react'
import LoginContext from '../../context/LoginContext'
import Button from '../shared/Button.styled'
import EditPokemon from '../shared/EditPokemon.styled'

const JSON_SERVER_URL = "http://localhost:3000/users"

const Edit = () => {
    const [editedPokemon, setEditedPokemon] = useState({})
    const [editMode, setEditMode] = useState("init")
    // init, edit, create
    const { loggedUserId } = useContext(LoginContext)

    useEffect(() => {
        if (Object.keys(editedPokemon).length > 0)
            setEditMode("edit")
    }, [editedPokemon])

    return (
        <>
            <div>Edit</div>
            {editMode === "init" && <PokemonRankingTable edit={true} setEditedPokemon={setEditedPokemon} />}
            {editMode === "edit" && <EditPokemon editedPokemon={editedPokemon} loggedUserId={loggedUserId} />}
        </>
    )
}

export default Edit