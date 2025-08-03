import { pgTable, text, timestamp, uuid, boolean, integer, jsonb } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  emailVerified: boolean('email_verified').default(false),
  avatar: text('avatar'),
  role: text('role').default('user'), // 'user', 'admin'
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Products table
export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  price: integer('price').notNull(), // Price in cents
  currency: text('currency').default('USD'),
  category: text('category').notNull(),
  brand: text('brand'),
  images: jsonb('images').$type<string[]>().default([]),
  sizes: jsonb('sizes').$type<string[]>().default([]),
  colors: jsonb('colors').$type<string[]>().default([]),
  inStock: boolean('in_stock').default(true),
  featured: boolean('featured').default(false),
  tags: jsonb('tags').$type<string[]>().default([]),
  metadata: jsonb('metadata').$type<Record<string, unknown>>().default({}),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Orders table
export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  status: text('status').notNull().default('pending'), // 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
  totalAmount: integer('total_amount').notNull(), // Total in cents
  currency: text('currency').default('USD'),
  shippingAddress: jsonb('shipping_address').$type<{
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }>(),
  billingAddress: jsonb('billing_address').$type<{
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }>(),
  items: jsonb('items').$type<Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
  }>>().default([]),
  paymentStatus: text('payment_status').default('pending'), // 'pending', 'paid', 'failed', 'refunded'
  paymentMethod: text('payment_method'),
  trackingNumber: text('tracking_number'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Sessions table for authentication
export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow(),
});

// API Keys table
export const apiKeys = pgTable('api_keys', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  key: text('key').notNull().unique(),
  userId: uuid('user_id').references(() => users.id),
  permissions: jsonb('permissions').$type<string[]>().default([]),
  lastUsed: timestamp('last_used'),
  expiresAt: timestamp('expires_at'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// System logs table
export const systemLogs = pgTable('system_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  level: text('level').notNull(), // 'info', 'warn', 'error', 'debug'
  message: text('message').notNull(),
  context: jsonb('context').$type<Record<string, unknown>>().default({}),
  userId: uuid('user_id').references(() => users.id),
  requestId: text('request_id'),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users, {
  email: (schema) => schema.email(),
  name: (schema) => schema.min(1).max(100),
  password: (schema) => schema.min(8),
  role: (schema) => schema.optional(),
});

export const selectUserSchema = createSelectSchema(users);

export const insertProductSchema = createInsertSchema(products, {
  name: (schema) => schema.min(1).max(200),
  price: (schema) => schema.positive(),
  category: (schema) => schema.min(1),
  currency: (schema) => schema.length(3).optional(),
});

export const selectProductSchema = createSelectSchema(products);

export const insertOrderSchema = createInsertSchema(orders, {
  status: (schema) => schema.optional(),
  totalAmount: (schema) => schema.positive(),
  paymentStatus: (schema) => schema.optional(),
});

export const selectOrderSchema = createSelectSchema(orders);

export const insertSessionSchema = createInsertSchema(sessions);
export const selectSessionSchema = createSelectSchema(sessions);

export const insertApiKeySchema = createInsertSchema(apiKeys, {
  name: (schema) => schema.min(1).max(100),
  key: (schema) => schema.min(32),
});

export const selectApiKeySchema = createSelectSchema(apiKeys);

export const insertSystemLogSchema = createInsertSchema(systemLogs, {
  level: (schema) => schema,
  message: (schema) => schema.min(1),
});

export const selectSystemLogSchema = createSelectSchema(systemLogs);

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type ApiKey = typeof apiKeys.$inferSelect;
export type NewApiKey = typeof apiKeys.$inferInsert;
export type SystemLog = typeof systemLogs.$inferSelect;
export type NewSystemLog = typeof systemLogs.$inferInsert;