const winston = require("winston")
const fs = require("fs");
const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    transports: [
        new winston.transports.File({
            filename: ("logs/log.log"),
            maxsize: 5242880 //5MB
       })
    ]
})

class IndexController{
    timestamp(req, res){
        return res.json({"timestamp" : Date.now()})
    }

    logs(req, res){
        if (req.method === "POST"){
            logger.log({
                timestamp:Date.now(),
                level: req.body["level"],
                message: req.body["message"]
            });
            return res.send("")
        }
        if (req.query["limit"]){
            var files = fs.readdirSync("logs")
            var data = ""
            files.forEach((file) => {
                data += fs.readFileSync(`logs/${file}`, "utf-8")
            })
            var lines = data.split(/\r?\n/);
            var limit_lines = lines.slice(lines.length - 1 - req.query["limit"], lines.length - 1)
            var limit_logs = []
            for (var x of limit_lines){
                limit_logs.push(JSON.parse(x))
            }
            return res.json({"logs" : limit_logs})
        }
        return res.send("")
    }
}

module.exports = new IndexController