import * as React from 'react';
import LibraryItem from './LibraryItem'

function LibraryList({bgData, libraryForm, setLibraryForm, user}){
console.log(bgData)
return(
    <div>
        {bgData?.map(bg => (
            <LibraryItem 
            key = {bg.id}
            setLibraryForm = {setLibraryForm}
            user={user}
            bg={bg}
            /> 
            
        ))}
    </div>
    
    )}

export default LibraryList;