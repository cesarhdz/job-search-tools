import "reflect-metadata";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { Controller, Get, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

const dataDirectory = join(process.cwd(), ".data");
mkdirSync(dataDirectory, { recursive: true });

const database = new DatabaseSync(join(dataDirectory, "workspace.sqlite"));
database.exec("PRAGMA journal_mode = WAL");

@Controller()
class HealthController {
  @Get("health")
  health() {
    const result = database.prepare("SELECT 1 AS ok").get() as { ok: number };

    return {
      status: result.ok === 1 ? "ok" : "error",
      workspace: "local",
      storage: "sqlite",
    };
  }
}

@Module({
  controllers: [HealthController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}

void bootstrap();
