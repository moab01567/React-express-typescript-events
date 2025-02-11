import express, { Request, Response, Router } from "express";
import {
  ApiCreateEvent,
  ApiEvents,
  ApiMassageResponse,
} from "../shared/ApiStructure";
import {
  getAllEvents,
  getAllEventsByAttendant,
  getAllEventsByOrganizer,
  getAnonymousEvents,
  insetNewEvent,
  addEventAttending,
  removeEventAttending,
  deleteEvent,
  updateEvent,
} from "./dbService";

export function eventRoutes(uri: string, db: string) {
  const eventApi: Router = express.Router();

  //this one will just send u all the events
  eventApi.get("/api/events", async (req: Request, res: Response) => {
    const massage: ApiMassageResponse = await getAllEvents(uri, db);
    if (massage.ok) {
      res.status(massage.status);
      res.send(massage.data);
    } else {
      res.status(massage.status);
      res.send(massage);
    }
  });

  eventApi.get("/api/anonymous/events", async (req: Request, res: Response) => {
    const massage: ApiMassageResponse = await getAnonymousEvents(uri, db);
    if (massage.ok) {
      res.status(massage.status);
      res.send(massage.data);
    } else {
      res.status(massage.status);
      res.send(massage);
    }
  });

  //by using this endpoint and setting mailId in path.
  // you get all the events the mailId is organizing
  eventApi.get(
    "/api/event/organized/:mailId",
    async (req: Request, res: Response) => {
      const mailId: string = req.params.mailId;
      const massage: ApiMassageResponse = await getAllEventsByOrganizer(
        uri,
        db,
        mailId,
      );
      if (massage.ok) {
        res.status(massage.status);
        res.send(massage.data);
      } else {
        res.status(massage.status);
        res.send(massage);
      }
    },
  );

  //by using this endpoint and setting mailId in path.
  // you get all the events the mailId is attending
  eventApi.get(
    "/api/event/attending/:mailId",
    async (req: Request, res: Response) => {
      const mailId: string = req.params.mailId;
      const massage: ApiMassageResponse = await getAllEventsByAttendant(
        uri,
        db,
        mailId,
      );

      if (massage.ok) {
        res.status(massage.status);
        res.send(massage.data);
      } else {
        res.status(massage.status);
        res.send(massage);
      }
    },
  );

  eventApi.post(
    "/api/event/attending/add",
    async (req: Request, res: Response) => {
      const attendingUpdate = await req.body;
      const massage: ApiMassageResponse = await addEventAttending(
        uri,
        db,
        attendingUpdate._id,
        attendingUpdate.attending,
      );
      if (massage.ok) {
        res.status(massage.status);
        res.send(massage);
      } else {
        res.status(massage.status);
        res.send(massage);
      }
    },
  );

  eventApi.post(
    "/api/event/attending/remove",
    async (req: Request, res: Response) => {
      const attendingUpdate = await req.body;
      console.log(attendingUpdate);
      const massage: ApiMassageResponse = await removeEventAttending(
        uri,
        db,
        attendingUpdate._id,
        attendingUpdate.attending,
      );
      if (massage.ok) {
        res.status(massage.status);
        res.send(massage);
      } else {
        res.status(massage.status);
        res.send(massage);
      }
    },
  );

  //this is not tested it yet, but it should make a new event
  eventApi.post("/api/create/event", async (req: Request, res: Response) => {
    const newEvent: ApiCreateEvent = await req.body;

    if (!newEvent.organizer.admin) {
      const massage: ApiMassageResponse = {
        ok: false,
        status: 403,
        massage: "Not allowed to create event, Login with Entra Id",
      };
      res.status(massage.status);
      res.send(massage);
      return;
    }

    const massage: ApiMassageResponse = await insetNewEvent(uri, db, newEvent);
    res.status(massage.status);
    res.send(massage);
  });

  eventApi.put("/api/update/event/:id", async (req, res) => {
    const eventId: string = req.params.id;
    const event: ApiEvents = req.body;
    console.log(event);
    const massage: ApiMassageResponse = await updateEvent(
      uri,
      db,
      eventId,
      event,
    );
    res.status(massage.status).send(massage);
  });

  eventApi.put("/api/delete/event/:id", async (req, res) => {
    const eventId = req.params.id;
    const massage: ApiMassageResponse = await deleteEvent(uri, db, eventId);
    res.status(massage.status).send(massage);
  });

  return eventApi;
}
