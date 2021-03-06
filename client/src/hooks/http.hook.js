import {useState, useCallback} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {

            if(body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {
                method,
                body,
                headers
            })
            const data = await response.json()

            if(!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }

            setLoading(false)

            return data

        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(()  => setError(null), [])
    //Чтобы использовать функцию в качестве useState() - нужно вызывать в ней useCallback(),
    //для ее правильной работы.

    return { loading, request, error, clearError }
}