/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure
} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  /**
   * Queries
   */
  projects: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany();
  }),
  projectById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.project.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  /**
   * mutations
   */
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        desc: z.string(),
        gitrepo: z.string(),
        // userEmail: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.project.create({
        data: {
          name: input.name,
          desc: input.desc,
          gitrepo: input.gitrepo,
          user: {
            connect: {
                id: ctx.session.user.id
            }
        }
        },
      });
    }),
  updateProject: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        desc: z.string(),
        gitrepo: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.project.update({
        where: {
          id: input.id,
        },
        data: {
            name: input.name,
            desc: input.desc,
            gitrepo: input.gitrepo,
        },
      });
    }),
  deleteProject: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.project.delete({
        where: {
          id: input.id,
        },
      });
    }),
});