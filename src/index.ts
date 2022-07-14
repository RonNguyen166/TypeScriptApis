import "dotenv/config";
import App from "./app";
import UserRoute from "./routes/user.route";

const app = new App([new UserRoute()], parseInt(process.env.PORT || "3000"));

app.listen();
