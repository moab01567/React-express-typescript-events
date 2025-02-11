import { eventRoutes } from "../eventRoutes";
import request from "supertest";
import { describe, test, beforeEach, expect, expectTypeOf } from "vitest";
import dotenv from "dotenv";
import express from "express";
import { MongoClient } from "mongodb";
import { userRoutes } from "../userRoutes";
import { addNewUser, getUserFromDatabase } from "../dbService";
import {
  ApiEvents,
  ApiGetAnonymousEvents,
  ApiMassageResponse,
} from "../../shared/ApiStructure";
dotenv.config();
const app = express();
app.use(express.json());
const uri = process.env.DB_URI || "";
const db = process.env.DB_NAME_TEST || "";
app.use(eventRoutes(uri, db));
app.use(userRoutes(uri, db));

beforeEach(async () => {
  const client = new MongoClient(uri);
  await client.db(db).collection("event").deleteMany({});
  await client.db(db).collection("user").deleteMany({});
  await addNewUser(uri, db, {
    name: "name test",
    admin: false,
    mailId: "test@test.com",
    picture: "",
    loginType: "google",
  });
  await request(app)
    .post("/api/create/event")
    .send({
      title: "Community Football Match",
      organizer: {
        name: "John Doe",
        mailId: "john.doe@example.com",
        admin: true,
      },
      category: { $numberInt: "1" },
      dateTime: "2024-11-10T14:00:00Z",
      location: "City Stadium",
      attendance: [
        {
          name: "Jane Smith",
          mailId: "jane.smith@example.com",
          admin: false,
          _id: { $oid: "672cf701d72caa1f00e124c1" },
        },
        {
          name: "Alice Johnson",
          mailId: "alice.johnson@example.com",
          admin: false,
          _id: { $oid: "672cf701d72caa1f00e124c2" },
        },
      ],
    });
});
describe("creating new user (check that before each is working)", () => {
  test("add and get user", async () => {
    const user = await getUserFromDatabase(uri, db, "test@test.com");
    expect(user).toBeDefined();
    expect(user?.name).toBe("name test");
    expect(user?.admin).toBe(false);
    expect(user?.mailId).toBe("test@test.com");
  });
});

describe("POST /api/create/event", () => {
  test("filed to create event", async () => {
    const res = await request(app)
      .post("/api/create/event")
      .send({
        title: "Community Football Match",
        organizer: {
          name: "John Doe",
          mailId: "john.doe@example.com",
          admin: false,
        },
        category: { $numberInt: "1" },
        dateTime: "2024-11-10T14:00:00Z",
        location: "City Stadium",
        attendance: [
          {
            name: "Jane Smith",
            mailId: "jane.smith@example.com",
            admin: false,
            _id: { $oid: "672cf701d72caa1f00e124c1" },
          },
          {
            name: "Alice Johnson",
            mailId: "alice.johnson@example.com",
            admin: false,
            _id: { $oid: "672cf701d72caa1f00e124c2" },
          },
        ],
      });
    expect(res.status).toBe(403);
  });
});

describe("GET /api/events", () => {
  test("200 ok", async () => {
    const res = await request(app).get("/api/events");
    const resBody: ApiEvents[] = await res.body;
    expect(res.ok).toBeTruthy();
    expect(resBody.length).toBe(1);
    expect(resBody[0].organizer.name).toBe("John Doe");
  });
});
describe("GET /api/anonymous/events", () => {
  test("200 ok", async () => {
    const res = await request(app).get("/api/anonymous/events");
    const resBody: ApiGetAnonymousEvents[] = await res.body;
    expect(res.ok).toBeTruthy();
    expect(resBody.length).toBe(1);
    expect(resBody[0].title).toBe("Community Football Match");
    expectTypeOf(resBody).toEqualTypeOf<ApiGetAnonymousEvents[]>();
  });
});

describe("GET /api/event/organized/:mailId", () => {
  test("get event where organizer email is provided", async () => {
    const res = await request(app).get(
      "/api/event/organized/john.doe@example.com",
    );
    expect(res.status).toBe(200);
    const resBody: ApiEvents[] = res.body;
    expect(resBody.length).toBe(1);
    expect(resBody[0].organizer.admin).toBe(true);
    expect(resBody[0].organizer.name).toBe("John Doe");
  });
});

describe("GET /api/event/attending/:mailId", () => {
  test("get event where attending email is provided ", async () => {
    const res = await request(app).get(
      "/api/event/attending/alice.johnson@example.com",
    );
    expect(res.status).toBe(200);
    const resBody: ApiEvents[] = res.body;
    expect(resBody.length).toBe(1);
    expect(resBody[0].organizer.admin).toBe(true);
    expect(resBody[0].organizer.name).toBe("John Doe");
  });
});

describe("POST /api/event/attending/add", () => {
  test("200 ok", async () => {
    const res = await request(app).post("/api/event/attending/add").send({
      name: "name test",
      admin: false,
      mailId: "test@test.com",
      picture: "",
      loginType: "google",
    });
    const resBody: ApiMassageResponse = res.body;
    expect(resBody.ok).toBeTruthy;
    expect(resBody.massage).toBe("attending added");
  });
});

describe("POST /api/event/attending/remove", () => {
  test("500 status, can not connect to database ", async () => {
    const res = await request(app).post("/api/event/attending/remove").send({
      name: "Alice Johnson",
      mailId: "alice.johnson@example.com",
      admin: false,
    });
    const resBody: ApiMassageResponse = res.body;
    expect(resBody.ok).toBeFalsy();
    expect(resBody.massage).toBe("can not connect to database");
  });
});
