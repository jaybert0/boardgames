import * as React from 'react';
import LibraryItem from './LibraryItem'

function LibraryList({bgData, libraryForm, setLibraryForm, user}){

return(
    <div>
        {bgData.map(bg => (
            <LibraryItem 
            
            setLibraryForm = {setLibraryForm}
            user={user}
            bg={bg}
            /> 
        ))}
    </div>
    
    )}

export default LibraryList;