
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/project";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const project = await Project.create({
      title: body.title,
      description: body.description,
      image: body.image,
      github: body.github,
      live: body.live,
      technologies: body.technologies,
    });

    return Response.json(
      {
        success: true,
        data: project,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST ERROR:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to create project",
      },
      {
        status: 500,
      }
    );
  }
}