import { isSessionSet } from "./session"

export const insertHistories = async (data) => {
    // const f = isSessionSet('session')

    // if (f) {
            // await fetch('http://localhost:8900/test/json/get?t='+time, {}).catch(() => {})

            await fetch('http://localhost:8900/update/history/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).catch(() => { })
    // }
}

export const createHistory = (data) => {
    fetch('http://localhost:8900/insert/history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).catch(() => { })
}