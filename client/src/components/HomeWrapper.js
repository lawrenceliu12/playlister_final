import { useContext } from 'react'
import AuthContext from "../auth"
import SplashScreen from "./SplashScreen";
import HomeScreen from "./HomeScreen"

export default function HomeWrapper(){
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);

    if (auth.loggedIn)
        return <HomeScreen />
    else
        return <SplashScreen />
}
