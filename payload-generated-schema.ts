/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:db-schema` to regenerate this file.
 */

import {
  pgTable,
  index,
  uniqueIndex,
  foreignKey,
  integer,
  serial,
  varchar,
  numeric,
  boolean,
  timestamp,
  jsonb,
  pgEnum,
} from "@payloadcms/db-postgres/drizzle/pg-core";
import { sql, relations } from "@payloadcms/db-postgres/drizzle";
export const enum__locales = pgEnum("enum__locales", ["en", "ru"]);
export const enum_users_roles = pgEnum("enum_users_roles", [
  "admin",
  "customer",
]);

export const users_roles = pgTable(
  "users_roles",
  {
    order: integer("order").notNull(),
    parent: integer("parent_id").notNull(),
    value: enum_users_roles("value"),
    id: serial("id").primaryKey(),
  },
  (columns) => ({
    orderIdx: index("users_roles_order_idx").on(columns.order),
    parentIdx: index("users_roles_parent_idx").on(columns.parent),
    parentFk: foreignKey({
      columns: [columns["parent"]],
      foreignColumns: [users.id],
      name: "users_roles_parent_fk",
    }).onDelete("cascade"),
  }),
);

export const users_cart_items = pgTable(
  "users_cart_items",
  {
    _order: integer("_order").notNull(),
    _parentID: integer("_parent_id").notNull(),
    id: varchar("id").primaryKey(),
    product: integer("product_id").references(() => products.id, {
      onDelete: "set null",
    }),
    unitPrice: numeric("unit_price").notNull(),
    stripeProductID: varchar("stripe_product_i_d"),
    quantity: numeric("quantity").notNull(),
    url: varchar("url"),
  },
  (columns) => ({
    _orderIdx: index("users_cart_items_order_idx").on(columns._order),
    _parentIDIdx: index("users_cart_items_parent_id_idx").on(columns._parentID),
    users_cart_items_product_idx: index("users_cart_items_product_idx").on(
      columns.product,
    ),
    _parentIDFk: foreignKey({
      columns: [columns["_parentID"]],
      foreignColumns: [users.id],
      name: "users_cart_items_parent_id_fk",
    }).onDelete("cascade"),
  }),
);

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name"),
    stripeCustomerID: varchar("stripe_customer_i_d"),
    skipSync: boolean("skip_sync"),
    updatedAt: timestamp("updated_at", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    })
      .defaultNow()
      .notNull(),
    email: varchar("email").notNull(),
    resetPasswordToken: varchar("reset_password_token"),
    resetPasswordExpiration: timestamp("reset_password_expiration", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    }),
    salt: varchar("salt"),
    hash: varchar("hash"),
    loginAttempts: numeric("login_attempts").default("0"),
    lockUntil: timestamp("lock_until", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    }),
  },
  (columns) => ({
    users_updated_at_idx: index("users_updated_at_idx").on(columns.updatedAt),
    users_created_at_idx: index("users_created_at_idx").on(columns.createdAt),
    users_email_idx: uniqueIndex("users_email_idx").on(columns.email),
  }),
);

export const media = pgTable(
  "media",
  {
    id: serial("id").primaryKey(),
    alt: varchar("alt").notNull(),
    updatedAt: timestamp("updated_at", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    })
      .defaultNow()
      .notNull(),
    url: varchar("url"),
    thumbnailURL: varchar("thumbnail_u_r_l"),
    filename: varchar("filename"),
    mimeType: varchar("mime_type"),
    filesize: numeric("filesize"),
    width: numeric("width"),
    height: numeric("height"),
    focalX: numeric("focal_x"),
    focalY: numeric("focal_y"),
  },
  (columns) => ({
    media_updated_at_idx: index("media_updated_at_idx").on(columns.updatedAt),
    media_created_at_idx: index("media_created_at_idx").on(columns.createdAt),
    media_filename_idx: uniqueIndex("media_filename_idx").on(columns.filename),
  }),
);

export const blogs = pgTable(
  "blogs",
  {
    id: serial("id").primaryKey(),
    thumbnail: integer("thumbnail_id")
      .notNull()
      .references(() => media.id, {
        onDelete: "set null",
      }),
    updatedAt: timestamp("updated_at", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    })
      .defaultNow()
      .notNull(),
  },
  (columns) => ({
    blogs_thumbnail_idx: index("blogs_thumbnail_idx").on(columns.thumbnail),
    blogs_updated_at_idx: index("blogs_updated_at_idx").on(columns.updatedAt),
    blogs_created_at_idx: index("blogs_created_at_idx").on(columns.createdAt),
  }),
);

export const blogs_locales = pgTable(
  "blogs_locales",
  {
    title: varchar("title").notNull(),
    body: jsonb("body").notNull(),
    id: serial("id").primaryKey(),
    _locale: enum__locales("_locale").notNull(),
    _parentID: integer("_parent_id").notNull(),
  },
  (columns) => ({
    _localeParent: uniqueIndex("blogs_locales_locale_parent_id_unique").on(
      columns._locale,
      columns._parentID,
    ),
    _parentIdFk: foreignKey({
      columns: [columns["_parentID"]],
      foreignColumns: [blogs.id],
      name: "blogs_locales_parent_id_fk",
    }).onDelete("cascade"),
  }),
);

export const products_videos = pgTable(
  "products_videos",
  {
    _order: integer("_order").notNull(),
    _parentID: integer("_parent_id").notNull(),
    id: varchar("id").primaryKey(),
    video_url: varchar("video_url").notNull(),
  },
  (columns) => ({
    _orderIdx: index("products_videos_order_idx").on(columns._order),
    _parentIDIdx: index("products_videos_parent_id_idx").on(columns._parentID),
    _parentIDFk: foreignKey({
      columns: [columns["_parentID"]],
      foreignColumns: [products.id],
      name: "products_videos_parent_id_fk",
    }).onDelete("cascade"),
  }),
);

export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    product_thumbnail: integer("product_thumbnail_id").references(
      () => media.id,
      {
        onDelete: "set null",
      },
    ),
    publishedOn: timestamp("published_on", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    }),
    expiryDuration: numeric("expiry_duration").notNull().default("45"),
    stripeProductID: varchar("stripe_product_i_d"),
    priceJSON: varchar("price_j_s_o_n"),
    categories: integer("categories_id")
      .notNull()
      .references(() => categories.id, {
        onDelete: "set null",
      }),
    slug: varchar("slug"),
    skipSync: boolean("skip_sync"),
    updatedAt: timestamp("updated_at", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    })
      .defaultNow()
      .notNull(),
  },
  (columns) => ({
    products_product_thumbnail_idx: index("products_product_thumbnail_idx").on(
      columns.product_thumbnail,
    ),
    products_categories_idx: index("products_categories_idx").on(
      columns.categories,
    ),
    products_slug_idx: index("products_slug_idx").on(columns.slug),
    products_updated_at_idx: index("products_updated_at_idx").on(
      columns.updatedAt,
    ),
    products_created_at_idx: index("products_created_at_idx").on(
      columns.createdAt,
    ),
  }),
);

export const products_locales = pgTable(
  "products_locales",
  {
    title: varchar("title").notNull(),
    product_description: varchar("product_description").notNull(),
    product_question: varchar("product_question"),
    duration: varchar("duration").notNull(),
    intensity: varchar("intensity").notNull(),
    fitness_level: varchar("fitness_level").notNull(),
    for_whom: jsonb("for_whom").notNull(),
    program: jsonb("program").notNull(),
    equipment: jsonb("equipment").notNull(),
    contradictions: jsonb("contradictions").notNull(),
    id: serial("id").primaryKey(),
    _locale: enum__locales("_locale").notNull(),
    _parentID: integer("_parent_id").notNull(),
  },
  (columns) => ({
    _localeParent: uniqueIndex("products_locales_locale_parent_id_unique").on(
      columns._locale,
      columns._parentID,
    ),
    _parentIdFk: foreignKey({
      columns: [columns["_parentID"]],
      foreignColumns: [products.id],
      name: "products_locales_parent_id_fk",
    }).onDelete("cascade"),
  }),
);

export const categories = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    updatedAt: timestamp("updated_at", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    })
      .defaultNow()
      .notNull(),
  },
  (columns) => ({
    categories_updated_at_idx: index("categories_updated_at_idx").on(
      columns.updatedAt,
    ),
    categories_created_at_idx: index("categories_created_at_idx").on(
      columns.createdAt,
    ),
  }),
);

export const categories_locales = pgTable(
  "categories_locales",
  {
    title: varchar("title"),
    id: serial("id").primaryKey(),
    _locale: enum__locales("_locale").notNull(),
    _parentID: integer("_parent_id").notNull(),
  },
  (columns) => ({
    _localeParent: uniqueIndex("categories_locales_locale_parent_id_unique").on(
      columns._locale,
      columns._parentID,
    ),
    _parentIdFk: foreignKey({
      columns: [columns["_parentID"]],
      foreignColumns: [categories.id],
      name: "categories_locales_parent_id_fk",
    }).onDelete("cascade"),
  }),
);

export const orders_items = pgTable(
  "orders_items",
  {
    _order: integer("_order").notNull(),
    _parentID: integer("_parent_id").notNull(),
    id: varchar("id").primaryKey(),
    product: integer("product_id")
      .notNull()
      .references(() => products.id, {
        onDelete: "set null",
      }),
    purchaseDate: timestamp("purchase_date", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    }).notNull(),
    quantity: numeric("quantity"),
  },
  (columns) => ({
    _orderIdx: index("orders_items_order_idx").on(columns._order),
    _parentIDIdx: index("orders_items_parent_id_idx").on(columns._parentID),
    orders_items_product_idx: index("orders_items_product_idx").on(
      columns.product,
    ),
    _parentIDFk: foreignKey({
      columns: [columns["_parentID"]],
      foreignColumns: [orders.id],
      name: "orders_items_parent_id_fk",
    }).onDelete("cascade"),
  }),
);

export const orders = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    orderedBy: integer("ordered_by_id").references(() => users.id, {
      onDelete: "set null",
    }),
    stripePaymentIntentID: varchar("stripe_payment_intent_i_d"),
    total: numeric("total").notNull(),
    currency: varchar("currency").notNull(),
    updatedAt: timestamp("updated_at", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    })
      .defaultNow()
      .notNull(),
  },
  (columns) => ({
    orders_ordered_by_idx: index("orders_ordered_by_idx").on(columns.orderedBy),
    orders_updated_at_idx: index("orders_updated_at_idx").on(columns.updatedAt),
    orders_created_at_idx: index("orders_created_at_idx").on(columns.createdAt),
  }),
);

export const payload_locked_documents = pgTable(
  "payload_locked_documents",
  {
    id: serial("id").primaryKey(),
    globalSlug: varchar("global_slug"),
    updatedAt: timestamp("updated_at", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    })
      .defaultNow()
      .notNull(),
  },
  (columns) => ({
    payload_locked_documents_global_slug_idx: index(
      "payload_locked_documents_global_slug_idx",
    ).on(columns.globalSlug),
    payload_locked_documents_updated_at_idx: index(
      "payload_locked_documents_updated_at_idx",
    ).on(columns.updatedAt),
    payload_locked_documents_created_at_idx: index(
      "payload_locked_documents_created_at_idx",
    ).on(columns.createdAt),
  }),
);

export const payload_locked_documents_rels = pgTable(
  "payload_locked_documents_rels",
  {
    id: serial("id").primaryKey(),
    order: integer("order"),
    parent: integer("parent_id").notNull(),
    path: varchar("path").notNull(),
    usersID: integer("users_id"),
    mediaID: integer("media_id"),
    blogsID: integer("blogs_id"),
    productsID: integer("products_id"),
    categoriesID: integer("categories_id"),
    ordersID: integer("orders_id"),
  },
  (columns) => ({
    order: index("payload_locked_documents_rels_order_idx").on(columns.order),
    parentIdx: index("payload_locked_documents_rels_parent_idx").on(
      columns.parent,
    ),
    pathIdx: index("payload_locked_documents_rels_path_idx").on(columns.path),
    payload_locked_documents_rels_users_id_idx: index(
      "payload_locked_documents_rels_users_id_idx",
    ).on(columns.usersID),
    payload_locked_documents_rels_media_id_idx: index(
      "payload_locked_documents_rels_media_id_idx",
    ).on(columns.mediaID),
    payload_locked_documents_rels_blogs_id_idx: index(
      "payload_locked_documents_rels_blogs_id_idx",
    ).on(columns.blogsID),
    payload_locked_documents_rels_products_id_idx: index(
      "payload_locked_documents_rels_products_id_idx",
    ).on(columns.productsID),
    payload_locked_documents_rels_categories_id_idx: index(
      "payload_locked_documents_rels_categories_id_idx",
    ).on(columns.categoriesID),
    payload_locked_documents_rels_orders_id_idx: index(
      "payload_locked_documents_rels_orders_id_idx",
    ).on(columns.ordersID),
    parentFk: foreignKey({
      columns: [columns["parent"]],
      foreignColumns: [payload_locked_documents.id],
      name: "payload_locked_documents_rels_parent_fk",
    }).onDelete("cascade"),
    usersIdFk: foreignKey({
      columns: [columns["usersID"]],
      foreignColumns: [users.id],
      name: "payload_locked_documents_rels_users_fk",
    }).onDelete("cascade"),
    mediaIdFk: foreignKey({
      columns: [columns["mediaID"]],
      foreignColumns: [media.id],
      name: "payload_locked_documents_rels_media_fk",
    }).onDelete("cascade"),
    blogsIdFk: foreignKey({
      columns: [columns["blogsID"]],
      foreignColumns: [blogs.id],
      name: "payload_locked_documents_rels_blogs_fk",
    }).onDelete("cascade"),
    productsIdFk: foreignKey({
      columns: [columns["productsID"]],
      foreignColumns: [products.id],
      name: "payload_locked_documents_rels_products_fk",
    }).onDelete("cascade"),
    categoriesIdFk: foreignKey({
      columns: [columns["categoriesID"]],
      foreignColumns: [categories.id],
      name: "payload_locked_documents_rels_categories_fk",
    }).onDelete("cascade"),
    ordersIdFk: foreignKey({
      columns: [columns["ordersID"]],
      foreignColumns: [orders.id],
      name: "payload_locked_documents_rels_orders_fk",
    }).onDelete("cascade"),
  }),
);

export const payload_preferences = pgTable(
  "payload_preferences",
  {
    id: serial("id").primaryKey(),
    key: varchar("key"),
    value: jsonb("value"),
    updatedAt: timestamp("updated_at", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    })
      .defaultNow()
      .notNull(),
  },
  (columns) => ({
    payload_preferences_key_idx: index("payload_preferences_key_idx").on(
      columns.key,
    ),
    payload_preferences_updated_at_idx: index(
      "payload_preferences_updated_at_idx",
    ).on(columns.updatedAt),
    payload_preferences_created_at_idx: index(
      "payload_preferences_created_at_idx",
    ).on(columns.createdAt),
  }),
);

export const payload_preferences_rels = pgTable(
  "payload_preferences_rels",
  {
    id: serial("id").primaryKey(),
    order: integer("order"),
    parent: integer("parent_id").notNull(),
    path: varchar("path").notNull(),
    usersID: integer("users_id"),
  },
  (columns) => ({
    order: index("payload_preferences_rels_order_idx").on(columns.order),
    parentIdx: index("payload_preferences_rels_parent_idx").on(columns.parent),
    pathIdx: index("payload_preferences_rels_path_idx").on(columns.path),
    payload_preferences_rels_users_id_idx: index(
      "payload_preferences_rels_users_id_idx",
    ).on(columns.usersID),
    parentFk: foreignKey({
      columns: [columns["parent"]],
      foreignColumns: [payload_preferences.id],
      name: "payload_preferences_rels_parent_fk",
    }).onDelete("cascade"),
    usersIdFk: foreignKey({
      columns: [columns["usersID"]],
      foreignColumns: [users.id],
      name: "payload_preferences_rels_users_fk",
    }).onDelete("cascade"),
  }),
);

export const payload_migrations = pgTable(
  "payload_migrations",
  {
    id: serial("id").primaryKey(),
    name: varchar("name"),
    batch: numeric("batch"),
    updatedAt: timestamp("updated_at", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", {
      mode: "string",
      withTimezone: true,
      precision: 3,
    })
      .defaultNow()
      .notNull(),
  },
  (columns) => ({
    payload_migrations_updated_at_idx: index(
      "payload_migrations_updated_at_idx",
    ).on(columns.updatedAt),
    payload_migrations_created_at_idx: index(
      "payload_migrations_created_at_idx",
    ).on(columns.createdAt),
  }),
);

export const relations_users_roles = relations(users_roles, ({ one }) => ({
  parent: one(users, {
    fields: [users_roles.parent],
    references: [users.id],
    relationName: "roles",
  }),
}));
export const relations_users_cart_items = relations(
  users_cart_items,
  ({ one }) => ({
    _parentID: one(users, {
      fields: [users_cart_items._parentID],
      references: [users.id],
      relationName: "cart_items",
    }),
    product: one(products, {
      fields: [users_cart_items.product],
      references: [products.id],
      relationName: "product",
    }),
  }),
);
export const relations_users = relations(users, ({ many }) => ({
  roles: many(users_roles, {
    relationName: "roles",
  }),
  cart_items: many(users_cart_items, {
    relationName: "cart_items",
  }),
}));
export const relations_media = relations(media, () => ({}));
export const relations_blogs_locales = relations(blogs_locales, ({ one }) => ({
  _parentID: one(blogs, {
    fields: [blogs_locales._parentID],
    references: [blogs.id],
    relationName: "_locales",
  }),
}));
export const relations_blogs = relations(blogs, ({ one, many }) => ({
  thumbnail: one(media, {
    fields: [blogs.thumbnail],
    references: [media.id],
    relationName: "thumbnail",
  }),
  _locales: many(blogs_locales, {
    relationName: "_locales",
  }),
}));
export const relations_products_videos = relations(
  products_videos,
  ({ one }) => ({
    _parentID: one(products, {
      fields: [products_videos._parentID],
      references: [products.id],
      relationName: "videos",
    }),
  }),
);
export const relations_products_locales = relations(
  products_locales,
  ({ one }) => ({
    _parentID: one(products, {
      fields: [products_locales._parentID],
      references: [products.id],
      relationName: "_locales",
    }),
  }),
);
export const relations_products = relations(products, ({ one, many }) => ({
  product_thumbnail: one(media, {
    fields: [products.product_thumbnail],
    references: [media.id],
    relationName: "product_thumbnail",
  }),
  videos: many(products_videos, {
    relationName: "videos",
  }),
  categories: one(categories, {
    fields: [products.categories],
    references: [categories.id],
    relationName: "categories",
  }),
  _locales: many(products_locales, {
    relationName: "_locales",
  }),
}));
export const relations_categories_locales = relations(
  categories_locales,
  ({ one }) => ({
    _parentID: one(categories, {
      fields: [categories_locales._parentID],
      references: [categories.id],
      relationName: "_locales",
    }),
  }),
);
export const relations_categories = relations(categories, ({ many }) => ({
  _locales: many(categories_locales, {
    relationName: "_locales",
  }),
}));
export const relations_orders_items = relations(orders_items, ({ one }) => ({
  _parentID: one(orders, {
    fields: [orders_items._parentID],
    references: [orders.id],
    relationName: "items",
  }),
  product: one(products, {
    fields: [orders_items.product],
    references: [products.id],
    relationName: "product",
  }),
}));
export const relations_orders = relations(orders, ({ one, many }) => ({
  orderedBy: one(users, {
    fields: [orders.orderedBy],
    references: [users.id],
    relationName: "orderedBy",
  }),
  items: many(orders_items, {
    relationName: "items",
  }),
}));
export const relations_payload_locked_documents_rels = relations(
  payload_locked_documents_rels,
  ({ one }) => ({
    parent: one(payload_locked_documents, {
      fields: [payload_locked_documents_rels.parent],
      references: [payload_locked_documents.id],
      relationName: "_rels",
    }),
    usersID: one(users, {
      fields: [payload_locked_documents_rels.usersID],
      references: [users.id],
      relationName: "users",
    }),
    mediaID: one(media, {
      fields: [payload_locked_documents_rels.mediaID],
      references: [media.id],
      relationName: "media",
    }),
    blogsID: one(blogs, {
      fields: [payload_locked_documents_rels.blogsID],
      references: [blogs.id],
      relationName: "blogs",
    }),
    productsID: one(products, {
      fields: [payload_locked_documents_rels.productsID],
      references: [products.id],
      relationName: "products",
    }),
    categoriesID: one(categories, {
      fields: [payload_locked_documents_rels.categoriesID],
      references: [categories.id],
      relationName: "categories",
    }),
    ordersID: one(orders, {
      fields: [payload_locked_documents_rels.ordersID],
      references: [orders.id],
      relationName: "orders",
    }),
  }),
);
export const relations_payload_locked_documents = relations(
  payload_locked_documents,
  ({ many }) => ({
    _rels: many(payload_locked_documents_rels, {
      relationName: "_rels",
    }),
  }),
);
export const relations_payload_preferences_rels = relations(
  payload_preferences_rels,
  ({ one }) => ({
    parent: one(payload_preferences, {
      fields: [payload_preferences_rels.parent],
      references: [payload_preferences.id],
      relationName: "_rels",
    }),
    usersID: one(users, {
      fields: [payload_preferences_rels.usersID],
      references: [users.id],
      relationName: "users",
    }),
  }),
);
export const relations_payload_preferences = relations(
  payload_preferences,
  ({ many }) => ({
    _rels: many(payload_preferences_rels, {
      relationName: "_rels",
    }),
  }),
);
export const relations_payload_migrations = relations(
  payload_migrations,
  () => ({}),
);

type DatabaseSchema = {
  enum__locales: typeof enum__locales;
  enum_users_roles: typeof enum_users_roles;
  users_roles: typeof users_roles;
  users_cart_items: typeof users_cart_items;
  users: typeof users;
  media: typeof media;
  blogs: typeof blogs;
  blogs_locales: typeof blogs_locales;
  products_videos: typeof products_videos;
  products: typeof products;
  products_locales: typeof products_locales;
  categories: typeof categories;
  categories_locales: typeof categories_locales;
  orders_items: typeof orders_items;
  orders: typeof orders;
  payload_locked_documents: typeof payload_locked_documents;
  payload_locked_documents_rels: typeof payload_locked_documents_rels;
  payload_preferences: typeof payload_preferences;
  payload_preferences_rels: typeof payload_preferences_rels;
  payload_migrations: typeof payload_migrations;
  relations_users_roles: typeof relations_users_roles;
  relations_users_cart_items: typeof relations_users_cart_items;
  relations_users: typeof relations_users;
  relations_media: typeof relations_media;
  relations_blogs_locales: typeof relations_blogs_locales;
  relations_blogs: typeof relations_blogs;
  relations_products_videos: typeof relations_products_videos;
  relations_products_locales: typeof relations_products_locales;
  relations_products: typeof relations_products;
  relations_categories_locales: typeof relations_categories_locales;
  relations_categories: typeof relations_categories;
  relations_orders_items: typeof relations_orders_items;
  relations_orders: typeof relations_orders;
  relations_payload_locked_documents_rels: typeof relations_payload_locked_documents_rels;
  relations_payload_locked_documents: typeof relations_payload_locked_documents;
  relations_payload_preferences_rels: typeof relations_payload_preferences_rels;
  relations_payload_preferences: typeof relations_payload_preferences;
  relations_payload_migrations: typeof relations_payload_migrations;
};

declare module "@payloadcms/db-postgres/types" {
  export interface GeneratedDatabaseSchema {
    schema: DatabaseSchema;
  }
}
