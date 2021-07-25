import Button from "../../../common/button";
import {
  Stops,
  getSelectedStopsForSelect,
  getDirectionOptions,
  getStatusOptions,
  getRouteId,
} from "../utils";
import "./manage-route.css";
import { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import Papa  from 'papaparse';

const id = "csv-upload";
const ManageRoute = (props) => {
  const {
    selectedRouteDetails,
    isEditMode,
    routeDetails: renderedRoutes,
    handleCreate,
    handleCancel,
    bulkAddRoute

  } = props;

  const [routeDetails, setRouteDetails] = useState({});
  const [routeName, setRouteName] = useState("");
  const [stopsList, setStopsList] = useState([]);
  const [selectedStops, setSelectedStops] = useState(
    getSelectedStopsForSelect([])
  );
  const statusOptions = getStatusOptions();
  const [selectedStatus, setSelectedStatus] = useState([]);
  const directionOptions = getDirectionOptions();
  const [selectedDirection, setSelectedDirection] = useState([]);
  const [csvFileName, setCSVFileName] = useState("");

  const isFormValid = () => {
    return (
      routeName &&
      selectedStatus.length &&
      selectedDirection.length &&
      selectedStops.length
    );
  };

  const saveHandler = () => {
    if (!isFormValid()) {
    } else {
      const addedRouteDetails = {
        name: routeName,
        direction: selectedDirection[0].name,
        routeId: isEditMode ? routeDetails.routeId : getRouteId(renderedRoutes),
        status: selectedStatus[0].name,
        stopsList: stopsList,
      };
      handleCreate(addedRouteDetails);
    }
  };
  const directionChangeHandler = (value) => {
    setSelectedDirection(value);
  };
  const statusChangeHandler = (value) => {
    setSelectedStatus(value);
  };
  const routeNameInput = (e) => {
    setRouteName(e?.target?.value?.toUpperCase() || "");
  };
  const handleStopUpdate = (selectedList) => {
    const selectedStopsIds = selectedList.map((stop) => stop.id);
    setStopsList(selectedStopsIds);
    setSelectedStops(selectedList);
  };
  const handleMediaUpload = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = (e) => {
      setCSVFileName(file.name);
      importCSV(e?.target?.result)
    };
    if (file) {
      reader.readAsText(file);
    }
  };
  const importCSV = (csvfile) => {
    Papa.parse(csvfile, {
      complete: updateData,
      header: true
    });
  };
  const updateData = (input) => {
    let parsedData = input.data;
    const availableRoutes = renderedRoutes.length;
    parsedData = parsedData.map((route, index) => {
      return {
        ...route, routeId: getRouteId(renderedRoutes,availableRoutes,index), stopsList: route.stopsList.split(',')
      }
    })
    bulkAddRoute(parsedData);
  }

  useEffect(() => {
    setRouteDetails(isEditMode ? selectedRouteDetails : {});
    setRouteName(isEditMode ? selectedRouteDetails.name : routeName);
    setSelectedStatus(
      isEditMode
        ? [
            {
              name: selectedRouteDetails.status,
              id: selectedRouteDetails.status,
            },
          ]
        : []
    );
    setSelectedDirection(
      isEditMode
        ? [
            {
              name: selectedRouteDetails.direction,
              id: selectedRouteDetails.direction,
            },
          ]
        : []
    );
    const allSelectedStops = getSelectedStopsForSelect(
      isEditMode ? selectedRouteDetails.stopsList : []
    );
    setSelectedStops(allSelectedStops);
    const selectedStopsIds = allSelectedStops.map((stop) => stop.stopId);
    setStopsList(selectedStopsIds);
  }, [selectedRouteDetails, isEditMode, routeName]);
  const StopsOptions = Stops.map((stop) => {
    return { name: stop.stopName, id: stop.stopId };
  });

  return (
    <div>
      <div className="add-route-title">
        {" "}
        {isEditMode ? `Edit Route Details` : `Add Route`}
        <img
          className="close-route"
          src="close.png"
          alt="close"
          onClick={() => handleCancel()}
        />
      </div>

      <form className="route-form">
        <div className="form-field-container">
          <label className="form-label">{"Name"}</label>
          <input
            className={`form-input`}
            value={routeName}
            type="text"
            onChange={(e) => routeNameInput(e)}
          />
        </div>
        <div className="form-field-container">
          <label className="form-label">{"Direction"}</label>
          <div className="form-input-multi-select">
            <Multiselect
              options={directionOptions}
              selectedValues={selectedDirection}
              onSelect={(list) => directionChangeHandler(list)}
              displayValue="name"
              singleSelect={true}
            />
          </div>
        </div>
        <div className="form-field-container">
          <label className="form-label">{"Status"}</label>
          <div className="form-input-multi-select">
            <Multiselect
              options={statusOptions}
              selectedValues={selectedStatus}
              onSelect={(list) => statusChangeHandler(list)}
              displayValue="name"
              singleSelect={true}
            />
          </div>
        </div>
        <div className="form-field-container">
          <label className="form-label">{"Stops"}</label>
          <div className="form-input-multi-select">
            <Multiselect
              options={StopsOptions}
              selectedValues={selectedStops}
              onSelect={(list) => handleStopUpdate(list)}
              onRemove={(list) => handleStopUpdate(list)}
              displayValue="name"
            />
          </div>
        </div>
        <div className="form-footer">
          <div className="buttons">
            <div
              className="add-route-button-cancel"
              onClick={() => handleCancel()}
            >
              <Button label={`Cancel`} className={"secondary-button"} />
            </div>
            <div
              className="add-route-button-save"
              onClick={() => saveHandler()}
            >
              <Button label={`Save`} className={"primary-button"} />
            </div>
          </div>
          {!isEditMode ? (!csvFileName ? (
            <div className={"attachment-container"}>
              <span onClick={() => document.getElementById(id)?.click()}>
                <div className="upload-label">Upload CSV | Bulk Routes</div>
              </span>
              <input
                style={{ display: "none" }}
                type="file"
                id={id}
                onChange={(e) => handleMediaUpload(e)}
                accept={".csv"}
              />
            </div>
          ) : (
            <span className={"attachment-file-label"}>{csvFileName}</span>
          )): null}
        </div>
      </form>
    </div>
  );
};

export default ManageRoute;
