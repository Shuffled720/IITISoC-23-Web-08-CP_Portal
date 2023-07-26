import React from 'react'
import alertContext from './alertContext';
import Alert from '../../components/Alert';
import { useState } from "react";

function AlertState(props) {

    const [alert, setAlert] = useState(null);
    const showAlert = (message, type)=>{
        setAlert({
          msg: message,
          type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    }
    return (
        <>
        <Alert alert={alert}/>
          <alertContext.Provider value={{alert, showAlert}}>
          {props.children}
          </alertContext.Provider>
        </>
    )
}

export default AlertState;