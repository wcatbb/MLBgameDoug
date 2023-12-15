import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchGame = (gamePk) => {
    return axios.get(`https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live`)
}
export const useGameData = (gamePk) => {
    return useQuery(['game', gamePk], () => fetchGame(gamePk), {suspense: true});
}