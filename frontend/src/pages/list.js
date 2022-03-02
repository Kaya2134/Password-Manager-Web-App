import React, { useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import Input from '../components/input'

function List({ authorized }) {
    let history = useHistory()
    if(!authorized){history.push("/")}

    const [list,setList] = useState([])
    const [title,setTitle] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [reload,setReload] = useState(false)

    
    useEffect(()=>{
        axios.get('http://localhost:3001/getlist').then((response)=>{
            setList(response.data)
        })
        
    },[reload])

    const add = () => {
        setReload(false)
        if(password !== "")
        axios.post('http://localhost:3001/add',{title:title,username:username,password:password}).then(()=>{
            setReload(true)
        }  
        )
    }

    const deleteData = (a_id) => {
        setReload(false)
        axios.post('http://localhost:3001/delete',{id:a_id}).then(()=>{
            setReload(true)
        })
    }

    return (
        <div  className="list-container">
            <div className="list-container-add">
                <input type="text"
                onChange={(e)=>{
                    setTitle(e.target.value)
                }} 
                placeholder="Title"/>
                <input type="text"
                onChange={(e) => {
                    setUsername(e.target.value)
                }}  
                placeholder="Username"/>
                <input type="password"
                onChange={(e) => {
                    setPassword(e.target.value)
                }}  
                placeholder="Password"/>
                <button className="button" onClick={add}>Add</button>
            </div>

            <div className="list-container-table">
               <table>
                   <tbody>
                       <tr>
                           <th>Title</th>
                           <th>Username</th>
                           <th style={{textAlign: 'left',marginLeft:'50px'}}>Password</th>
                       </tr>
                    {
                    list.map((x)=>{
                        return (
                            <tr>
                                <td>{x[5]}</td>
                                <td>{x[4]}</td>
                                <Input iv={x[1]} kkey={x[2]} encrypted={x[3]} />
                                <td><button onClick={()=>{deleteData(x[0])}} type="button" className="show-button">Delete</button></td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
                    
            </div>
        </div>
    )
    
}

export default List;
