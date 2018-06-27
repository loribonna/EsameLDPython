interface ITravel {
    travel_id: String,
    startPos: IPos,
    endPos: IPos,
    client: IClient,
    driver: IDriver,
    fee: Number,
    startDateTime: Date,
    endDateTime: Date,
    refoundRequest: Number
}

interface IPos {
    lat,
    lng
}