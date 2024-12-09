import { Hono } from "hono";
import { presidents } from "./presidents";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());

// Get Request - Ide request-et küldve vissza kapod az összes elnököt
app.get("/presidents", (c) => {
    return c.json({ presidents });
});

// Get Request - Ide request-et küldve vissza kapsz egy elnökét
app.get("/presidents/:id", (c) => {
    const id = c.req.param("id");
    const president = presidents.find((p) => p.id.toString() === id);

    if (president === undefined) {
        return c.json({ error: "Az elnök nem található" });
    }

    return c.json({ president });
});

// Delete Request - Ide request-et küldve tudsz elnökét törölni MUHAHAHA😏
app.delete("/presidents/:id", (c) => {
    const id = c.req.param("id");
    const index = presidents.findIndex((p) => p.id.toString() === id);

    if (index === -1) {
        return c.json({ error: "Az elnök nem található" });
    }

    presidents.splice(index, 1);
    return c.json({ presidents });
});

export default app;