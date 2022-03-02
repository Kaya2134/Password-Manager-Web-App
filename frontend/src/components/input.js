import React, { useState } from 'react'
import axios from 'axios'

function Input({ iv, kkey, encrypted}) {
    const [type,setType] = useState("password")
    const [text,setText] = useState("Show")
    const [password,setPassword] = useState("********")

    const handleClick = () => {
        if (type === "password") {
            axios.post('http://localhost:3001/decrypt',
            {
                iv: iv,
                key: kkey,
                encrypted: encrypted
            })
            .then((response) => {
                let decrypted_password = response.data
                setPassword(decrypted_password)
            })
            setType("text")
            setText("Hide")
        }else if(type === "text"){
            setType("password")
            setPassword("********")
            setText("Show")
            
        }

    }

    const a = () =>{}

    return (
        <td>
            <input className="password-input" type={type} onChange={a} value={password} />
            <button type="button" className="show-button" onClick={handleClick}>{text}</button>
        </td>
    )
}

export default Input
