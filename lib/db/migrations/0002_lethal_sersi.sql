PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_locationLog` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`ended_at` integer NOT NULL,
	`started_at` integer NOT NULL,
	`lat` real NOT NULL,
	`long` real NOT NULL,
	`location_id` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`location_id`) REFERENCES `location`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_locationLog`("id", "name", "description", "ended_at", "started_at", "lat", "long", "location_id", "updated_at", "created_at") SELECT "id", "name", "description", "ended_at", "started_at", "lat", "long", "location_id", "updated_at", "created_at" FROM `locationLog`;--> statement-breakpoint
DROP TABLE `locationLog`;--> statement-breakpoint
ALTER TABLE `__new_locationLog` RENAME TO `locationLog`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `location` ADD `updated_at` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `location` ADD `created_at` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `location` DROP COLUMN `updatedAt`;--> statement-breakpoint
ALTER TABLE `location` DROP COLUMN `createdAt`;