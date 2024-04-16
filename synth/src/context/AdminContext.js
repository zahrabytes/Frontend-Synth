import { createContext, useReducer } from 'react'

// Create a new context called 'AdminContext'
export const AdminContext = createContext()

// Define the 'adminReducer' function that takes the current 'state' and an 'action' as arguments
export const adminReducer = (state, action) => {
    // Use a switch statement to determine how to update the state based on the 'action.type'
    switch (action.type) {
        // If the 'action.type' is 'SET_SONGS'
        case 'SET_ADMIN':
            // Return a new state object with the 'songs' property set to the 'action.payload'
            return {
                notifications: action.payload
            }
        // If the 'action.type' is 'DELETE_SONG'
        case 'DELETE_ADMIN':
            // Return a new state object with the 'songs' property set to a filtered array
            // The filtered array includes all songs except the one with the '_id' matching 'action.payload._id'
            return {
                notifications: state.notifications.filter((item) => item.songID !== action.payload._id)
            }
        // If the 'action.type' doesn't match any of the above cases
        default:
            // Return the current state unchanged
            return state
    }
}

// Define the 'AdminContextProvider' component that takes 'children' as a prop
export const AdminContextProvider = ({ children }) => {
    // Use the 'useReducer' hook to manage the state and dispatch function
    // The 'useReducer' hook takes the 'adminReducer' function and an initial state object as arguments
    // The initial state object has a 'songs' property set to 'null'
    const [state, dispatch] = useReducer(adminReducer, { notifications: null })

    // Return the 'AdminContext.Provider' component
    // The 'value' prop is set to an object that spreads the 'state' object and adds the 'dispatch' function
    // The 'children' prop is rendered inside the 'AdminContext.Provider'
    return (
        <AdminContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AdminContext.Provider>
    );
}