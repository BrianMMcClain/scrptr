SCRPTR
======

Scrptr is a "Scripting as a Service" (I know, I know, I'm sorry) utility. This is, more than anything, a learning exercise for me to learn the proper way to prepare Node.js modules. However, it's also written to be a hosted service.

Goal
----

This is a part of my "One Idea a Day" ideology I recently adopted, so a lot of what will be churned out will be weekend-sprint types of projects. Some (actually a lot) ideas I won't implement, some I'll mock up, some I might see to completion.

The idea of SCRPTR is the user provides a script, and SCRPTR does, more or a less, a smart "Find and Replace". Ranging from things like time, to weather, to latest tweets, to something that someone a lot smarter than I can think of :)

SCRPTR is also available as a library in addition to a service. In the `./lib` folder, the `scrptr.js` file is available to be used with other projects. I should probably make this a module, and the SCRPTR service a separate project, but I havn't gotten there yet.

When using the library, the user can add their own functions by using the `addFunction` method for the Scrptr class. This takes a name, function, and description. See `server.js` for some examples of this.

SCRPTR Service
--------------

Come visit us at [scrptr.cloudfoundry.com](http://scrptr.cloudfoundry.com)

Right now, the service can be easily used with cURL while a nice looking UI is built. You can see an example of this by running:
```
curl -d "The time is %H %M %AMPM . It is currently %TEMP{94102} degrees Fahrenheit" http://scrptr.cloudfoundry.com/s
```