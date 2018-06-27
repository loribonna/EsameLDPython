interface ITravel {
    travel_id,
    startPos: IPos,
    endPos: IPos,
    client,
    driver,
    fee,
    startDateTime,
    endDateTime
}

interface IPos {
    lat,
    lng
}