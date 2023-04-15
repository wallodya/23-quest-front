import moment from "moment"

export const useNormilizedTimePeriod = (startTime: Date | null, endTime: Date | null) => {
    if (!startTime || !endTime) {
        return null
    }
    const start = new Date(startTime)
    const end = new Date(endTime)
    const currentTime = new Date()
    const isToday = (Number(start) - Number(currentTime)) < 24 * 60 * 60 * 1000
    const isThisWeek = (Number(start) - Number(currentTime)) < 7 * 24 * 60 * 60 * 1000
    const isThisMonth = (Number(start) - Number(currentTime)) < 31 * 24 * 60 * 60 * 1000
    // console.log("today: ", isThisWeek)

    const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
        // hour: "numeric",
        // minute: "2-digit",
        dateStyle: "short",
        timeStyle: "short"
        

        // weekday: isThisWeek && !isToday ? "short" : undefined,

        // month: isToday ? undefined : "2-digit",
        // day: isToday ? undefined : "2-digit",
    }

    const startMoment = moment(startTime)
    const endMoment = moment(endTime)

    // const formatDate = new Intl.DateTimeFormat("en-us", dateTimeFormatOptions).format
    const formatDate = {from: startMoment.format("lll") , to: endMoment.format("lll") }
    return formatDate
    // return { from: formatDate(start), to: formatDate(end) }; // TODO use library
}

export const useNormilizedDuration = (duration: number | null) => {
    if (!duration) {
        return null
    }
    const minutes = Math.floor(duration / (1000 * 60)) || 1
    return minutes > 1 ? `${minutes} minutes` : "1 minute" //TODO use library
}