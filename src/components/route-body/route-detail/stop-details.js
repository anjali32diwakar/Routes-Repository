import { getStopDetails } from "../utils";
const StopDetails = (props) => {
  const stopsInfo = getStopDetails(props.stops);
  return (
    <div>
      {stopsInfo.map((stop, index) => {
        return (
          <span key={stop.stopId}>
            <span>{stop.stopName}</span>
            {index !== stopsInfo.length - 1 && <span>{` -> `}</span>}
          </span>
        );
      })}
    </div>
  );
};
export default StopDetails;
