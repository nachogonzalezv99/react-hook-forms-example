"use client";

import { objectKeys } from "@/app/utils/form";
import { useEffect, useState } from "react";

export type StatusName =
  | "Ejecutable"
  | "Validado"
  | "Consolidado"
  | "Rechazado"
  | "Ejecutado";
export type Coordinate = { lat: number; lng: number };
export type UnitTypes = "Panel" | "Sink" | "Structure";
export type ProfileType = "WEB" | "APP" | "ALL";

export interface Polygon {
  project_id: string;
  coordinates: Coordinate[];
  comments: string;
  namestructure: UnitTypes;
  status_color: string;
  name: string;
  user: string;
  reference: string;
  status_id: string;
  status_name: StatusName;
  date?: string;
  id: string;
  subfield_id: string;
  profile_type: ProfileType;
  original_status_id: string;
}

export type PolygonCache = Record<
  string,
  Record<string, Record<string, Polygon>>
>;

function resolveCacheData(
  newPolygon: Polygon,
  projectId: string,
  subfieldId: string,
  cache?: PolygonCache
): Polygon {
  const cachedPolygon = cache
    ? cache[projectId][subfieldId][newPolygon.id]
    : undefined;

  if (!cachedPolygon) return newPolygon;

  if (cachedPolygon.status_id === newPolygon.status_id) return newPolygon;

  if (newPolygon.status_name === "Validado")
    return {
      ...newPolygon,
      comments: cachedPolygon.comments,
      status_name: cachedPolygon.status_name,
      status_id: cachedPolygon.status_id,
      original_status_id: newPolygon.status_id,
      status_color: cachedPolygon.status_color,
    };

  return newPolygon;
}

const statuses: Record<
  StatusName,
  {
    status_id: string;
    status_name: StatusName;
    status_color: string;
    original_status_id: string;
  }
> = {
  Validado: {
    status_id: "1",
    status_color: "green",
    status_name: "Validado",
    original_status_id: "1",
  },
  Consolidado: {
    status_id: "2",
    status_color: "#C8A2C8",
    status_name: "Consolidado",
    original_status_id: "2",
  },
  Ejecutable: {
    status_id: "3",
    status_color: "gray",
    status_name: "Ejecutable",
    original_status_id: "3",
  },
  Ejecutado: {
    status_id: "4",
    status_color: "blue",
    status_name: "Ejecutado",
    original_status_id: "4",
  },
  Rechazado: {
    status_id: "5",
    status_color: "red",
    status_name: "Rechazado",
    original_status_id: "5",
  },
};

export function Test() {
  const userId = "1";
  const projectId = "1";
  const subfieldId = "1";
  const LOCAL_STORAGE_KEY = `PV_OPERATIONAL_${userId}`;

  const [cache, setCache] = useState(() => {
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedValue ? (JSON.parse(storedValue) as PolygonCache) : undefined;
  });

  const backendList: Polygon[] = [
    {
      project_id: "1",
      comments: "",
      namestructure: "Sink",
      name: "kml1",
      user: "David",
      date: "24/07/2024",
      coordinates: [],
      profile_type: "ALL",
      reference: "aa",
      subfield_id: "1",
      id: "1",
      ...statuses["Rechazado"],
    },
  ];

  const list: Polygon[] = backendList.map((item) =>
    resolveCacheData(item, projectId, subfieldId, cache)
  );

  function onChange() {
    const newItem: Polygon = {
      project_id: "1",
      comments: "",
      namestructure: "Sink",
      name: "kml1",
      user: "David",
      date: "22/10/2024",
      coordinates: [],
      id: "1",
      profile_type: "ALL",
      reference: "aa",
      subfield_id: "1",
      ...statuses["Rechazado"],
    };
    setCache((prevCache) => {
      const updatedCache = { ...prevCache };

      if (!updatedCache[projectId]) updatedCache[projectId] = {};

      if (!updatedCache[projectId][subfieldId]) {
        updatedCache[projectId][subfieldId] = {};
      }

      updatedCache[projectId][subfieldId][newItem.id] = newItem;

      return updatedCache;
    });
  }

  function save() {
    const changedPolygons = list.filter(
      (p) => p.original_status_id != p.status_id
    );
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    console.log(changedPolygons);
  }

  useEffect(() => {
    if (cache) localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cache));
  }, [LOCAL_STORAGE_KEY, cache]);

//   useEffect(() => {
//     if (cache)
//       setCache((prevCache) => {
//         const updatedCache = { ...prevCache };

//         if (!updatedCache[projectId]) updatedCache[projectId] = {};

//         if (!updatedCache[projectId][subfieldId]) {
//           updatedCache[projectId][subfieldId] = {};
//         }

//         const items = Object.entries(updatedCache[projectId][subfieldId]).filter(([
//           key,
//           value,
//         ]) => );


//         return updatedCache;
//       });
//   }, []);

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {list.map((item) => (
          <div key={item.id} style={{ display: "flex", gap: "10px" }}>
            <span>{item.name}</span>
            <span>{item.user}</span>
            <span>{item.date}</span>
            <span style={{ color: item.status_color }}>{item.status_name}</span>
          </div>
        ))}
      </div>
      <button onClick={() => onChange()}>Change</button>
      <button onClick={() => save()}>Save</button>
    </div>
  );
}
