const cron = require("node-cron");
const MembershipService = require("../Services/Services");

cron.schedule("0 0 * * *", async () => {
    console.log("⏳ Running daily membership check...");
    await MembershipService.decreaseDaily();
});
