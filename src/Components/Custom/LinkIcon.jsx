import { CgNotes } from 'react-icons/cg'; 
import { MdOutlineLockReset } from 'react-icons/md'; 
import { FaChalkboardTeacher } from 'react-icons/fa'; 
import { IoBookOutline } from 'react-icons/io5'; 
 
function LinkIcon(icon) { 
    const style = { color: 'red', fontSize: '1.5em' }; 
 
    let IconComponent = null; 
 
    switch (icon) { 
        case 'staff': 
            IconComponent = FaChalkboardTeacher; 
            break; 
        case 'add': 
            IconComponent = IoBookOutline; 
            break; 
        case 'feedback': 
            IconComponent = CgNotes; 
            break; 
        case 'reset': 
            IconComponent = MdOutlineLockReset; 
            break; 
        default: 
            break; 
    } 
 
    if (!IconComponent) { 
        return null; 
    } 
 
    return <IconComponent style={style} />; 
} 
 
export default LinkIcon; 