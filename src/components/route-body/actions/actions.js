import "./actions.css";
const RouteActions = (props) => {
  const { route, editHandler, deleteHandler, viewOnMapHandler } = props;
  return (
    <div className="route-actions">
      <div className="route-action" onClick={() => editHandler(route.routeId)}>
        <img src="edit.png" alt="edit" />
        <span className="action-name">Edit</span>
      </div>
      <div
        className="route-action"
        onClick={() => deleteHandler(route.routeId)}
      >
        <img src="delete.jpeg" alt="delete" />
        <span className="action-name">Delete</span>
      </div>
      <div className="route-action" onClick={() => viewOnMapHandler(route)}>
        <img src="view-map.png" alt="view" />
        <span className="action-name">View on map</span>
      </div>
    </div>
  );
};
export default RouteActions;
