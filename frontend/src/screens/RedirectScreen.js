import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const RedirectScreen = ({location, history}) => {

    const dispatch = useDispatch()

    const { from } = location.state


    useEffect(() => {
        history.push('/order_plate/')
    }, [history])

    return (
        <div>
        </div>
    )
}
