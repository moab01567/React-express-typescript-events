import { MongoClient, ObjectId } from "mongodb";
import {
  ApiAttendingUpdate,
  ApiCreateEvent,
  ApiCreateUser,
  ApiEvents,
  ApiGetAnonymousEvents,
  ApiMassageResponse,
} from "../shared/ApiStructure";

export async function addNewUser(
  uri: string,
  db: string,
  user: ApiCreateUser,
): Promise<ApiMassageResponse> {
  try {
    const client = new MongoClient(uri);
    const userInDatabase = await client
      .db(db)
      .collection("user")
      .findOne({ mailId: user.mailId });

    if (userInDatabase === null) {
      await client.db(db).collection("user").insertOne(user);
    } else {
      await client
        .db(db)
        .collection<ApiCreateUser>("user")
        .updateOne(
          { mailId: user.mailId },
          {
            $set: {
              name: user.name,
              admin: user.admin,
              picture: user.picture,
              loginType: user.loginType,
            },
          },
        );
    }

    return { ok: true, status: 200, massage: "All good" };
  } catch (error) {
    return { ok: false, status: 500, massage: "something wrong with database" };
  }
}

export async function getUserFromDatabase(
  uri: string,
  db: string,
  email: string,
) {
  const client = new MongoClient(uri);

  return await client.db(db).collection("user").findOne({ mailId: email });
}

export async function getAllEvents(
  uri: string,
  db: string,
): Promise<ApiMassageResponse> {
  try {
    const client = new MongoClient(uri);
    return {
      ok: true,
      status: 200,
      massage: "all good",
      data: await client.db(db).collection("event").find({}).toArray(),
    };
  } catch (error) {
    return { ok: false, status: 500, massage: "can not connect to database" };
  }
}
export async function getAnonymousEvents(
  uri: string,
  db: string,
): Promise<ApiMassageResponse> {
  try {
    const client = new MongoClient(uri);
    const events = await client.db(db).collection("event").find({}).toArray();
    const anonymousEvent: ApiGetAnonymousEvents[] = events.map((event) => ({
      _id: event._id.toString(),
      title: event.title,
    }));
    return {
      ok: true,
      status: 200,
      massage: "can not connect to database",
      data: anonymousEvent,
    };
  } catch (error) {
    return { ok: false, status: 500, massage: "can not connect to database" };
  }
}

export async function getAllEventsByOrganizer(
  uri: string,
  db: string,
  mailId: string,
) {
  try {
    const client = new MongoClient(uri);
    const events = await client
      .db(db)
      .collection("event")
      .find({ "organizer.mailId": mailId })
      .toArray();
    return {
      ok: true,
      status: 200,
      massage: "all good :)",
      data: events,
    };
  } catch (error) {
    return { ok: false, status: 500, massage: "can not connect to database" };
  }
}

export async function getAllEventsByAttendant(
  uri: string,
  db: string,
  mailId: string,
) {
  try {
    const client = new MongoClient(uri);
    const events = await client
      .db(db)
      .collection("event")
      .find({ attendance: { $elemMatch: { mailId: mailId } } })
      .toArray();
    return {
      ok: true,
      status: 200,
      massage: "all good :)",
      data: events,
    };
  } catch (error) {
    return { ok: false, status: 500, massage: "can not connect to database" };
  }
}

export async function insetNewEvent(
  uri: string,
  db: string,
  newEvent: ApiCreateEvent,
) {
  try {
    const client = new MongoClient(uri);
    const result = await client
      .db(db)
      .collection<ApiCreateEvent>("event")
      .findOne({ title: newEvent.title });
    if (result !== null) {
      return {
        ok: false,
        status: 400,
        massage: "This tittle is already taken",
      };
    }

    await client.db(db).collection("event").insertOne(newEvent);
    return {
      ok: true,
      status: 201,
      massage: "Created",
    };
  } catch (error) {
    return { ok: false, status: 500, massage: "can not connect to database" };
  }
}

export async function updateEvent(
  uri: string,
  db: string,
  eventId: string,
  updateEvent: ApiEvents,
) {
  try {
    const client = new MongoClient(uri);
    const result = await client
      .db(db)
      .collection<ApiCreateEvent>("event")
      .findOne({ title: updateEvent.title });
    if (result !== null) {
      return {
        ok: false,
        status: 400,
        massage: "This tittle is already taken",
      };
    }
    await client
      .db(db)
      .collection<ApiCreateEvent>("event")
      .updateOne(
        { _id: new ObjectId(eventId) },
        {
          $set: {
            title: updateEvent.title,
            location: updateEvent.location,
            dateTime: updateEvent.dateTime,
            description: updateEvent.description,
            category: updateEvent.category,
          },
        },
      );
    return {
      ok: true,
      status: 201,
      massage: "Updated",
    };
  } catch (error) {
    return { ok: false, status: 500, massage: "can not connect to database" };
  }
}
export async function deleteEvent(uri: string, db: string, id: string) {
  try {
    const client = new MongoClient(uri);
    await client
      .db(db)
      .collection<ApiCreateEvent>("event")
      .deleteOne({ _id: new ObjectId(id) });
    return {
      ok: true,
      status: 204,
      massage: "Deleted",
    };
  } catch (error) {
    return { ok: false, status: 500, massage: "can not connect to database" };
  }
}

export async function addEventAttending(
  uri: string,
  db: string,
  eventId: string,
  attending: any,
): Promise<ApiMassageResponse> {
  try {
    const client = new MongoClient(uri);
    await client
      .db(db)
      .collection("event")
      .updateOne(
        { _id: new ObjectId(eventId) },
        { $push: { attendance: attending } },
      );
    return { ok: true, status: 201, massage: "attending added" };
  } catch (error) {
    return { ok: false, status: 500, massage: "can not connect to database" };
  }
}

export async function removeEventAttending(
  uri: string,
  db: string,
  eventId: string,
  attending: any,
): Promise<ApiMassageResponse> {
  try {
    const client = new MongoClient(uri);
    console.log(
      await client
        .db(db)
        .collection<ApiAttendingUpdate>("event")
        .updateOne(
          { _id: new ObjectId(eventId) },
          { $pull: { attendance: { mailId: attending.mailId } } },
        ),
    );
    return { ok: true, status: 204, massage: "attending removed" };
  } catch (error) {
    return { ok: false, status: 500, massage: "can not connect to database" };
  }
}
