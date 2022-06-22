import { ComponentType } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { routerType } from "../Content/Profile/ProfileContainer";

export function withRouter<WP extends routerType>(WrappedComponent: ComponentType<WP>) {
    const ComponentWithRouterProp: React.FC<Omit<WP, 'router'>> = (props) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <WrappedComponent
                {...props as WP}
                router={{ location, navigate, params }
                }
            />
        );
    }

    return ComponentWithRouterProp;
}