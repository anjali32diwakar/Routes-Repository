import React, { useState } from "react";
import Button from "../../common/button";
import "./route-body.css";
import { getRouteDetails, setRouteIds } from "./utils";
import RouteDetail from "./route-detail/detail";
import RouteActions from "./actions/actions";
import ManageRoute from "./manage-route/manage-route";
import { CSVLink } from "react-csv";
import RouteMap from "./route-map/route-map";

const RouteBody = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewOnMap, setViewOnMap] = useState(false);
  const [selectedRouteDetails, setSelectedRouteDetails] = useState({});
  const [routeDetails, setRouteDetails] = useState(getRouteDetails());
  const [selectedRoute, setSelectedRoute] = useState({});

  const addRouteHandler = (selectedRoute) => {
    let updatedRoutes = routeDetails;
    if (!isEditMode) {
      updatedRoutes.push(selectedRoute);
    } else {
      updatedRoutes = updatedRoutes.map((route) => {
        if (route.routeId === selectedRoute.routeId) {
          return selectedRoute;
        } else {
          return route;
        }
      });
    }
    setRouteDetails(updatedRoutes);
    setIsModalVisible(false);
  };
  const bulkAddRoute = (routes) => {
    let updatedRoutes = routeDetails;
    updatedRoutes.push(...routes);
    setRouteDetails(updatedRoutes);
    setIsModalVisible(false);
  }
  const cancelHandler = () => {
    setIsModalVisible(false);
  };
  const openAddRouteModal = () => {
    setIsModalVisible(true);
    setIsEditMode(false);
  };
  const editHandler = (routeId) => {
    const selectedRoute = routeDetails.find(
      (route) => route.routeId === routeId
    );
    setSelectedRouteDetails(selectedRoute);
    setIsModalVisible(true);
    setIsEditMode(true);
  };
  const deleteHandler = (routeId) => {
    let filteredRouteDetails = routeDetails.filter(
      (route) => route.routeId !== routeId
    );
    filteredRouteDetails = setRouteIds(filteredRouteDetails);
    setRouteDetails(filteredRouteDetails);
  };
  const viewOnMapHandler = (route) => {
    setViewOnMap(true);
    setSelectedRoute(route);
  };


  return (
    <div className="content">
      <div className="route-details-container">
        <div className="details-head-container">
          <img className="bus-head" src="bus.gif" alt="empty-bus" />
          <span className="details-title">{"Routes"}</span>
          <span className="export-container">
            <CSVLink filename="route-data.csv" data={routeDetails}>
              <img src="export.jpeg" alt="export" />
              <span>Export </span>
            </CSVLink>
          </span>
          <div className="add-route-button" onClick={() => openAddRouteModal()}>
            <Button label={`+ Add Route`} className={"primary-button"} />
          </div>
        </div>
        <div className="route-content">
          {routeDetails.length ? (
            routeDetails.map((route) => {
              return (
                <div key={route.routeId} className="route">
                  <RouteDetail route={route} />
                  <RouteActions
                    route={route}
                    {...{ editHandler, deleteHandler, viewOnMapHandler }}
                  />
                </div>
              );
            })
          ) : (
            <div className="no-data-container">
              <img src="bus.gif" alt="empty-bus" />
              <span className="no-route"> No route found.</span>
            </div>
          )}
        </div>
        <div style={{ height: "100vh", width: "100%" }}></div>
      </div>
      {viewOnMap && (
        <RouteMap route={selectedRoute} setViewOnMap={setViewOnMap} />
      )}

      {isModalVisible && (
        <div className="route-add-container">
          {" "}
          <ManageRoute
            {...{
              title: "Add Route",
              routeDetails,
              handleCreate: addRouteHandler,
              handleCancel: cancelHandler,
              selectedRouteDetails,
              isEditMode,
              bulkAddRoute
            }}
          />
        </div>
      )}
    </div>
  );
};
export default RouteBody;
