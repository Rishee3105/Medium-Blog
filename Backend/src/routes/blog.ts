import { createBlogInput, updateBlogInput } from "@rishee_30/common-app";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  }
}>();



blogRouter.use("/*", async (c, next) => {
  const token = c.req.header("Authorization");

  if (!token) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }

  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
      throw new Error("Invalid token");
    }

    //@ts-ignore
    c.set("userId", payload.id); 
    await next();
  } catch (error) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
});



blogRouter.get('/bulk', async (c) => {
  try {
      const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      
      const posts = await prisma.post.findMany({
        select:{
          content:true,
          title:true,
          id:true,
          author:{
            select:{
              name:true
            }
          }
        }
      });
      return c.json({posts});
  } catch (error) {
      return c.json({ error: 'Failed to fetch posts' });
  } 
});



blogRouter.get("/:id", async (c) => {
  const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findUnique({
		where: {
			id: Number(id)
		},
    select:{
      id:true,
      title:true,
      content:true,
      author:{
        select:{
          name:true
        }
      }
    }
	});

	return c.json(post);
});



blogRouter.post("/", async (c) => {
  const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(userId),
    },
  });
  return c.json({
    id: post.id,
  });
});



blogRouter.put("/update", async (c) => {
  const userId = c.get("userId");
  if (!userId) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input" });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: body.id,
        authorId: Number(userId),
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({
      id: updatedPost.id,
    });
  } catch (error) {
    c.status(400);
    return c.json({ error: "Invalid request" });
  }
});
