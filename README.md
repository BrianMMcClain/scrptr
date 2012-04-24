SCRPTR
======

Scrptr is a "Scripting as a Service" (I know, I know, I'm sorry) utility. This is, more than anything, a learning exercise for me to learn the proper way to prepare Node.js modules. However, it's also written to be a hosted service.

Come visit us at [scrptr.cloudfoundry.com](http://scrptr.cloudfoundry.com)

Right now, the service can be easily used with cURL while a nice looking UI is built. You can see an example of this by running:
```
curl -d "The time is %H %M %AMPM . It is currently %TEMP{94101} degrees Fahrenheit" http://scrptr.cloudfoundry.com/s
```