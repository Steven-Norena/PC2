import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { locationService } from "../services/locationService";
import type { Location } from "../types/location";

export default function LocationDetail() {
  const { id } = useParams();
  const [location, setLocation] = useState<Location | null>(null);
  const locationId = new Number(id) as number

  useEffect(() => {
    const getLocation = async () => {
      const response = await locationService.getLocationById(locationId);
      setLocation(response);
    }
    getLocation();
  },[])
  return (
    <>
      <div>
        <h2>{location.name}</h2>
      </div>
      <div>
        <p>{location.building}</p>
      </div>
      <div>
        <p>{location.floor}</p>
      </div>
      <div>
        <p>{location.status}</p>
      </div>
      <div>
        <p>{location.description}</p>
      </div>
    </>
  )
};
