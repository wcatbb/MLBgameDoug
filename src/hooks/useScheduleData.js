import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchSchedule = (date) => {
    return axios.get(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=${date}&endDate=${date}`)
}

export const useScheduleData = (date) => {
    return useQuery(['schedule', date], () => fetchSchedule(date), {
        select: (data) => {
            const scheduleData = data.data.dates.flatMap(date => date.games.map(game => game.gamePk));
            return scheduleData;
        }
    },
        { suspense: true });
}