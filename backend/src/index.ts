import Fastify from "fastify";
import cors from "@fastify/cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

(async () => {
  const fastify = Fastify({});
  fastify.register(cors, {
    origin: "*" // Allow all origins for simplicity, adjust as needed
  });

  const db = await open({
    filename: './db/winedrops.db',
    driver: sqlite3.Database
  });

  fastify.get("/wines", async (request, reply) => {
    const { metric } = request.query as { metric: string };
    const metricColumn = metric === 'revenue' ? 'total_amount' : metric === 'orders' ? 'quantity' : 'quantity';
    const wines = await db.all(`
      SELECT mw.name, mw.vintage, SUM(co.${metricColumn}) as total
      FROM customer_order co
      JOIN wine_product wp ON co.wine_product_id = wp.id
      JOIN master_wine mw ON wp.master_wine_id = mw.id
      WHERE co.status IN ('paid', 'dispatched')
      GROUP BY mw.name, mw.vintage
      ORDER BY total DESC
    `);
    console.log(wines); // Add this line to log the wines
    return wines;
  });

  fastify.get("/search", async (request, reply) => {
    const { query, metric } = request.query as { query: string, metric: string };
    const metricColumn = metric === 'revenue' ? 'total_amount' : metric === 'orders' ? 'quantity' : 'quantity';
    const wines = await db.all(`
      SELECT mw.name, mw.vintage, SUM(co.${metricColumn}) as total
      FROM customer_order co
      JOIN wine_product wp ON co.wine_product_id = wp.id
      JOIN master_wine mw ON wp.master_wine_id = mw.id
      WHERE (mw.name LIKE ? OR mw.vintage LIKE ?) AND co.status IN ('paid', 'dispatched')
      GROUP BY mw.name, mw.vintage
      ORDER BY total DESC
    `, [`%${query}%`, `%${query}%`]);
    console.log(wines); // Add this line to log the wines
    return wines;
  });

  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
  }
})();