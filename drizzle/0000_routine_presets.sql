CREATE TABLE "routine_presets" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"days_per_week" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workouts" (
	"id" text PRIMARY KEY NOT NULL,
	"routine_preset_id" text NOT NULL,
	"name" text NOT NULL,
	"position" integer NOT NULL,
	CONSTRAINT "workouts_routine_preset_id_position_unique" UNIQUE("routine_preset_id","position")
);
--> statement-breakpoint
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_routine_preset_id_routine_presets_id_fk" FOREIGN KEY ("routine_preset_id") REFERENCES "public"."routine_presets"("id") ON DELETE cascade ON UPDATE no action;