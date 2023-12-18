//HELMET//

//Parses date into tab friendly string
export function reformatAPIGameDate(game_date: any) {
    const dateParts = game_date.split("-");
    const day = dateParts[2];
    const month = dateParts[1];
    return `[${month}/${day}]`;
}

//PLAY-BY-PLAY//

//Accepts filter[str] and excludes them from the data
export function excludeFilter(data: string, filter: string[]): boolean {
    return !filter.some((term) => data.includes(term));
  };