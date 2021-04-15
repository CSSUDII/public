// @type.js
const util = require("./javascript/util")
const type = require("./util").typename

type.input("x")
type.prefix("https")
type.get("github.com")
         .log("Started")
         
util.log(type.output)
