import StopDetails from "./stop-details";
import "./route-details.css";

const RouteDetail = (props) => {
  const { route } = props;
  return (
    <div className="route-detail">
      <span className="route-name">{route.name}</span>
      <div className="route-meta-details">
        {`${route.routeId} | ${route.status} | ${route.direction} `}
      </div>
      <div className="route-stops">
        <StopDetails stops={route.stopsList} />
      </div>
    </div>
  );
};
export default RouteDetail;
