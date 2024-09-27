import { Fragment } from "react";
import { Outlet, useNavigate } from "react-router-dom"; // Importa useNavigate
import {
    NavigationContainer,
    NavigationItem,
    NavigationLogo,
    NavigationList,
} from "./navigation.styles.jsx";
import { navOptions } from "../../constants/navigation.const.js";
import Button from "../../components/UI/button/button.component.jsx";

const Navigation = () => {
    const navigate = useNavigate();

    const handleCreateAccountClick = () => {
        navigate('/login'); 
    };

    return (
        <Fragment>
            <NavigationContainer>
                <NavigationLogo>
                    <h1>🧑🏻‍⚕️ </h1>
                    <h1>MEDI</h1>
                    
                </NavigationLogo>
                <NavigationList>
                    {navOptions.map((option, index) => (
                        <NavigationItem key={index} to={option.route}>
                            <li>{option.name}</li>
                        </NavigationItem>
                    ))}
                </NavigationList>
                <Button
                    title="Crear cuenta"
                    buttonType="main"
                    onClick={handleCreateAccountClick} 
                />
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;
