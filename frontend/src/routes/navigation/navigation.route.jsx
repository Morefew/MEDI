import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import {
    NavigationContainer,
    NavigationItem,
    NavigationLogo,
    NavigationList,
} from "./navigation.styles.jsx";
import { navOptions } from "../../constants/navigation.const.js";
import Button from "../../components/UI/button/button.component.jsx";

const Navigation = () => {
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
                />
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default Navigation
