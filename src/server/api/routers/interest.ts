import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure
} from "~/server/api/trpc";

export const interestRouter = createTRPCRouter({
  /**
   * Queries
   */
  interests: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.interest.findMany();
  }),
  interestById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.interest.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  /**
   * mutations
   */
  createInterest: protectedProcedure
    .input(
      z.object({
        topic: z.string(),
        desc: z.string(),
        proficiency: z.string(),
        // userEmail: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.interest.create({
        data: {
          topic: input.topic,
          desc: input.desc,
          proficiency: input.proficiency,
          user: {
            connect: {
                id: ctx.session.user.id
            }
        }
        },
      });
    }),
  updateInterest: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        topic: z.string(),
        desc: z.string(),
        proficiency: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.interest.update({
        where: {
          id: input.id,
        },
        data: {
            topic: input.topic,
            desc: input.desc,
            proficiency: input.proficiency,
        },
      });
    }),
  deleteInterest: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.interest.delete({
        where: {
          id: input.id,
        },
      });
    }),
});