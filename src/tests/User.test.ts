import request from "supertest";
import { app } from "../../web";

test("Validation for user create", async () => {
    const mockUser = {
        email: "luka1@gmail.com",
        password: "luka2508",
        firstName: "Luka",
        lastName: "Sarcevic"
    }

    const response = await request(app).post("/register").send(mockUser);
    console.log(response.body);

    expect(response.status).toBe(201);
    //expect(response.body).
});