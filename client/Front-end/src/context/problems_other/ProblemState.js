import ProblemContext from "./ProblemsContext";
import { useState } from "react";
import React from 'react'

export default function ProblemState() {
    return (
        <ProblemContext.Provider value={{todos, deleteTodo,editTodo , addTodo , getTodo , searchTodo , todosearch}}>
            {props.children}
        </ProblemContext.Provider>
    )

}
