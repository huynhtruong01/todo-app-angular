import * as moment from 'moment'

export const getDate = (dateTime: Date): string => {
    const date = `0${new Date(dateTime).getDate()}`.slice(-2)
    const month = `0${new Date(dateTime).getMonth() + 1}`.slice(-2)
    const year = new Date(dateTime).getFullYear()

    return `${date}/${month}/${year}`
}

export const getTime = (dateTime: Date): string => {
    const hours = `0${new Date(dateTime).getHours()}`.slice(-2)
    const minutes = `0${new Date(dateTime).getMinutes()}`.slice(-2)
    const seconds = `0${new Date(dateTime).getSeconds()}`.slice(-2)

    return `${hours}:${minutes}:${seconds}`
}

export const getCountDownTime = (dateTime: number): string => {
    const difference = dateTime / 1000
    // const _day = 60 * 60 * 24
    const _hour = 60 * 60
    const _minute = 60

    // const days = Math.floor(difference / _day)
    // const hours = Math.floor((difference % _day) / _hour)
    const minutes = `0${Math.floor((difference % _hour) / _minute)}`.slice(-2)
    const seconds = `0${Math.floor(difference % _minute)}`.slice(-2)

    return `${minutes}:${seconds}`
    // return ''
}

export const formatDateTime = (dateTime: Date): string => {
    const date = getDate(dateTime)
    const time = getTime(dateTime)

    return `${time} ${date}`
}

// compare time
export const compareTime = (dateTime: Date): number => {
    return new Date(dateTime).getTime() - new Date(Date.now()).getTime()
}

export const formatTimeString = (dateTime: Date): string => {
    return moment(dateTime).toNow(true)
}

export const countDown = (dateTime: Date) => {
    return getCountDownTime(new Date(dateTime).getTime() - new Date().getTime())
}
