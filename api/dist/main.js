"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const mail_module_1 = require("./mail/mail.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(mail_module_1.MailModule);
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map