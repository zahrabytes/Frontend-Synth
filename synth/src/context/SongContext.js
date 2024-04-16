import { createContext, useReducer } from 'react'

// Create a new context called 'SongContext'
export const SongContext = createContext()

// Define the 'songsReducer' function that takes the current 'state' and an 'action' as arguments
export const songsReducer = (state, action) => {
    // Use a switch statement to determine how to update the state based on the 'action.type'
    switch (action.type) {
        // If the 'action.type' is 'SET_SONGS'
        case 'SET_SONGS':
            // Return a new state object with the 'songs' property set to the 'action.payload'
            return {
                songs: action.payload
            }
        // If the 'action.type' is 'DELETE_SONG'
        case 'DELETE_SONG':
            // Return a new state object with the 'songs' property set to a filtered array
            // The filtered array includes all songs except the one with the '_id' matching 'action.payload._id'
            return {
                songs: state.songs.filter((s) => s.songID !== action.payload._id)
            }
        // If the 'action.type' doesn't match any of the above cases
        default:
            // Return the current state unchanged
            return state
    }
}

// Define the 'SongContextProvider' component that takes 'children' as a prop
export const SongContextProvider = ({ children }) => {
    // Use the 'useReducer' hook to manage the state and dispatch function
    // The 'useReducer' hook takes the 'songsReducer' function and an initial state object as arguments
    // The initial state object has a 'songs' property set to 'null'
    const [state, dispatch] = useReducer(songsReducer, { songs: null })

    // Return the 'SongContext.Provider' component
    // The 'value' prop is set to an object that spreads the 'state' object and adds the 'dispatch' function
    // The 'children' prop is rendered inside the 'SongContext.Provider'
    return (
        <SongContext.Provider value={{ ...state, dispatch }}>
            {children}
        </SongContext.Provider>
    );
}