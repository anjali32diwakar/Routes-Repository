export const getRouteDetails = () => {
    return [
      {
        name: "AGR-JPR",
        direction: "UP",
        routeId: "101",
        status: "Active",
        stopsList: ["101", "104"],
      },
      {
        name: "BLR-CHN",
        direction: "DOWN",
        routeId: "102",
        status: "Inactive",
        stopsList: ["109", "110"],
      },
      {
        name: "INDR-BLR",
        direction: "DOWN",
        routeId: "103",
        status: "Inactive",
        stopsList: ["106", "107", "109"],
      },
      {
        name: "AGR-BLR",
        direction: "UP",
        routeId: "104",
        status: "Inactive",
        stopsList: ["101", "103", "106", "109"],
      },
      {
        name: "MUM-PUNE",
        direction: "DOWN",
        routeId: "105",
        status: "Active",
        stopsList: ["108", "107"],
      },
    ];
  };
  export const Stops = [
    {
      stopId: "101",
      stopName: "Agra",
      latitude: "27.1767",
      longitude: "78.0081",
    },
    {
      stopId: "102",
      stopName: "Delhi",
      latitude: "28.7041",
      longitude: "77.1025",
    },
    {
      stopId: "103",
      stopName: "Dehradun",
      latitude: "30.3165",
      longitude: "78.0322",
    },
    {
      stopId: "104",
      stopName: "Jaipur",
      latitude: "26.9124",
      longitude: "75.7873",
    },
    {
      stopId: "105",
      stopName: "Lucknow",
      latitude: "26.8467",
      longitude: "80.9462",
    },
    {
      stopId: "106",
      stopName: "Indore",
      latitude: "22.7196",
      longitude: "75.8577",
    },
    {
      stopId: "107",
      stopName: "Pune",
      latitude: "18.5204",
      longitude: "73.8567",
    },
    {
      stopId: "108",
      stopName: "Mumbai",
      latitude: "19.0760",
      longitude: "72.8777",
    },
    {
      stopId: "109",
      stopName: "Banglore",
      latitude: "12.9716",
      longitude: "77.5946",
    },
    {
      stopId: "110",
      stopName: "Chennai",
      latitude: "13.0827",
      longitude: "80.2707",
    },
  ];
  export const Direction = [
    { label: "UP", value: "UP" },
    { label: "DOWN", value: "DOWN" },
  ];
  export const Status = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ];
  
  export const getStopDetails = (stops) => {
    const allStopDeatils = Stops;
    return stops.map((stopId) => {
      return allStopDeatils.find((stop) => stop.stopId === stopId);
    });
  };
  export const getSelectedStopsForSelect = (stops) => {
    const allStopDeatils = Stops;
    return stops.map((stopId) => {
      const stop = allStopDeatils.find((stop) => stop.stopId === stopId);
      return { ...stop, name: stop.stopName, id: stop.stopId };
    });
  };
  export const getStatusOptions = () => {
    return Status.map((status) => {
      return { name: status.label, id: status.value };
    });
  };
  export const getDirectionOptions = () => {
    return Direction.map((dir) => {
      return { name: dir.label, id: dir.value };
    });
  };
  export const setRouteIds = (routes) => {
    return routes.map((route, index) => {
      return { ...route, routeId: 100 + index + 1 };
    });
  };
  export const getRouteId = (routes,availableRoutes, index) => {
    return index  ? String(100 + availableRoutes + 1 + index) : String(100 + routes.length + 1);
  };
  