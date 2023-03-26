export const useNormilizedTimePeriod = (startTime: number | null, endTime: number | null) => {
    if (!startTime || !endTime) {
        return null
    }
    return {from: "From: March 25, 17:00", to:  "To: March 25, 19:00"}
}

export const useNormilizedDuration = (duration: number | null) => {
    if (!duration) {
        return null
    }
    return "15 minutes"
}