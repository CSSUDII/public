// @type.js
const util = require("./javascript/util")
const { typename } = require("./util").typename

const type = new typename({ valid: true })

type.input("x")
type.prefix("https")
type.get("github.com")
         .log("Started")
         
util.log(type.output)
