import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSchedule = (date: any) => {
  return axios.get(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=${date}&endDate=${date}`);
};

export const useScheduleData = (date: any) => {
  return useQuery(['schedule', date], () => fetchSchedule(date), {
    select: (data) => {
      const scheduleData = data.data.dates.flatMap((date: any) => date.games.map((game: any) => game.gamePk));
      return scheduleData;
    },
  });
};
