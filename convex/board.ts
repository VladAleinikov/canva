import { v } from 'convex/values'
import { mutation } from './_generated/server'

export const create = mutation({
      args: {
            orgId: v.string(),
            title: v.string(),
      },
      handler: async (ctx, args) => {
            const identity = await ctx.auth.getUserIdentity();

            if (!identity) {
                  throw new Error("Не авторизован")
            }

            const randomImage = `/placeholders/${(Math.floor(Math.random() * 10) + 1)}.svg`;

            const board = await ctx.db.insert("boards", {
                  title: args.title,
                  orgId: args.orgId,
                  authorId: identity.subject,
                  authorName: identity.name!,
                  imageUrl: randomImage
            })

            return board;
      }
})

export const remove = mutation({
      args: {
            id: v.id("boards")
      },
      handler: async (ctx, args) => {
            const identity = await ctx.auth.getUserIdentity();

            if (!identity) {
                  throw new Error("Не авторизован")
            }

            await ctx.db.delete(args.id);
      }
})

export const update = mutation({
      args: {
            id: v.id("boards"),
            title: v.string()
      },
      handler: async (ctx, args) => {
            const identity = await ctx.auth.getUserIdentity();

            if (!identity) {
                  throw new Error("Не авторизован")
            }

            const title = args.title.trim();

            if (!title) {
                  throw new Error("Заголовок не может быть пустым")
            }
            if (title.length > 60) {
                  throw new Error("Заголовок должен быть больше 60 символов")
            }

            const board = await ctx.db.patch(args.id, {
                  title: args.title
            })

            return board;
      }
})

export const favorite = mutation({
      args: {
            id: v.id("boards"),
            orgId: v.string()
      },
      handler: async (ctx, args) => {
            const identity = await ctx.auth.getUserIdentity();

            if (!identity) {
                  throw new Error("Не авторизован")
            }
            const board = await ctx.db.get(args.id);
            if (!board) {
                  throw new Error("Доска не найдена");
            }
            const userId = identity.subject;
            const existingFavorite = await ctx.db
                  .query("userFavorites")
                  .withIndex("by_user_board_org", (q) =>
                        q
                              .eq("userId", userId)
                              .eq("boardId", board._id)
                              .eq("orgId", args.orgId)
                  )
                  .unique();

            if (existingFavorite) {
                  throw new Error("Доска уже в любимых")
            }
            await ctx.db.insert("userFavorites", {
                  orgId: args.orgId,
                  userId: userId,
                  boardId: board._id,
            })

            return board;
      }
})

export const unfavorite = mutation({
      args: {
            id: v.id("boards"),
      },
      handler: async (ctx, args) => {
            const identity = await ctx.auth.getUserIdentity();

            if (!identity) {
                  throw new Error("Не авторизован")
            }
            const board = await ctx.db.get(args.id);
            if (!board) {
                  throw new Error("Доска не найдена");
            }
            const userId = identity.subject;
            const existingFavorite = await ctx.db
                  .query("userFavorites")
                  .withIndex("by_user_board", (q) =>
                        q
                              .eq("userId", userId)
                              .eq("boardId", board._id)
                  )
                  .unique();

            if (!existingFavorite) {
                  throw new Error("Доска не найдена")
            }
            await ctx.db.delete(existingFavorite._id)

            return board;
      }
})