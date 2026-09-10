export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Only this API route reaches the Worker. Static files are served by
    // Workers Static Assets.
    if (url.pathname === "/api/submit" && request.method === "POST") {
      try {
        const body = await request.json();
        const value =
          typeof body.value === "string"
            ? body.value.trim()
            : "";

        // This endpoint is for non-sensitive text only.
        // Do not send passwords, authentication tokens, or other secrets.
        if (!value || value.length > 500) {
          return Response.json(
            { error: "Invalid value" },
            { status: 400 }
          );
        }

        await env.DB
          .prepare(
            `INSERT INTO submissions (value, created_at)
             VALUES (?, datetime('now'))`
          )
          .bind(value)
          .run();

        return Response.json({ ok: true });
      } catch (error) {
        console.error(error);

        return Response.json(
          { error: "Unable to save submission" },
          { status: 500 }
        );
      }
    }

    return new Response("Not found", { status: 404 });
  }
};
