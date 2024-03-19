import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/stripe",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const signature = req.headers.get("stripe-signature")!;
    console.log({ signature });
    const result = await ctx.runAction(internal.stripe.fulfill, {
      signature,
      payload: await req.text(),
    });
    if (result.success) {
      return new Response(null, {
        status: 200,
      });
    } else {
      return new Response("Webhook Error", {
        status: 400,
      });
    }
  }),
});

export default http;
