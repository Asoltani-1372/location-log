PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_locationLog` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`ended_at` integer NOT NULL,
	`started_at` integer NOT NULL,
	`lat` real NOT NULL,
	`long` real NOT NULL,
	`locationId` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`locationId`) REFERENCES `location`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_locationLog`("id", "name", "description", "ended_at", "started_at", "lat", "long", "locationId", "updatedAt", "createdAt") SELECT "id", "name", "description", "ended_at", "started_at", "lat", "long", "locationId", "updatedAt", "createdAt" FROM `locationLog`;--> statement-breakpoint
DROP TABLE `locationLog`;--> statement-breakpoint
ALTER TABLE `__new_locationLog` RENAME TO `locationLog`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_locationLogImage` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`key` text NOT NULL,
	`locationLogId` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`locationLogId`) REFERENCES `locationLog`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_locationLogImage`("id", "key", "locationLogId", "updatedAt", "createdAt") SELECT "id", "key", "locationLogId", "updatedAt", "createdAt" FROM `locationLogImage`;--> statement-breakpoint
DROP TABLE `locationLogImage`;--> statement-breakpoint
ALTER TABLE `__new_locationLogImage` RENAME TO `locationLogImage`;--> statement-breakpoint
ALTER TABLE `location` ADD `updatedAt` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `location` ADD `createdAt` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `location` DROP COLUMN `updated_at`;--> statement-breakpoint
ALTER TABLE `location` DROP COLUMN `created_at`;