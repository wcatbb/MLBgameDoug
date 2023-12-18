//HELMET//

//Parses date into tab friendly string
export function reformatAPIGameDate(game_date: any) {
    const dateParts = game_date.split("-");
    const day = dateParts[2];
    const month = dateParts[1];
    return `[${month}/${day}]`;
}