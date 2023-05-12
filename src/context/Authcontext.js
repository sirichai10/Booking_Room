import { createContext, useEffect, useState } from "react";
import { appdb } from "../utils/firebase";
import { getAuth,onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextPovider = ({children}) =>{
    const auth = getAuth(appdb);
    const [user, setUser] = useState({});
    const [ staffs, setStaffs ] = useState([]);
    const [ staff, setStaff ] = useState({});

    const db = getFirestore(appdb);
    const docRef = collection(db,"members");
    
    const signIn = (email, password)=>{
        return signInWithEmailAndPassword(auth,email,password);
    };

    const createUser = (email, password)=>{
        return createUserWithEmailAndPassword(auth,email,password);
    };

    const logout = () => {
        return signOut(auth)
    }

    const getStaff = async ()=>{
        const dbtotal = await getDocs(docRef);
        setStaffs(dbtotal.docs.map((item)=>{
            return {...item.data(),id: item.id}
        }));
    }
    const subscribe = onAuthStateChanged(auth, (currentUser)=>{
        let userNow = currentUser.email;
        staffs.map((item)=>{
            if(item.Email === userNow){
                setStaff(item)
            }
        })
        setUser(currentUser);
    });

    useEffect( () =>{
        subscribe();
        getStaff();
    },[]);

    return (
        <UserContext.Provider value={{signIn,createUser,user,logout,staff}}>
            {children}
        </UserContext.Provider>
    );
};
export {UserContext};