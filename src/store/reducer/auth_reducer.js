import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        data: {
            user: {
                id: "",
                prenom: "simon",
                nom: "didier",
                is_actif: 1,
                profile: "Admin",
                email: "",
                adresses: [
                    {
                        id: "1",
                        numero: "11",
                        rue: "rue Romain Rolland",
                        ville: "Bron",
                        code_postal: "69500",
                    },
                ],
                cartesDePaiement: [
                    {
                        id: "1",
                        nom_proprietaire: "Simon Didier",
                        numero : "",
                        date_fin_validite: "",
                        cryptogramme: "",
                    },
                ],
                panier: [
                    {
                        id: "1",
                        article: "",
                        quantite: "",
                    },
                ]
            },
        },
        error: "",
        status: 0,
    },
    reducers : {
        updateAuth: (state, action) => {
            return {...state, ...action.payload}
        }
    }
})

export const {updateAuth} = authSlice.actions
export default authSlice.reducer