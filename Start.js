const System = require('./System')

global.system = new System()
global.system.build()
global.system.run()