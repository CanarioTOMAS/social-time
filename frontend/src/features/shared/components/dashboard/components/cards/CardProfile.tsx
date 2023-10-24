import React, { useEffect, useState } from "react";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import "../../style/CardProfile.css";
import { businessQueryService } from "@/features/business/services/businessQuery";
import { getSessionServices } from "@/auth/services/session.service";
import { useQuery } from "@apollo/client";
import getUserById from "@/features/shared/services/userServices/useQuery";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

moment.locale("es"); 

export default function CardProfile() {
  console.log();
  const { data, error, loading } = useQuery(
    businessQueryService.FindUserBusiness,
    {
      variables: {
        id: "651727a345c77d9e21342a12",
      },
    }
  );
  console.log(data);
  const clients = data?.findUserBusiness[0]?.client;

  let contadorClients = 0;

  if (Array.isArray(clients)) {
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].status === "0") contadorClients++;
    }
  }
  console.log(error);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (data) {
      const calendarId = {id: data.findUserBusiness?.[0]?.googleCalendarId}; 
      const apiKey = ""; 
      const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const googleEvents = data.items.map(
            (item: {
              summary: any;
              start: { dateTime: string | number | Date };
              end: { dateTime: string | number | Date };
            }) => ({
              title: item.summary,
              start: new Date(item.start.dateTime),
              end: new Date(item.end.dateTime),
            })
          );
          setEvents(googleEvents);
        })
        .catch((error) => {
          console.error("Error al cargar eventos:", error);
        });
    }
  }, [data]);
  const localizer = momentLocalizer(moment);

  return (
    <>
      <Box width={400} style={{marginLeft:"60px"}}>
        <Paper
          elevation={1}
          className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16"
        >
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center mt-[-50px]">
                <div className="relative">
                  <Avatar
                    alt="Profile Image"
                    src={data?.findUserBusiness[0]?.image}
                    sx={{ width: 100, height: 100 }}
                  ></Avatar>
                </div>
              </div>
              <div className="w-full px-4 text-center">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      22
                    </span>
                    <span className="text-sm text-blueGray-400">Project</span>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      10
                    </span>
                    <span className="text-sm text-blueGray-400">Client</span>
                  </div>
                  <div className="lg:mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {contadorClients}
                    </span>
                    <span className="text-sm text-blueGray-400">Hours</span>
                  </div>
                </div>{" "}
                <div style={{ height: "450px" }}>
                  <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ flex: 1 }}
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <Typography
                variant="h6"
                className=" text-blueGray-700 pb-4"
              ></Typography>
            </div>
          </div>
        </Paper>
      </Box>
    </>
  );
}
